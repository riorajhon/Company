import mongoose, { Schema, model, models, type Model } from 'mongoose';

export const BENEFITS_OPTIONS = [
  'Dental insurance',
  'Employee assistance program',
  'Health insurance',
  'Health savings account',
  'Paid time off',
  'Professional development assistance',
  'Retirement plan',
  'Tuition reimbursement',
  'Vision insurance',
] as const;

export interface IJob {
  _id: string;
  title: string;
  education: string;
  keyKnowledgeSkills: string[];
  type: string;
  pay: string;
  benefits: string[];
  workLocation: string;
  /** @deprecated use workLocation - kept for backward compat */
  location?: string;
  description: string;
  /** Job image URL (required when posting). Shown on job list. */
  image?: string;
  published: boolean;
  /** Set when created by a manager; super_managers see all jobs */
  createdBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

/** Result of Job.findOne().lean() - _id is ObjectId */
export type JobLean = Omit<IJob, '_id'> & { _id: mongoose.Types.ObjectId };

const JobSchema = new Schema<IJob>(
  {
    title: { type: String, required: true },
    education: { type: String, default: '' },
    keyKnowledgeSkills: [{ type: String }],
    type: { type: String, required: true },
    pay: { type: String, default: '' },
    benefits: [{ type: String }],
    workLocation: { type: String, default: '' },
    location: { type: String }, // legacy – prefer workLocation
    description: { type: String, required: true },
    image: { type: String, default: '' },
    published: { type: Boolean, default: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

export const Job: Model<IJob> = (models?.Job ?? model<IJob>('Job', JobSchema)) as Model<IJob>;
