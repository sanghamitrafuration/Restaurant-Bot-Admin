import { AdminEntity } from "../entities/admin";
import { AdminRepository } from "../repositories/admin-repository";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";

export interface GetAdminByIdUsecase {
  execute: (id: string) => Promise<Either<ErrorClass, AdminEntity>>;
}


export class GetAdminById implements GetAdminByIdUsecase {
  private readonly adminRepository: AdminRepository;

  constructor(adminRepository: AdminRepository) {
    this.adminRepository = adminRepository;
  }

  async execute(id: string): Promise<Either<ErrorClass, AdminEntity>> {
    return await this.adminRepository.getAdminById(id);
  }
}