import { PaymentEntity } from "../entities/payment";
import { PaymentRepository } from "../repositories/payment-repository";

export interface GetAllPaymentsUsecase {
  execute: () => Promise<PaymentEntity[]>;
}

export class GetAllPayments implements GetAllPaymentsUsecase {
  private readonly paymentRepository: PaymentRepository;
  constructor(paymentRepository: PaymentRepository) {
    this.paymentRepository = paymentRepository;
  }

  async execute(): Promise<PaymentEntity[]> {
    return await this.paymentRepository.getPayments();
  }
}