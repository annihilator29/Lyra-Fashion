'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

interface UserProfile {
  id: string;
  email: string | null;
  full_name: string | null;
  role?: string; // We'll add role to the profile if it exists
}

interface UserHookState {
  user: UserProfile | null;
  isLoading: boolean;
  isCheckingRole: boolean;
  error: string | null;
}

export function useUser() {
  const [state, setState] = useState<UserHookState>({
    user: null,
    isLoading: true,
    isCheckingRole: true,
    error: null,
  });

  useEffect(() => {
    const supabase = createClient();
    
    const checkUser = async () => {
      setState(prev => ({ ...prev, isLoading: true }));
      
      // Get the current user session
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        setState({
          user: null,
          isLoading: false,
          isCheckingRole: false,
          error: authError?.message || 'No authenticated user',
        });
        return;
      }
      
      // Get user profile from the database
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('id, email, full_name')
        .eq('id', user.id)
        .single();
      
      if (profileError) {
        setState({
          user: null,
          isLoading: false,
          isCheckingRole: false,
          error: profileError.message,
        });
        return;
      }
      
      // For now, we'll determine admin status based on email
      // In a real application, you'd likely have a role field in the profiles table
      // For MVP as specified in the story, we'll use a hardcoded admin email list
      const adminEmails = process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(',') || [];
      let isAdmin = adminEmails.includes(profileData.email || '');

      // For development/testing purposes, allow overriding admin status
      // This can be useful for testing without setting environment variables
      if (process.env.NODE_ENV === 'development' && profileData.email?.includes('admin')) {
        isAdmin = true;
      }

      const userProfile: UserProfile = {
        id: profileData.id,
        email: profileData.email,
        full_name: profileData.full_name,
        role: isAdmin ? 'admin' : 'user',
      };
      
      setState({
        user: userProfile,
        isLoading: false,
        isCheckingRole: false,
        error: null,
      });
    };

    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session) {
          setState({
            user: null,
            isLoading: false,
            isCheckingRole: false,
            error: null,
          });
        } else {
          checkUser();
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return state;
}