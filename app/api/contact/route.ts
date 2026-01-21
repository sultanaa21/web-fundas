import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, message } = body;

        // 1. Validation
        if (!name || typeof name !== 'string' || !name.trim()) {
            return NextResponse.json(
                { error: 'El nombre es obligatorio' },
                { status: 400 }
            );
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || typeof email !== 'string' || !emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Email inválido' },
                { status: 400 }
            );
        }

        if (!message || typeof message !== 'string' || !message.trim()) {
            return NextResponse.json(
                { error: 'El mensaje es obligatorio' },
                { status: 400 }
            );
        }

        if (message.length > 1000) {
            return NextResponse.json(
                { error: 'El mensaje no puede exceder los 1000 caracteres' },
                { status: 400 }
            );
        }

        // 2. Process message (Placeholder for real email sending)
        // TODO: Integrate with an email service like Resend, SendGrid, or AWS SES here.
        // Example: await resend.emails.send({ ... })

        console.log('--- NEW CONTACT MESSAGE ---');
        console.log('Name:', name);
        console.log('Email:', email);
        console.log('Message:', message);
        console.log('---------------------------');

        // 3. Response
        return NextResponse.json(
            { message: 'Mensaje recibido correctamente' },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error processing contact form:', error);
        return NextResponse.json(
            { error: 'Error interno del servidor' },
            { status: 500 }
        );
    }
}
