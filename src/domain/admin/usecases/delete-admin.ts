import { AdminRepository } from "../repositories/admin-repository";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";


export interface DeleteAdminUsecase {
  execute: (id: string) => Promise<Either<ErrorClass, void>>;
}

export class DeleteAdmin implements DeleteAdminUsecase {
  private readonly adminRepository: AdminRepository;

  constructor(adminRepository: AdminRepository) {
    this.adminRepository = adminRepository;
  }

  async execute(id: string): Promise<Either<ErrorClass, void>> {
    return await this.adminRepository.deleteAdmin(id);
  }
}