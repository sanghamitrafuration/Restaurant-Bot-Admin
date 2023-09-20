import { PaymentRepository } from "@domain/payment/repositories/payment-repository";
import { PaymentDataSource } from "../datasource/payment-data-source";
import { PaymentEntity, PaymentModel } from "@domain/payment/entities/payment";


export class PaymentRepositoryImpl implements PaymentRepository {
  private readonly dataSource: PaymentDataSource;

  constructor(dataSourse: PaymentDataSource) {
    this.dataSource = dataSourse;
  }

  async createPayment(payment: PaymentModel): Promise<PaymentEntity> {
    return await this.dataSource.create(payment);
  }

  async getPayments(): Promise<PaymentEntity[]> {
    return await this.dataSource.getAllPayment();
  }

  async getPaymentById(id: string): Promise<PaymentEntity | null> {
    return await this.dataSource.read(id);
  }
}