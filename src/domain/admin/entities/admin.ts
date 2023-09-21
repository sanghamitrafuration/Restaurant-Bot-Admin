export class AdminModel {
    constructor(
      public userId: string = "",
      public businessName: string = "",
      public subscriptiontaken: string = "",
      public subscriptionend: string = "",
      public botrunning: boolean = false,
      public paymentHistory: object[] | undefined = []
    ) {}
  }
  
  export class AdminEntity {
    constructor(
      public id: string | undefined = undefined,
      public userId: string = "",
      public businessName: string = "",
      public subscriptiontaken: string = "",
      public subscriptionend: string = "",
      public botrunning: boolean = false,
      public paymentHistory: object[] | undefined = [],
      public createdAt: string
    ) {}
  }
  
  export class AdminMapper {
    static toEntity(
        adminData: any,
        includeId?: boolean,
        existingAdmin?: AdminEntity
      ): AdminEntity {
        if (existingAdmin != null) {
          return {
            ...existingAdmin,
            userId:
            adminData.userId !== undefined
                ? adminData.userId
                : existingAdmin.userId,
            businessName:
            adminData.businessName !== undefined
                ? adminData.businessName
                : existingAdmin.businessName,
            subscriptiontaken:
            adminData.subscriptiontaken !== undefined
                ? adminData.subscriptiontaken
                : existingAdmin.subscriptiontaken,
            subscriptionend:
            adminData.subscriptionend !== undefined
                ? adminData.subscriptionend
                : existingAdmin.subscriptionend,
            botrunning:
            adminData.botrunning !== undefined
                ? adminData.botrunning
                : existingAdmin.botrunning,
            paymentHistory:
            adminData.paymentHistory !== undefined
                ? adminData.paymentHistory
                : existingAdmin.paymentHistory,
            createdAt:
            adminData.createdAt !== undefined
                ? adminData.createdAt
                : existingAdmin.createdAt,
          };
        } else {
          const adminEntity: AdminEntity = {
            id: includeId
              ? adminData._id
                ? adminData._id.toString()
                : undefined
              : undefined,
            userId: adminData.userId,
            businessName: adminData.businessName,
            subscriptiontaken: adminData.subscriptiontaken,
            subscriptionend: adminData.subscriptionend,
            botrunning: adminData.botrunning,
            paymentHistory: adminData.paymentHistory,
            createdAt: adminData.createdAt
          };
          return adminEntity;
        }
      }
    static toModel(admin: AdminEntity): any {
        return {
          userId: admin.userId,
          businessName: admin.businessName,
          subscriptiontaken: admin.subscriptiontaken,
          subscriptionend: admin.subscriptionend,
          botrunning: admin.botrunning,
          paymentHistory: admin.paymentHistory
        };
      }
}