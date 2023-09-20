import mongoose, { Model } from 'mongoose';

const paymentSchema = new mongoose.Schema({
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
    required: true
  },
  refno: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  adminNumber: {
    type: String,
    required: true
  },
  service: {
    type: String,
    required: true
  },
});

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;