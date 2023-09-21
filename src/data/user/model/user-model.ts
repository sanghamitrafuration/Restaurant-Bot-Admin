import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
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
  },
  role: {
    type: String,
    required: true,
    default: "admin"
  },
  createdAt : {
    type: Date,
    default: Date.now()
  }
});

const User = mongoose.model('User', userSchema);

export default User;