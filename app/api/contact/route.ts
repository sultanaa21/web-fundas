import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

function isValidEmail(email: string) {
    // validación simple pero suficiente
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(req: Request) {
    try {
        const { name, email, message } = await req.json()

        // Validaciones server-side
        if (typeof name !== "string" || name.trim().length === 0) {
            return NextResponse.json({ error: "Nombre requerido" }, { status: 400 })
        }
        if (typeof email !== "string" || !isValidEmail(email)) {
            return NextResponse.json({ error: "Email inválido" }, { status: 400 })
        }
        if (typeof message !== "string" || message.trim().length === 0) {
            return NextResponse.json({ error: "Mensaje requerido" }, { status: 400 })
        }
        if (message.length > 1000) {
            return NextResponse.json(
                { error: "Mensaje demasiado largo (máx 1000 caracteres)" },
                { status: 400 }
            )
        }

        if (!process.env.RESEND_API_KEY) {
            return NextResponse.json(
                { error: "RESEND_API_KEY no configurada" },
                { status: 500 }
            )
        }

        const subject = `Nuevo mensaje de ${name}`
        const text = `Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`

        const { error } = await resend.emails.send({
            // En free tier sin dominio verificado, usa onboarding@resend.dev
            from: "CASELYN <onboarding@resend.dev>",
            to: ["caselyncontact@gmail.com"], // si free-tier limita, pon el email con el que te registraste en Resend
            subject,
            text,
            replyTo: email,
        })

        if (error) {
            console.error("Resend error:", error)
            return NextResponse.json(
                { error: "No se pudo enviar el email" },
                { status: 502 }
            )
        }

        return NextResponse.json({ success: true }, { status: 200 })
    } catch (err) {
        console.error("Contact API error:", err)
        return NextResponse.json({ error: "Error del servidor" }, { status: 500 })
    }
}
