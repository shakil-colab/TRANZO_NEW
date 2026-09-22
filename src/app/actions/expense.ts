'use server';

import connectToDatabase from '@/lib/mongodb';
import { Expense } from '@/models/Expense';
import { getSessionUser } from './auth';
import { revalidatePath } from 'next/cache';

import { User } from '@/models/User';
import { Transaction } from '@/models/Transaction';

export async function addExpense(amount: number, category: string, note: string, date: string) {
  const sessionUser = await getSessionUser();
  if (!sessionUser) return { success: false, message: 'Unauthorized' };

  if (amount <= 0) return { success: false, message: 'Invalid amount' };

  await connectToDatabase();
  
  const user = await User.findById(sessionUser.id);
  if (!user) return { success: false, message: 'User not found' };
  
  if (user.balance < amount) return { success: false, message: 'Insufficient balance' };

  user.balance -= amount;
  await user.save();

  await Expense.create({
    user: user._id,
    amount,
    category,
    note: note || 'No note',
    date
  });
  
  const txnId = 'TXN' + Math.floor(100000000 + Math.random() * 900000000);
  await Transaction.create({
    txnId,
    type: 'Expense',
    sender: user._id,
    receiverPhone: category,
    amount,
    status: 'Success'
  });

  revalidatePath('/expense');
  revalidatePath('/dashboard');
  revalidatePath('/history');

  return { success: true };
}

export async function getExpenses(filter: string = 'All') {
  const sessionUser = await getSessionUser();
  if (!sessionUser) return [];

  await connectToDatabase();

  const query: any = { user: sessionUser.id };
  if (filter !== 'All') {
    query.category = filter;
  }

  const expenses = await Expense.find(query).sort({ createdAt: -1 }).lean();
  
  return expenses.map(exp => ({
    id: exp._id.toString(),
    amount: exp.amount,
    category: exp.category,
    note: exp.note,
    date: exp.date
  }));
}

export async function deleteExpense(expenseId: string) {
  const sessionUser = await getSessionUser();
  if (!sessionUser) return { success: false, message: 'Unauthorized' };

  await connectToDatabase();
  
  const expense = await Expense.findOne({ _id: expenseId, user: sessionUser.id });
  if (!expense) return { success: false, message: 'Expense not found' };

  const user = await User.findById(sessionUser.id);
  if (user) {
    user.balance += expense.amount;
    await user.save();
  }

  // Attempt to delete the corresponding transaction (we linked them loosely by amount and category)
  await Transaction.findOneAndDelete({ 
    type: 'Expense', 
    sender: sessionUser.id, 
    amount: expense.amount, 
    receiverPhone: expense.category 
  });

  await Expense.findByIdAndDelete(expenseId);

  revalidatePath('/expense');
  revalidatePath('/dashboard');
  revalidatePath('/history');

  return { success: true };
}
