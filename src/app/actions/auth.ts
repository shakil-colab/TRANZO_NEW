'use server';

import connectToDatabase from '@/lib/mongodb';
import { User } from '@/models/User';
import { cookies } from 'next/headers';

export async function loginUser(phone: string, pin: string) {
  await connectToDatabase();
  
  const user = await User.findOne({ phone, pin });
  if (!user) {
    return { success: false, message: 'Invalid phone or PIN' };
  }
  
  // In a real app, use JWT. For simplicity, we just set a cookie with user ID.
  const cookieStore = await cookies();
  cookieStore.set('session', user._id.toString(), { httpOnly: true, secure: true });
  
  return { success: true, user: { id: user._id.toString(), name: user.name, balance: user.balance } };
}

export async function registerUser(phone: string, pin: string, name: string) {
  await connectToDatabase();
  
  const existingUser = await User.findOne({ phone });
  if (existingUser) {
    return { success: false, message: 'Phone number already registered' };
  }
  
  const user = await User.create({ phone, pin, name, balance: 1000 }); // Default balance for testing
  
  const cookieStore = await cookies();
  cookieStore.set('session', user._id.toString(), { httpOnly: true, secure: true });
  
  return { success: true };
}

export async function logoutUser() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
  return { success: true };
}

export async function getSessionUser() {
  const cookieStore = await cookies();
  const session = cookieStore.get('session');
  
  if (!session) return null;
  
  await connectToDatabase();
  const user = await User.findById(session.value);
  
  if (!user) return null;
  
  return { id: user._id.toString(), phone: user.phone, name: user.name, balance: user.balance, role: user.role };
}
