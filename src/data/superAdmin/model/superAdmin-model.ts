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
  businessName: {
    type: String,
    required: true
  },
  lastsubscription: {
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
  ]
});

const SuperAdmin = mongoose.model('SuperAdmin', superAdminSchema);

export default SuperAdmin;