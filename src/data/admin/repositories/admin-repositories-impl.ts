import { Either, Right, Left } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";
import ApiError from "@presentation/error-handling/api-error";
import { AdminDataSource } from "../datasource/admin-data-source";
import { AdminRepository } from "@domain/admin/repositories/admin-repository";
import { AdminEntity, AdminModel } from "@domain/admin/entities/admin";


export class AdminRepositoryImpl implements AdminRepository {
  private readonly dataSource: AdminDataSource;

  constructor(dataSourse: AdminDataSource) {
    this.dataSource = dataSourse;
  }

  async createAdmin(admin: AdminModel) : Promise<Either<ErrorClass, AdminEntity>> {
    try {
        let i= await this.dataSource.create(admin);
        return Right<ErrorClass, AdminEntity>(i);
    } catch (error) { 
        if (error instanceof ApiError && error.name === "conflict") {
            return Left<ErrorClass, AdminEntity>(ApiError.emailExist());
        }
        return Left<ErrorClass, AdminEntity>(ApiError.badRequest());
    }
  }

  async deleteAdmin(id:string) : Promise<Either<ErrorClass, void>> {
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

  async updateAdmin(id:string, data:AdminModel) : Promise<Either<ErrorClass, AdminEntity>> {
    try {
        let i= await this.dataSource.update(id, data);
        return Right<ErrorClass, AdminEntity>(i);
    } catch (error) {
        if (error instanceof ApiError && error.name === "conflict") {
            return Left<ErrorClass, AdminEntity>(ApiError.emailExist());
        }
        return Left<ErrorClass, AdminEntity>(ApiError.badRequest());
    }
  }

  async getAdmins() : Promise<Either<ErrorClass, AdminEntity[]>> {
    try {
        let i= await this.dataSource.getAllAdmin();
        return Right<ErrorClass, AdminEntity[]>(i);
    } catch (error) {
        if (error instanceof ApiError && error.name === "notfound") {
            return Left<ErrorClass, AdminEntity[]>(ApiError.notFound());
        }
        return Left<ErrorClass, AdminEntity[]>(ApiError.badRequest());
    }
  }

  async getAdminById(id:string) : Promise<Either<ErrorClass, AdminEntity>> {
    try {
        let i= await this.dataSource.read(id);
        return Right<ErrorClass, AdminEntity>(i);
    } catch (error) {
        if (error instanceof ApiError && error.name === "notfound") {
            return Left<ErrorClass, AdminEntity>(ApiError.notFound());
        }
        return Left<ErrorClass, AdminEntity>(ApiError.badRequest());
    }
  }
}