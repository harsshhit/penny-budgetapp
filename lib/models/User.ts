import mongoose, { Schema, model, models } from 'mongoose';

export interface IUser {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String },
    email: { type: String, index: true, unique: true, sparse: true },
    image: { type: String },
  },
  { timestamps: true }
);

export const UserModel = models.User || model<IUser>('User', UserSchema);



