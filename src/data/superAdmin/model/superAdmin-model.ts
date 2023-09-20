import mongoose, { Model } from 'mongoose';

const superAdminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const SuperAdmin = mongoose.model('SuperAdmin', superAdminSchema);

export default SuperAdmin;