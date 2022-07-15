import { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';
interface I_User {
  name: string;
  email: string;
  password: string;
  isPasswordValid(password: string): Promise<boolean>;
}
interface I_UserDocument extends I_User, Document {}

const userSchema = new Schema<I_UserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

userSchema.methods.isPasswordValid = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  // 10 is salt
  const hashedPassword = await bcrypt.hash(this.password, 10);
  this.password = hashedPassword;
  next();
});

export { I_User, I_UserDocument, userSchema };
