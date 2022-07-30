import mongoose from 'mongoose';

const college = mongoose.connection.useDb('college_db');
const user = mongoose.connection.useDb('user_db');

export default {
  college,
  user,
};
