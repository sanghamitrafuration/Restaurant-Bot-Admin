import { PaymentRepository } from "@domain/payment/repositories/payment-repository";
import { PaymentDataSource } from "../datasource/payment-data-source";
import { PaymentEntity, PaymentModel } from "@domain/payment/entities/payment";
import { Either, Right, Left } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";
import ApiError from "@presentation/error-handling/api-error";


export class PaymentRepositoryImpl implements PaymentRepository {
  private readonly dataSource: PaymentDataSource;

  constructor(dataSourse: PaymentDataSource) {
    this.dataSource = dataSourse;
  }

  async createPayment(payment: PaymentModel) : Promise<Either<ErrorClass, PaymentEntity>> {
    try {
        let i= await this.dataSource.create(payment);
        return Right<ErrorClass, PaymentEntity>(i);
    } catch (error) { 
        if (error instanceof ApiError && error.name === "conflict") {
            return Left<ErrorClass, PaymentEntity>(ApiError.emailExist());
        }
        return Left<ErrorClass, PaymentEntity>(ApiError.badRequest());
    }
  }

  async getPayments() : Promise<Either<ErrorClass, PaymentEntity[]>> {
    try {
        let i= await this.dataSource.getAllPayment();
        return Right<ErrorClass, PaymentEntity[]>(i);
    } catch (error) {
        if (error instanceof ApiError && error.name === "notfound") {
            return Left<ErrorClass, PaymentEntity[]>(ApiError.notFound());
        }
        return Left<ErrorClass, PaymentEntity[]>(ApiError.badRequest());
    }
  }

  async getPaymentsByAdminId(adminId: string): Promise<Either<ErrorClass, PaymentEntity[]>> {
    try {
        let i= await this.dataSource.getAllPaymentByAdminId(adminId);
        return Right<ErrorClass, PaymentEntity[]>(i);
    } catch (error) {
        if (error instanceof ApiError && error.name === "notfound") {
            return Left<ErrorClass, PaymentEntity[]>(ApiError.notFound());
        }
        return Left<ErrorClass, PaymentEntity[]>(ApiError.badRequest());
    }
  }

  async getPaymentById(id:string) : Promise<Either<ErrorClass, PaymentEntity>> {
    try {
        let i= await this.dataSource.read(id);
        return Right<ErrorClass, PaymentEntity>(i);
    } catch (error) {
        if (error instanceof ApiError && error.name === "notfound") {
            return Left<ErrorClass, PaymentEntity>(ApiError.notFound());
        }
        return Left<ErrorClass, PaymentEntity>(ApiError.badRequest());
    }
  }
}