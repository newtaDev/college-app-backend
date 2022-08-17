import mongoose from 'mongoose';

const college = mongoose.connection.useDb('college_db_temp');
const user = mongoose.connection.useDb('user_db_temp');

export default {
  college,
  user,
};
