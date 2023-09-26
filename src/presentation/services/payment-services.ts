import { NextFunction, Request, Response } from "express";
import ApiError from "@presentation/error-handling/api-error";
import { CreatePaymentUsecase } from "@domain/payment/usecases/create-payment";
import { GetPaymentByIdUsecase } from "@domain/payment/usecases/get-payment-by-id";
import { GetAllPaymentsUsecase } from "@domain/payment/usecases/get-all-payment";
import { PaymentEntity, PaymentMapper, PaymentModel } from "@domain/payment/entities/payment";
import { GetAllPaymentsByAdminIdUsecase } from "@domain/payment/usecases/get-all-payments-by-admin-id";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";

export class PaymentServices {
  private readonly createPaymentUsecases: CreatePaymentUsecase;
  private readonly getPaymentByIdUsecases: GetPaymentByIdUsecase;
  private readonly getAllPaymentsUsecases: GetAllPaymentsUsecase;
  private readonly getAllPaymentsByAdminIdUsecases: GetAllPaymentsByAdminIdUsecase;

  constructor(
    createPaymentUsecases: CreatePaymentUsecase,
    getPaymentByIdUsecases: GetPaymentByIdUsecase,
    getAllPaymentsUsecases: GetAllPaymentsUsecase,
    getAllPaymentsByAdminIdUsecases: GetAllPaymentsByAdminIdUsecase
  ) {
    (this.createPaymentUsecases = createPaymentUsecases),
    (this.getPaymentByIdUsecases = getPaymentByIdUsecases),
    (this.getAllPaymentsUsecases = getAllPaymentsUsecases),
    (this.getAllPaymentsByAdminIdUsecases = getAllPaymentsByAdminIdUsecases)
  }

  async createPayment(req: Request, res: Response): Promise<void> {
    const paymentData: PaymentModel = PaymentMapper.toModel(req.body);

    const newPaymentData: Either<ErrorClass, PaymentEntity> = 
      await this.createPaymentUsecases.execute(paymentData);

      newPaymentData.cata(
      (error : ErrorClass) =>
      res.status(error.status).json({error : error.message}),
      (result : PaymentEntity) => {
        const responseData = PaymentMapper.toEntity(result, true);
        return res.json(responseData);
      }
    )
  }
  

  async getPaymentById(req: Request, res: Response): Promise<void> {
    const id : string = req.params.id;
    const payment : Either<ErrorClass, PaymentEntity> = 
    await this.getPaymentByIdUsecases.execute(id);
    payment.cata(
      (error: ErrorClass) =>
      res.status(error.status).json({ error: error.message }),
      (result: PaymentEntity) => {
        const resdata = PaymentMapper.toModel(result);
        return res.json(resdata);
      }
    );
  }

  async getAllPayments (req: Request, res: Response) : Promise<void> {
    const payments : Either<ErrorClass, PaymentEntity[]> = await this.getAllPaymentsUsecases.execute();
    payments.cata(
      (error: ErrorClass) =>
          res.status(error.status).json({ error: error.message }),
      (result: PaymentEntity[]) => {
          const resdata = result.map((payment) =>
          PaymentMapper.toModel(payment)
        );
        return res.json(resdata);
      }
    )
  }

  async getAllPaymentsByAdminId (req: Request, res: Response) : Promise<void> {
    const adminId : string = req.params.adminId;
    const payments : Either<ErrorClass, PaymentEntity[]> = await this.getAllPaymentsByAdminIdUsecases.execute(adminId);
    payments.cata(
      (error: ErrorClass) =>
          res.status(error.status).json({ error: error.message }),
      (result: PaymentEntity[]) => {
          const resdata = result.map((payment) =>
          PaymentMapper.toModel(payment)
        );
        return res.json(resdata);
      }
    )
  }
}