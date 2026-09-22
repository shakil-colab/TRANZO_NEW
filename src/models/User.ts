import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
  phone: string;
  pin: string; // Should be hashed in production
  name?: string;
  balance: number;
  role: 'user' | 'admin';
  createdAt: Date;
}

const UserSchema: Schema<IUser> = new Schema({
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  pin: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    default: 'User',
  },
  balance: {
    type: Number,
    default: 1000,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
