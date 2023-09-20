import { SuperAdminEntity, SuperAdminModel } from "../entities/superAdmin";
import { SuperAdminRepository } from "../repositories/superAdmin-repository";

export interface CreateSuperAdminUsecase {
  execute: (superAdminData: SuperAdminModel) => Promise<SuperAdminEntity>;
}

export class CreateSuperAdmin implements CreateSuperAdminUsecase {
  private readonly superAdminRepository: SuperAdminRepository;

  constructor(superAdminRepository: SuperAdminRepository) {
    this.superAdminRepository = superAdminRepository;
  }

  async execute(superAdminData: SuperAdminModel): Promise<SuperAdminEntity> {
    return await this.superAdminRepository.createSuperAdmin(superAdminData);
  }
}