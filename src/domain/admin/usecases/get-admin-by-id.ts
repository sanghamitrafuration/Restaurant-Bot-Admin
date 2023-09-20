import { AdminEntity } from "../entities/admin";
import { AdminRepository } from "../repositories/admin-repository";

export interface GetAdminByIdUsecase {
  execute: (id: string) => Promise<AdminEntity | null>;
}


export class GetAdminById implements GetAdminByIdUsecase {
  private readonly adminRepository: AdminRepository;

  constructor(adminRepository: AdminRepository) {
    this.adminRepository = adminRepository;
  }

  async execute(id: string): Promise<AdminEntity | null> {
    return await this.adminRepository.getAdminById(id);
  }
}