import { AdminEntity, AdminModel } from "../entities/admin";
import { AdminRepository } from "../repositories/admin-repository";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";


export interface CreateAdminUsecase {
  execute: (adminData: AdminModel) => Promise<Either<ErrorClass, AdminEntity>>;
}

export class CreateAdmin implements CreateAdminUsecase {
  private readonly adminRepository: AdminRepository;

  constructor(adminRepository: AdminRepository) {
    this.adminRepository = adminRepository;
  }

  async execute(adminData: AdminModel): Promise<Either<ErrorClass, AdminEntity>> {
    return await this.adminRepository.createAdmin(adminData);
  }
}