"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { User } from "@supabase/supabase-js";

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
            if (session?.user) {
                syncProfile(session.user);
            }
            setLoading(false);
        });

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
            const currentUser = session?.user ?? null;
            setUser(currentUser);
            setLoading(false);

            // Sync profile to database when user logs in
            if (currentUser) {
                await syncProfile(currentUser);
            }
        });

        // Safety timeout to prevent infinite loading
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => {
            subscription.unsubscribe();
            clearTimeout(timeout);
        };
    }, []);

    // Sync user profile to profiles table
    const syncProfile = async (user: User) => {
        try {
            await supabase
                .from('profiles')
                .upsert({
                    id: user.id,
                    email: user.email,
                    full_name: user.user_metadata?.full_name || user.user_metadata?.name || '',
                    avatar_url: user.user_metadata?.avatar_url || '',
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
                redirectTo: `${window.location.origin}`,
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
    };
}
