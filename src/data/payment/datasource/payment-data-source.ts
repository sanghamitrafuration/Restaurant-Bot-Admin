import mongoose from "mongoose";
import { PaymentModel } from "@domain/payment/entities/payment";
import Payment from "../model/payment-model";

//Create PaymentDataSourse Interface
export interface PaymentDataSource {
  create(payment: PaymentModel): Promise<any>;
  update(id: String, payment: PaymentModel): Promise<any>;
  read(id: string): Promise<any | null>;
  getAllPayment(): Promise<any[]>;
  getAllPaymentByAdminId(adminId: string): Promise<any[]>;
}


export class PaymentDataSourceImpl implements PaymentDataSource {
  constructor(private db: mongoose.Connection) {}
  
  async create(payment: PaymentModel): Promise<any> {
    const paymentData = new Payment(payment);
    const createdPayment = await paymentData.save();

    return createdPayment.toObject();
  }

  async update(id: string, payment: PaymentModel): Promise<any> {
    const updatedPayment = await Payment.findByIdAndUpdate(id, payment, {
      new: true,
    }); // No need for conversion here
    return updatedPayment ? updatedPayment.toObject() : null; // Convert to plain JavaScript object before returning
  }

  async read(id: string): Promise<any | null> {
    const payment = await Payment.findById(id);
    return payment ? payment.toObject() : null; // Convert to plain JavaScript object before returning
  }

  async getAllPayment(): Promise<any[]> {
    const payments = await Payment.find();
    return payments.map((payment) => payment.toObject()); // Convert to plain JavaScript objects before returning
  }

  async getAllPaymentByAdminId(adminId: string): Promise<any[]> {
    const payments = await Payment.find({adminId});
    return payments.map((payment) => payment.toObject()); // Convert to plain JavaScript objects before returning
  }
}