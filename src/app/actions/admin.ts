'use server';

import connectToDatabase from '@/lib/mongodb';
import { User } from '@/models/User';
import { Transaction } from '@/models/Transaction';
import { getSessionUser } from './auth';

export async function getAdminStats() {
  const admin = await getSessionUser();
  if (!admin || admin.role !== 'admin') return null;

  await connectToDatabase();

  const totalUsers = await User.countDocuments({ role: 'user' });
  
  const allUsers = await User.find({ role: 'user' }).lean();
  const totalSystemBalance = allUsers.reduce((sum, u) => sum + u.balance, 0);

  const transactions = await Transaction.find().sort({ createdAt: -1 }).limit(10).populate('sender', 'name phone').lean();
  const totalTxnCount = await Transaction.countDocuments();

  return {
    totalUsers,
    totalSystemBalance,
    totalTxnCount,
    recentTransactions: transactions.map((t: any) => ({
      id: t._id.toString(),
      type: t.type,
      sender: t.sender ? `${t.sender.name} (${t.sender.phone})` : 'Unknown',
      receiver: t.receiverPhone,
      amount: t.amount,
      status: t.status,
      date: new Date(t.createdAt).toLocaleString()
    }))
  };
}

export async function getAllUsers() {
  const admin = await getSessionUser();
  if (!admin || admin.role !== 'admin') return [];

  await connectToDatabase();
  const users = await User.find({ role: 'user' }).sort({ createdAt: -1 }).lean();
  
  return users.map(u => ({
    id: u._id.toString(),
    name: u.name,
    phone: u.phone,
    balance: u.balance,
    joined: new Date(u.createdAt).toLocaleDateString()
  }));
}
