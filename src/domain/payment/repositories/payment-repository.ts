import { PaymentEntity, PaymentModel } from "../entities/payment";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";


export interface PaymentRepository {
  createPayment(payment: PaymentModel): Promise<Either<ErrorClass, PaymentEntity>>;
  getPayments(): Promise<Either<ErrorClass, PaymentEntity[]>>;
  getPaymentsByAdminId(adminId: string): Promise<Either<ErrorClass, PaymentEntity[]>>;
  getPaymentById(id: string): Promise<Either<ErrorClass, PaymentEntity>>;
}