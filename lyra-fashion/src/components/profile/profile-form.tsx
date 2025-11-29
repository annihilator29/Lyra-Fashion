'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { updateProfile } from '@/app/actions/profile';

const ProfileFormSchema = z.object({
  full_name: z
    .string()
    .min(1, { message: 'Name is required' })
    .max(100, { message: 'Name must be less than 100 characters' }),
});

type ProfileFormValues = z.infer<typeof ProfileFormSchema>;

interface ProfileFormProps {
  initialData: {
    full_name: string | null;
  };
  onProfileUpdate?: () => void;
}

export function ProfileForm({ initialData, onProfileUpdate }: ProfileFormProps) {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(ProfileFormSchema),
    defaultValues: {
      full_name: initialData.full_name || '',
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: ProfileFormValues) {
    try {
      const result = await updateProfile(values);
      
      if (result.error) {
        toast.error('Failed to update profile', {
          description: result.error,
        });
      } else {
        toast.success('Profile updated successfully!');
        if (onProfileUpdate) {
          onProfileUpdate();
        }
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('An unexpected error occurred', {
        description: 'Please try again later',
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="full_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your full name" {...field} />
              </FormControl>
              <FormDescription>
                This is the name that will be displayed on your profile.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Updating...' : 'Update Profile'}
        </Button>
      </form>
    </Form>
  );
}