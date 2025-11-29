'use server';

import { createClient } from '@/lib/supabase/server';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

// Define the profile update schema
const ProfileUpdateSchema = z.object({
  full_name: z.string().min(1, 'Name is required'),
});

export type ProfileUpdateData = z.infer<typeof ProfileUpdateSchema>;

// Server action to get profile
export async function getProfile() {
  const supabase = await createClient();

  const { data: { user }, error: userError } = await supabase.auth.getUser();
  
  if (userError || !user) {
    console.error('Error getting user:', userError);
    return null;
  }

  // Get profile details from the profiles table
  const { data: profileData, error: profileError } = await supabase
    .from('profiles')
    .select('id, full_name')
    .eq('id', user.id)
    .single();

  if (profileError) {
    console.error('Error fetching profile:', profileError);
    // If profile doesn't exist, return user data with null profile fields
    return {
      id: user.id,
      full_name: null,
      email: user.email
    };
  }

  // Combine profile data with user email
  return {
    ...profileData,
    email: user.email
  };
}

// Server action to update profile
export async function updateProfile(data: ProfileUpdateData) {
  const supabase = await createClient();
  
  const { data: userData, error: authError } = await supabase.auth.getUser();
  
  if (authError || !userData.user) {
    return { error: 'User not authenticated' };
  }

  // Validate input data
  const validatedData = ProfileUpdateSchema.safeParse(data);
  if (!validatedData.success) {
    return { error: 'Invalid data provided' };
  }

  const { full_name } = validatedData.data;

  // Update the profile in the database
  const { error } = await supabase
    .from('profiles')
    .update({ 
      full_name,
      updated_at: new Date().toISOString()
    })
    .eq('id', userData.user.id);

  if (error) {
    console.error('Error updating profile:', error);
    return { error: 'Failed to update profile' };
  }

 // Revalidate the profile page to reflect the changes
 revalidatePath('/account/profile');

 return { success: true };
}