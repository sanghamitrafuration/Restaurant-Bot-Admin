import { PaymentEntity } from "../entities/payment";
import { PaymentRepository } from "../repositories/payment-repository";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";

export interface GetAllPaymentsByAdminIdUsecase {
  execute: (adminId: string) => Promise<Either<ErrorClass, PaymentEntity[]>>;
}

export class GetAllPaymentsByAdminId implements GetAllPaymentsByAdminIdUsecase {
  private readonly paymentRepository: PaymentRepository;
  constructor(paymentRepository: PaymentRepository) {
    this.paymentRepository = paymentRepository;
  }

  async execute(adminId: string): Promise<Either<ErrorClass, PaymentEntity[]>> {
    return await this.paymentRepository.getPaymentsByAdminId(adminId);
  }
}