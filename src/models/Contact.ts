import mongoose, { Schema, model, models } from 'mongoose';

export interface IContact {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: Date;
}

const ContactSchema = new Schema<IContact>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const Contact = (models && models.Contact) ? models.Contact : model<IContact>('Contact', ContactSchema);
