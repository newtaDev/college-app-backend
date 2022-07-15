import mongoose from 'mongoose';
import { I_UserDocument, userSchema } from '../../modules/user/user.model';

const _db = mongoose.connection.useDb('main_db');

/// This will be the main database
export const db = {
  User: _db.model<I_UserDocument>('User', userSchema),
};
