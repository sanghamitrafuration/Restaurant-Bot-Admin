import { NextFunction, Request, Response } from "express";
import ApiError from "@presentation/error-handling/api-error";
import { CreatePaymentUsecase } from "@domain/payment/usecases/create-payment";
import { GetPaymentByIdUsecase } from "@domain/payment/usecases/get-payment-by-id";
import { GetAllPaymentsUsecase } from "@domain/payment/usecases/get-all-payment";
import { PaymentEntity, PaymentMapper, PaymentModel } from "@domain/payment/entities/payment";

export class PaymentServices {
  private readonly createPaymentUsecases: CreatePaymentUsecase;
  private readonly getPaymentByIdUsecases: GetPaymentByIdUsecase;
  private readonly getAllPaymentsUsecases: GetAllPaymentsUsecase;

  constructor(
    createPaymentUsecases: CreatePaymentUsecase,
    getPaymentByIdUsecases: GetPaymentByIdUsecase,
    getAllPaymentsUsecases: GetAllPaymentsUsecase,
  ) {
    (this.createPaymentUsecases = createPaymentUsecases),
    (this.getPaymentByIdUsecases = getPaymentByIdUsecases),
    (this.getAllPaymentsUsecases = getAllPaymentsUsecases)
  }

  async createPayment(req: Request, res: Response): Promise<void> {
    try {
      const paymentData: PaymentModel = PaymentMapper.toModel(req.body);

      // Call the CreatePaymentUsecase to create the payment
      const newPayment: PaymentEntity =
        await this.createPaymentUsecases.execute(paymentData);

      const responseData = PaymentMapper.toEntity(newPayment, true);

      res.json(responseData);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.status).json({ error: error.message });
      }

      const err = ApiError.internalError();
      res.status(err.status).json(err.message);
    }
  }
  

  async getPaymentById(req: Request, res: Response): Promise<void> {
    try {
      const id: string = req.params.id;

      const payment: PaymentEntity | null =
        await this.getPaymentByIdUsecases.execute(id);

      if (payment) {
        const responseData = PaymentMapper.toModel(payment);

        res.json(responseData);
      } else {
        ApiError.notFound();
      }
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.status).json({ error: error.message });
      }

      const err = ApiError.internalError();
      res.status(err.status).json(err.message);
    }
  }

  async getAllPayments(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const payments: PaymentEntity[] =
        await this.getAllPaymentsUsecases.execute();

      const responseData = payments.map((payment) =>
        PaymentMapper.toModel(payment)
      );

      res.json(responseData);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.status).json({ error: error.message });
      }
      const err = ApiError.internalError();
      res.status(err.status).json(err.message);
    }
  }
}