import { UserEntity, UserModel } from "../entities/user";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";

export interface UserRepository {
  createUser(user:UserModel) : Promise<Either<ErrorClass, UserEntity>>;
  loginUser(phone:string, password:string) : Promise<Either<ErrorClass, UserEntity>>;
  deleteUser(id:string): Promise<Either<ErrorClass, void>>;
  getUsers() : Promise<Either<ErrorClass, UserEntity[]>>;
  getUserById(id: string) : Promise<Either<ErrorClass, UserEntity>>;
  updateUser(id: string, data: UserModel) : Promise<Either<ErrorClass, UserEntity>>
}