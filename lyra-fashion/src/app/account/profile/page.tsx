'use client';

import { useEffect, useState } from 'react';
import { getProfile } from '@/app/actions/profile';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface Profile {
  id: string;
  full_name: string | null;
  email: string | null;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const checkSessionAndFetchProfile = async () => {
      // Get the current session
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        // If not authenticated, redirect to login
        router.push('/login');
        return;
      }
      
      setSession(session);

      try {
        const profileData = await getProfile();
        setProfile(profileData);
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast.error('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };

    checkSessionAndFetchProfile();
  }, [router, supabase]);

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Please log in</h2>
          <p className="text-muted-foreground mb-4">You need to be logged in to view your profile</p>
          <Button onClick={() => router.push('/login')}>Go to Login</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Your Profile</h1>

      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              <div className="h-4 w-1/4 bg-muted rounded animate-pulse"></div>
              <div className="h-6 w-1/2 bg-muted rounded animate-pulse"></div>
              <div className="h-4 w-1/4 bg-muted rounded animate-pulse"></div>
              <div className="h-6 w-1/2 bg-muted rounded animate-pulse"></div>
            </div>
          ) : profile ? (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Full Name</h3>
                <p className="text-lg">{profile.full_name || 'Not provided'}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
                <p className="text-lg">{profile.email || 'Not provided'}</p>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No profile data found.</p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="mt-6">
        <Button onClick={() => router.push('/account/profile/edit')}>
          Edit Profile
        </Button>
      </div>
    </div>
  );
}