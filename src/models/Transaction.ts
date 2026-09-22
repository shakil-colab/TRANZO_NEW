import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITransaction extends Document {
  txnId: string;
  type: string;
  sender: mongoose.Types.ObjectId; // User who initiated it
  receiverPhone: string;
  amount: number;
  status: string;
  createdAt: Date;
}

const TransactionSchema: Schema<ITransaction> = new Schema({
  txnId: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    required: true,
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  receiverPhone: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: 'Success',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Transaction: Model<ITransaction> = mongoose.models.Transaction || mongoose.model<ITransaction>('Transaction', TransactionSchema);
