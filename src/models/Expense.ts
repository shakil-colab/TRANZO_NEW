import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IExpense extends Document {
  user: mongoose.Types.ObjectId;
  amount: number;
  category: string;
  note: string;
  date: string;
  createdAt: Date;
}

const ExpenseSchema: Schema<IExpense> = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  note: {
    type: String,
    default: 'No note',
  },
  date: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Expense: Model<IExpense> = mongoose.models.Expense || mongoose.model<IExpense>('Expense', ExpenseSchema);
