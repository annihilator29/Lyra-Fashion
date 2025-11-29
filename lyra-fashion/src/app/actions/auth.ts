'use server'

import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'
import { redirect } from 'next/navigation'

const signupSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  confirmPassword: z.string()
}).refine((data: { email: string; password: string; confirmPassword: string }) => {
  return data.password === data.confirmPassword
}, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
})

export async function signup(prevState: any, formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string

  const validatedFields = signupSchema.safeParse({
    email,
    password,
    confirmPassword
  })

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.errors[0].message
    }
  }

  const supabase = await createClient()

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  })

  if (error) {
    return {
      error: error.message
    }
 }

  // Redirect to login page after successful signup
  redirect('/login')
}

export async function login(prevState: any, formData: FormData) {
 const email = formData.get('email') as string
  const password = formData.get('password') as string

  const validatedFields = loginSchema.safeParse({
    email,
    password
  })

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.errors[0].message
    }
  }

  const supabase = await createClient()

  const { error, data } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return {
      error: 'Invalid login credentials'
    }
  }

  // Redirect to home page after successful login
  redirect('/')
}

export async function logout() {
 const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}