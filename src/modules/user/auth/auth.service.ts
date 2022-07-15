import { db } from '../../../config/database/db';
import { I_User, I_UserDocument } from '../user.model';

export const registerUser = (user: I_User): Promise<I_UserDocument> =>
  db.User.create(user);
  
export const loginUser = async (
  email: string
): Promise<I_UserDocument | null> => await db.User.findOne({ email: email });
