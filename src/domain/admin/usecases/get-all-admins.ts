import { AdminEntity } from "../entities/admin";
import { AdminRepository } from "../repositories/admin-repository";

export interface GetAllAdminsUsecase {
  execute: () => Promise<AdminEntity[]>;
}

export class GetAllAdmins implements GetAllAdminsUsecase {
  private readonly adminRepository: AdminRepository;
  constructor(adminRepository: AdminRepository) {
    this.adminRepository = adminRepository;
  }

  async execute(): Promise<AdminEntity[]> {
    return await this.adminRepository.getAdmins();
  }
}