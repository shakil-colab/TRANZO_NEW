'use server';

import connectToDatabase from '@/lib/mongodb';
import { Transaction } from '@/models/Transaction';
import { User } from '@/models/User';
import { getSessionUser } from './auth';
import { revalidatePath } from 'next/cache';

export async function performTransaction(type: string, receiverPhone: string, amount: number) {
  const sessionUser = await getSessionUser();
  if (!sessionUser) return { success: false, message: 'Unauthorized' };

  await connectToDatabase();
  const sender = await User.findById(sessionUser.id);
  if (!sender) return { success: false, message: 'Sender not found' };

  if (amount <= 0) return { success: false, message: 'Invalid amount' };

  if (type === 'Send Money' || type === 'Cash Out' || type === 'Money Transfer' || type === 'Pay Bill' || type === 'Mobile Recharge') {
    if (sender.balance < amount) {
      return { success: false, message: 'Insufficient balance' };
    }
  }

  // Find receiver if applicable
  const receiver = await User.findOne({ phone: receiverPhone });
  
  if (type === 'Send Money') {
    if (!receiver) return { success: false, message: 'Receiver phone number not registered' };
    
    sender.balance -= amount;
    receiver.balance += amount;
    await receiver.save();
  } else if (type === 'Money Transfer') {
    // Money transfer can be to external bank account (simulate success)
    sender.balance -= amount;
    if (receiver) {
      receiver.balance += amount;
      await receiver.save();
    }
  } else if (type === 'Add Money') {
    sender.balance += amount;
  } else {
    // Cash out, pay bill, recharge - just deduct
    sender.balance -= amount;
  }

  await sender.save();

  const txnId = 'TXN' + Math.floor(100000000 + Math.random() * 900000000);

  await Transaction.create({
    txnId,
    type,
    sender: sender._id,
    receiverPhone: receiver ? receiverPhone : (type === 'Add Money' ? 'Self/Bank' : receiverPhone),
    amount,
    status: 'Success'
  });

  revalidatePath('/dashboard');
  revalidatePath('/history');

  return { success: true, txnId };
}
