export class UserModel {
    constructor(
      public name: string = "",
      public phone: string = "",
      public email: string = "",
      public password: string = "",
      public role: string = ""
    ) {}
  }
  
  export class UserEntity {
    constructor(
      public id: string | undefined = undefined,
      public name: string = "",
      public phone: string = "",
      public email: string = "",
      public password: string = "",
      public role: string = "",
      public createdAt: string
    ) {}
  }
  
  export class UserMapper {
    static toEntity(
        userData: any,
        includeId?: boolean,
        existingUser?: UserEntity
      ): UserEntity {
        if (existingUser != null) {
          return {
            ...existingUser,
            name:
            userData.name !== undefined
                ? userData.name
                : existingUser.name,
            phone:
            userData.phone !== undefined
                ? userData.phone
                : existingUser.phone,
            email:
            userData.email !== undefined
                ? userData.email
                : existingUser.email,
            password:
            userData.password !== undefined
                ? userData.password
                : existingUser.password,
            role:
            userData.role !== undefined
                ? userData.role
                : existingUser.role,
            createdAt:
            userData.createdAt !== undefined
                ? userData.createdAt
                : existingUser.createdAt,
          };
        } else {
          const userEntity: UserEntity = {
            id: includeId
              ? userData._id
                ? userData._id.toString()
                : undefined
              : undefined,
            name: userData.name,
            phone: userData.phone,
            email: userData.email,
            password: userData.password,
            role: userData.role,
            createdAt: userData.createdAt
          };
          return userEntity;
        }
      }
    static toModel(user: UserEntity): any {
        return {
          name: user.name,
          phone: user.phone,
          email: user.email,
          password: user.password,
          role: user.role
        };
      }
}