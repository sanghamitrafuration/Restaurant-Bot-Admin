import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
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