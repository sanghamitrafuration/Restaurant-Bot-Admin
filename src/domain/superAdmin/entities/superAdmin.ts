export class SuperAdminModel {
    constructor(
      public name: string = "",
      public phone: number = 0,
      public email: string = "",
      public businessName: string = "",
      public lastsubscription: string = "",
      public botrunning: boolean = false,
      public paymentHistory: object[] | undefined = []
    ) {}
  }
  
  export class SuperAdminEntity {
    constructor(
      public id: string | undefined = undefined,
      public name: string = "",
      public phone: number = 0,
      public email: string = "",
      public businessName: string = "",
      public lastsubscription: string = "",
      public botrunning: boolean = false,
      public paymentHistory: object[] | undefined = [],
      public createdAt: string
    ) {}
  }
  
  export class SuperAdminMapper {
    static toEntity(
        superAdminData: any,
        includeId?: boolean,
        existingSuperAdmin?: SuperAdminEntity
      ): SuperAdminEntity {
        if (existingSuperAdmin != null) {
          return {
            ...existingSuperAdmin,
            name:
            superAdminData.name !== undefined
                ? superAdminData.name
                : existingSuperAdmin.name,
            phone:
            superAdminData.phone !== undefined
                ? superAdminData.phone
                : existingSuperAdmin.phone,
            email:
            superAdminData.email !== undefined
                ? superAdminData.email
                : existingSuperAdmin.email,
            businessName:
            superAdminData.businessName !== undefined
                ? superAdminData.businessName
                : existingSuperAdmin.businessName,
            lastsubscription:
            superAdminData.lastsubscription !== undefined
                ? superAdminData.lastsubscription
                : existingSuperAdmin.lastsubscription,
            botrunning:
            superAdminData.botrunning !== undefined
                ? superAdminData.botrunning
                : existingSuperAdmin.botrunning,
            paymentHistory:
            superAdminData.paymentHistory !== undefined
                ? superAdminData.paymentHistory
                : existingSuperAdmin.paymentHistory,
            createdAt:
            superAdminData.createdAt !== undefined
                ? superAdminData.createdAt
                : existingSuperAdmin.createdAt,
          };
        } else {
          const superAdminEntity: SuperAdminEntity = {
            id: includeId
              ? superAdminData._id
                ? superAdminData._id.toString()
                : undefined
              : undefined,
            name: superAdminData.name,
            phone: superAdminData.phone,
            email: superAdminData.email,
            businessName: superAdminData.businessName,
            lastsubscription: superAdminData.lastsubscription,
            botrunning: superAdminData.botrunning,
            paymentHistory: superAdminData.paymentHistory,
            createdAt: superAdminData.createdAt
          };
          return superAdminEntity;
        }
      }
    static toModel(superAdmin: SuperAdminEntity): any {
        return {
          name: superAdmin.name,
          phone: superAdmin.phone,
          email: superAdmin.email,
          businessName: superAdmin.businessName,
          lastsubscription: superAdmin.lastsubscription,
          botrunning: superAdmin.botrunning,
          paymentHistory: superAdmin.paymentHistory
        };
      }
}