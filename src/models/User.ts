import mongoose, { Schema, model, models, type Model } from 'mongoose';

export type UserRole = 'manager' | 'super_manager';

export interface IUser {
  _id: string;
  email: string;
  password: string;
  name: string;
  role: UserRole;
  /** If false, user cannot sign in until a super_manager approves. */
  approved: boolean;
  /** Profile: avatar image URL (e.g. /uploads/avatars/xxx.jpg) */
  avatar?: string;
  /** LinkedIn profile URL */
  linkedIn?: string;
  /** Phone number */
  phoneNumber?: string;
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
    avatar: { type: String, default: '' },
    linkedIn: { type: String, default: '' },
    phoneNumber: { type: String, default: '' },
  },
  { timestamps: true }
);

export const User: Model<IUser> = (models?.User ?? model<IUser>('User', UserSchema)) as Model<IUser>;
