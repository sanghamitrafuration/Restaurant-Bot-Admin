import { AdminEntity, AdminModel } from "../entities/admin";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";


export interface AdminRepository {
  createAdmin(admin:AdminModel) : Promise<Either<ErrorClass, AdminEntity>>;
  deleteAdmin(id:string): Promise<Either<ErrorClass, void>>;
  getAdmins() : Promise<Either<ErrorClass, AdminEntity[]>>;
  getAdminById(id: string) : Promise<Either<ErrorClass, AdminEntity>>;
  updateAdmin(id: string, data: AdminModel) : Promise<Either<ErrorClass, AdminEntity>>
}