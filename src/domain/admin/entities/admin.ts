export class AdminModel {
    constructor(
      public name: string = "",
      public phone: number = 0,
      public email: string = "",
      public password: string = "",
      public businessName: string = "",
      public lastsubscription: string = "",
      public botrunning: boolean = false,
      public paymentHistory: object[] | undefined = []
    ) {}
  }
  
  export class AdminEntity {
    constructor(
      public id: string | undefined = undefined,
      public name: string = "",
      public phone: number = 0,
      public email: string = "",
      public password: string = "",
      public businessName: string = "",
      public lastsubscription: string = "",
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
            name:
            adminData.name !== undefined
                ? adminData.name
                : existingAdmin.name,
            phone:
            adminData.phone !== undefined
                ? adminData.phone
                : existingAdmin.phone,
            email:
            adminData.email !== undefined
                ? adminData.email
                : existingAdmin.email,
            password:
            adminData.password !== undefined
                ? adminData.password
                : existingAdmin.password,
            businessName:
            adminData.businessName !== undefined
                ? adminData.businessName
                : existingAdmin.businessName,
            lastsubscription:
            adminData.lastsubscription !== undefined
                ? adminData.lastsubscription
                : existingAdmin.lastsubscription,
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
            name: adminData.name,
            phone: adminData.phone,
            email: adminData.email,
            password: adminData.password,
            businessName: adminData.businessName,
            lastsubscription: adminData.lastsubscription,
            botrunning: adminData.botrunning,
            paymentHistory: adminData.paymentHistory,
            createdAt: adminData.createdAt
          };
          return adminEntity;
        }
      }
    static toModel(admin: AdminEntity): any {
        return {
          name: admin.name,
          phone: admin.phone,
          email: admin.email,
          password: admin.password,
          businessName: admin.businessName,
          lastsubscription: admin.lastsubscription,
          botrunning: admin.botrunning,
          paymentHistory: admin.paymentHistory
        };
      }
}