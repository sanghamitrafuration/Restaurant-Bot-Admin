import { boolean } from 'joi';
import mongoose, { Document, Model } from 'mongoose';

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
    type: boolean,
    default: false
  },
  paymentHistory : [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
    },
  ]
});

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;