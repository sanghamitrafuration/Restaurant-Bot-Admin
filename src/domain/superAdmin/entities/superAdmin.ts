export class SuperAdminModel {
    constructor(
      public name: string = "",
      public phone: number = 0,
      public email: string = "",
      public password: string = ""
    ) {}
  }
  
  export class SuperAdminEntity {
    constructor(
      public id: string | undefined = undefined,
      public name: string = "",
      public phone: number = 0,
      public email: string = "",
      public password: string = "",
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
            password:
            superAdminData.password !== undefined
                ? superAdminData.password
                : existingSuperAdmin.password,
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
            password: superAdminData.password,
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
          password: superAdmin.password,
        };
      }
}