import { PaymentEntity, PaymentModel } from "../entities/payment";


export interface PaymentRepository {
  createPayment(payment: PaymentModel): Promise<PaymentEntity>;
  getPayments(): Promise<PaymentEntity[]>;
  getPaymentById(id: string): Promise<PaymentEntity | null>;
}