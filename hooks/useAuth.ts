import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { type User } from "@supabase/supabase-js";

export function useAuth() {
    const supabase = createClient();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const getSession = useCallback(async () => {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
        setLoading(false);
    }, [supabase]);

    useEffect(() => {
        getSession();

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (_event, session) => {
                setUser(session?.user ?? null);
                setLoading(false);
            }
        );

        return () => {
            subscription.unsubscribe();
        };
    }, [supabase, getSession]);

    // Sync user profile to profiles table
    const syncProfile = async (userData: User) => {
        try {
            await supabase
                .from('profiles')
                .upsert({
                    id: userData.id,
                    email: userData.email,
                    full_name: userData.user_metadata?.full_name || userData.user_metadata?.name || '',
                    avatar_url: userData.user_metadata?.avatar_url || '',
                    updated_at: new Date().toISOString(),
                }, { onConflict: 'id' });
        } catch (error) {
            console.error('Error syncing profile:', error);
        }
    };

    const signInWithGoogle = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        });
        return { error };
    };

    const signInWithEmail = async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        return { data, error };
    };

    const signUpWithEmail = async (email: string, password: string, fullName: string) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { full_name: fullName },
            },
        });
        return { data, error };
    };

    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (!error) {
            setUser(null);
        }
        return { error };
    };

    return {
        user,
        loading,
        signInWithGoogle,
        signInWithEmail,
        signUpWithEmail,
        signOut,
        syncProfile,
    };
}
