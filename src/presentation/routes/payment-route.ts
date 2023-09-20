import mongoose from "mongoose";
import { Router } from "express";
import { PaymentDataSourceImpl } from "@data/payment/datasource/payment-data-source";
import { PaymentRepositoryImpl } from "@data/payment/repositories/payment-repositories-impl";
import { CreatePayment } from "@domain/payment/usecases/create-payment";
import { GetPaymentById } from "@domain/payment/usecases/get-payment-by-id";
import { GetAllPayments } from "@domain/payment/usecases/get-all-payment";
import { PaymentServices } from "@presentation/services/payment-services";

const paymentDataSource = new PaymentDataSourceImpl(mongoose.connection);

const paymentRepository = new PaymentRepositoryImpl(paymentDataSource);

const createPaymentUsecase = new CreatePayment(paymentRepository);
const getPaymentByIdUsecases = new GetPaymentById(paymentRepository);
const getAllPayments = new GetAllPayments(paymentRepository);

const paymentService = new PaymentServices(
  createPaymentUsecase,
  getPaymentByIdUsecases,
  getAllPayments,
);

// Create an Express router
export const paymentRouter = Router();

paymentRouter.post("/new", paymentService.createPayment.bind(paymentService));

paymentRouter.get(
  "/:id",
  paymentService.getPaymentById.bind(paymentService)
);

paymentRouter.get("/", paymentService.getAllPayments.bind(paymentService));