import mongoose, { Schema, model, models } from 'mongoose';

export type UserRole = 'manager' | 'super_manager';

export interface IUser {
  _id: string;
  email: string;
  password: string;
  name: string;
  role: UserRole;
  /** If false, user cannot sign in until a super_manager approves. */
  approved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/** Result of User.findOne().lean() */
export type UserLean = Omit<IUser, '_id'> & { _id: mongoose.Types.ObjectId };

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true, enum: ['manager', 'super_manager'] },
    approved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const User = (models && models.User) ? models.User : model<IUser>('User', UserSchema);
