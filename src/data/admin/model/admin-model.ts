import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
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
  businessName: {
    type: String,
    required: true
  },
  subscriptiontaken: {
    type: String,
    default: ""
  },
  subscriptionend: {
    type: String,
    default: ""
  },
  botrunning: {
    type: Boolean,
    default: false
  },
  paymentHistory : [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
    },
  ],
  createdAt : {
    type: Date,
    default: Date.now()
  }
});

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;