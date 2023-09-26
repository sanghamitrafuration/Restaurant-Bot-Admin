import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";
import { PaymentEntity, PaymentModel } from "../entities/payment";
import { PaymentRepository } from "../repositories/payment-repository";


export interface UpdatePaymentUsecase {
    execute : (id : string, data: PaymentModel) => Promise<Either<ErrorClass, PaymentEntity>>
}

export class UpdatePayment implements UpdatePaymentUsecase {
    
    private readonly paymentRepository : PaymentRepository

    constructor (paymentRepository : PaymentRepository){
        this.paymentRepository= paymentRepository;
    }

    async execute(id : string, data : PaymentModel) : Promise<Either<ErrorClass, PaymentEntity>>{
        return await this.paymentRepository.updatePayment(id, data);
    }
}