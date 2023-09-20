import { SuperAdminRepository } from "../repositories/superAdmin-repository";

export interface DeleteSuperAdminUsecase {
  execute: (id: string) => Promise<void>;
}

export class DeleteSuperAdmin implements DeleteSuperAdminUsecase {
  private readonly superAdminRepository: SuperAdminRepository;

  constructor(superAdminRepository: SuperAdminRepository) {
    this.superAdminRepository = superAdminRepository;
  }

  async execute(id: string): Promise<void> {
    await this.superAdminRepository.deleteSuperAdmin(id);
  }
}