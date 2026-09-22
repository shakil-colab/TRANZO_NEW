'use server';

import connectToDatabase from '@/lib/mongodb';
import { Transaction } from '@/models/Transaction';
import { Expense } from '@/models/Expense';
import { getSessionUser } from './auth';

export async function getDashboardData() {
  const user = await getSessionUser();
  if (!user) return null;

  await connectToDatabase();

  const transactions = await Transaction.find({ $or: [{ sender: user.id }, { receiverPhone: user.phone }] })
    .sort({ createdAt: -1 })
    .limit(5)
    .lean();

  const expenses = await Expense.find({ user: user.id }).lean();
  const totalExpense = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return {
    balance: user.balance,
    totalExpense,
    transactions: transactions.map(t => ({
      id: t._id.toString(),
      type: t.type,
      receiverPhone: t.receiverPhone,
      amount: t.amount,
      status: t.status,
      date: new Date(t.createdAt).toLocaleString(),
    })),
  };
}
