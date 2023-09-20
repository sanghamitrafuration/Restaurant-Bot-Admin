export class PaymentModel {
    constructor(
      public adminId: string = "",
      public refno: string = "",
      public status: string = "",
      public adminNumber: string = "",
      public service: string = ""
    ) {}
  }
  
  export class PaymentEntity {
    constructor(
      public id: string | undefined = undefined,
      public adminId: string = "",
      public refno: string = "",
      public status: string = "",
      public adminNumber: string = "",
      public service: string = "",
      public createdAt: string
    ) {}
  }
  
  export class PaymentMapper {
    static toEntity(
        paymentData: any,
        includeId?: boolean,
        existingPayment?: PaymentEntity
      ): PaymentEntity {
        if (existingPayment != null) {
          return {
            ...existingPayment,
            adminId:
            paymentData.adminId !== undefined
                ? paymentData.adminId
                : existingPayment.adminId,
            refno:
            paymentData.refno !== undefined
                ? paymentData.refno
                : existingPayment.refno,
            status:
            paymentData.status !== undefined
                ? paymentData.status
                : existingPayment.status,
            adminNumber:
            paymentData.adminNumber !== undefined
                ? paymentData.adminNumber
                : existingPayment.adminNumber,
            service:
            paymentData.service !== undefined
                ? paymentData.service
                : existingPayment.service,
            createdAt:
            paymentData.createdAt !== undefined
                ? paymentData.createdAt
                : existingPayment.createdAt,
          };
        } else {
          const paymentEntity: PaymentEntity = {
            id: includeId
              ? paymentData._id
                ? paymentData._id.toString()
                : undefined
              : undefined,
            adminId: paymentData.adminId,
            refno: paymentData.refno,
            status: paymentData.status,
            adminNumber: paymentData.adminNumber,
            service: paymentData.service,
            createdAt: paymentData.createdAt
          };
          return paymentEntity;
        }
      }
    static toModel(payment: PaymentEntity): any {
        return {
          adminId: payment.adminId,
          refno: payment.refno,
          status: payment.status,
          adminNumber: payment.adminNumber,
          service: payment.service
        };
      }
}