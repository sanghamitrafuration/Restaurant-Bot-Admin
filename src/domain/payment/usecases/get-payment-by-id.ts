import { PaymentEntity } from "../entities/payment";
import { PaymentRepository } from "../repositories/payment-repository";

export interface GetPaymentByIdUsecase {
  execute: (id: string) => Promise<PaymentEntity | null>;
}


export class GetPaymentById implements GetPaymentByIdUsecase {
  private readonly paymentRepository: PaymentRepository;

  constructor(paymentRepository: PaymentRepository) {
    this.paymentRepository = paymentRepository;
  }

  async execute(id: string): Promise<PaymentEntity | null> {
    return await this.paymentRepository.getPaymentById(id);
  }
}