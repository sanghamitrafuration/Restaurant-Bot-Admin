import { UserRepository } from "@domain/user/repositories/user-repository";
import { UserDataSource } from "../datasource/user-data-source";
import { UserEntity, UserModel } from "@domain/user/entities/user";
import { Either, Right, Left } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";
import ApiError from "@presentation/error-handling/api-error";


export class UserRepositoryImpl implements UserRepository {
  private readonly dataSource: UserDataSource;

  constructor(dataSourse: UserDataSource) {
    this.dataSource = dataSourse;
  }

  async createUser(user: UserModel) : Promise<Either<ErrorClass, UserEntity>> {
    try {
        let i= await this.dataSource.create(user);
        return Right<ErrorClass, UserEntity>(i);
    } catch (error) {
        if (error instanceof ApiError && error.name === "conflict") {
            return Left<ErrorClass, UserEntity>(ApiError.emailExist());
        }
        return Left<ErrorClass, UserEntity>(ApiError.badRequest());
    }
}

  async loginUser(phone: string, password: string): Promise<Either<ErrorClass, UserEntity>> {
    try {
      let i= await this.dataSource.loginUser(phone, password);
      return Right<ErrorClass, UserEntity>(i);
  } catch (error) {
      return Left<ErrorClass, UserEntity>(ApiError.badRequest());
  }
  }

  async deleteUser(id:string) : Promise<Either<ErrorClass, void>> {
    try {
        let i= await this.dataSource.delete(id);
        return Right<ErrorClass, void>(i);
    } catch (error) {
        if (error instanceof ApiError && error.name === "notfound") {
            return Left<ErrorClass, void>(ApiError.notFound());
        }
        return Left<ErrorClass, void>(ApiError.badRequest());
    }
}

  async updateUser(id:string, data:UserModel) : Promise<Either<ErrorClass, UserEntity>> {
    try {
        let i= await this.dataSource.update(id, data);
        return Right<ErrorClass, UserEntity>(i);
    } catch (error) {
        if (error instanceof ApiError && error.name === "conflict") {
            return Left<ErrorClass, UserEntity>(ApiError.emailExist());
        }
        return Left<ErrorClass, UserEntity>(ApiError.badRequest());
    }
  }

  async getUsers() : Promise<Either<ErrorClass, UserEntity[]>> {
    try {
        let i= await this.dataSource.getAllUser();
        return Right<ErrorClass, UserEntity[]>(i);
    } catch (error) {
        if (error instanceof ApiError && error.name === "notfound") {
            return Left<ErrorClass, UserEntity[]>(ApiError.notFound());
        }
        return Left<ErrorClass, UserEntity[]>(ApiError.badRequest());
    }
  }

  async getUserById(id:string) : Promise<Either<ErrorClass, UserEntity>> {
    try {
        let i= await this.dataSource.read(id);
        return Right<ErrorClass, UserEntity>(i);
    } catch (error) {
        if (error instanceof ApiError && error.name === "notfound") {
            return Left<ErrorClass, UserEntity>(ApiError.notFound());
        }
        return Left<ErrorClass, UserEntity>(ApiError.badRequest());
    }
  }
}