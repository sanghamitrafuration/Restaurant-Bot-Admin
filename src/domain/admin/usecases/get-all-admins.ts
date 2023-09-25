import { AdminEntity } from "../entities/admin";
import { AdminRepository } from "../repositories/admin-repository";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";

export interface GetAllAdminsUsecase {
  execute: () => Promise<Either<ErrorClass, AdminEntity[]>>;
}

export class GetAllAdmins implements GetAllAdminsUsecase {
  private readonly adminRepository: AdminRepository;
  constructor(adminRepository: AdminRepository) {
    this.adminRepository = adminRepository;
  }

  async execute(): Promise<Either<ErrorClass, AdminEntity[]>> {
    return await this.adminRepository.getAdmins();
  }
}