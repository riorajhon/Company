import mongoose, { Schema, model, models } from 'mongoose';

export type ApplicationStatus = 'pending' | 'accepted' | 'rejected';

export interface IApplication {
  _id: string;
  jobId: string;
  fullName: string;
  email: string;
  phone?: string;
  github?: string;
  linkedin?: string;
  resumeUrl: string;
  message?: string;
  status: ApplicationStatus;
  createdAt: Date;
  updatedAt?: Date;
}

const ApplicationSchema = new Schema<IApplication>(
  {
    jobId: { type: String, required: true },
    fullName: { type: String, required: true },
    name: { type: String }, // legacy
    email: { type: String, required: true },
    phone: String,
    github: String,
    linkedin: String,
    resumeUrl: { type: String, required: true },
    message: String,
    status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
  },
  { timestamps: true }
);

export const Application = (models && models.Application) ? models.Application : model<IApplication>('Application', ApplicationSchema);
