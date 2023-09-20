import { AdminRepository } from "../repositories/admin-repository";

export interface DeleteAdminUsecase {
  execute: (id: string) => Promise<void>;
}

export class DeleteAdmin implements DeleteAdminUsecase {
  private readonly adminRepository: AdminRepository;

  constructor(adminRepository: AdminRepository) {
    this.adminRepository = adminRepository;
  }

  async execute(id: string): Promise<void> {
    await this.adminRepository.deleteAdmin(id);
  }
}