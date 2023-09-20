import { PaymentEntity, PaymentModel } from "../entities/payment";
import { PaymentRepository } from "../repositories/payment-repository";

export interface CreatePaymentUsecase {
  execute: (paymentData: PaymentModel) => Promise<PaymentEntity>;
}

export class CreatePayment implements CreatePaymentUsecase {
  private readonly paymentRepository: PaymentRepository;

  constructor(paymentRepository: PaymentRepository) {
    this.paymentRepository = paymentRepository;
  }

  async execute(paymentData: PaymentModel): Promise<PaymentEntity> {
    return await this.paymentRepository.createPayment(paymentData);
  }
}