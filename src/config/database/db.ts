import mongoose from 'mongoose';
import { AppKeys } from '../keys/app_keys';
const _db = mongoose.connection.useDb(AppKeys.default_db);

/// This will be the default db
export const db = {
  // User: _db.model<I_Faculty>('User', facultySchema),
};
