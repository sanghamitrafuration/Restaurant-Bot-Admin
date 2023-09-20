import mongoose from 'mongoose';

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
  createdAt : {
    type: Date,
    default: Date.now()
  }
});

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;