'use client';

import { useEffect, useState } from 'react';
import { getProfile } from '@/app/actions/profile';
import { createClient } from '@/lib/supabase/client';
import { ProfileForm } from '@/components/profile/profile-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface Profile {
  id: string;
  full_name: string | null;
  email: string | null;
}

export default function EditProfilePage() {
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

  const handleProfileUpdate = () => {
    // Refresh the profile data after update
    router.refresh();
    router.push('/account/profile');
  };

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Please log in</h2>
          <p className="text-muted-foreground mb-4">You need to be logged in to edit your profile</p>
          <Button onClick={() => router.push('/login')}>Go to Login</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8 max-w-2xl mx-auto">
      <div className="flex items-center mb-6">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mr-4"
        >
          ← Back
        </Button>
        <h1 className="text-3xl font-bold">Edit Profile</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              <div className="h-4 w-1/4 bg-muted rounded animate-pulse"></div>
              <div className="h-6 w-1/2 bg-muted rounded animate-pulse"></div>
            </div>
          ) : profile ? (
            <ProfileForm
              initialData={{
                full_name: profile.full_name || ''
              }}
              onProfileUpdate={handleProfileUpdate}
            />
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No profile data found.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}