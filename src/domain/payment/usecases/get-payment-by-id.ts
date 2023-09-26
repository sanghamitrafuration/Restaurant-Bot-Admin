import { PaymentEntity } from "../entities/payment";
import { PaymentRepository } from "../repositories/payment-repository";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";

export interface GetPaymentByIdUsecase {
  execute: (id: string) => Promise<Either<ErrorClass, PaymentEntity>>;
}


export class GetPaymentById implements GetPaymentByIdUsecase {
  private readonly paymentRepository: PaymentRepository;

  constructor(paymentRepository: PaymentRepository) {
    this.paymentRepository = paymentRepository;
  }

  async execute(id: string): Promise<Either<ErrorClass, PaymentEntity>> {
    return await this.paymentRepository.getPaymentById(id);
  }
}