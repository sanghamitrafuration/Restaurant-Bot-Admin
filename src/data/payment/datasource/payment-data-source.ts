import mongoose from "mongoose";
import { PaymentModel } from "@domain/payment/entities/payment";
import Payment from "../model/payment-model";

//Create PaymentDataSourse Interface
export interface PaymentDataSource {
  create(payment: PaymentModel): Promise<any>;
  read(id: string): Promise<any | null>;
  getAllPayment(): Promise<any[]>;
}


export class PaymentDataSourceImpl implements PaymentDataSource {
  constructor(private db: mongoose.Connection) {}
  async create(payment: PaymentModel): Promise<any> {

    const paymentData = new Payment(payment);
    const createdPayment = await paymentData.save();

    return createdPayment.toObject();
  }

  async read(id: string): Promise<any | null> {
    const payment = await Payment.findById(id);
    return payment ? payment.toObject() : null; // Convert to plain JavaScript object before returning
  }

  async getAllPayment(): Promise<any[]> {
    const payments = await Payment.find();
    return payments.map((payment) => payment.toObject()); // Convert to plain JavaScript objects before returning
  }
}