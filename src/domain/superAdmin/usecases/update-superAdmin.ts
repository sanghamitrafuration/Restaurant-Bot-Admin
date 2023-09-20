import { SuperAdminEntity, SuperAdminModel } from "../entities/superAdmin";
import { SuperAdminRepository } from "../repositories/superAdmin-repository";

export interface UpdateSuperAdminUsecase {
  execute: (
    id: string,
    superAdminData: Partial<SuperAdminModel>
  ) => Promise<SuperAdminEntity>;
}

export class UpdateSuperAdmin implements UpdateSuperAdminUsecase {
  private readonly superAdminRepository: SuperAdminRepository;

  constructor(superAdminRepository: SuperAdminRepository) {
    this.superAdminRepository = superAdminRepository;
  }
  
  async execute(
    id: string,
    superAdminData: Partial<SuperAdminModel>
  ): Promise<SuperAdminEntity> {
    const existingSuperAdmin: SuperAdminEntity | null =
      await this.superAdminRepository.getSuperAdminById(id);

    if (!existingSuperAdmin) {
      throw new Error("Super Admin not found.");
    }

    const updatedSuperAdminData: SuperAdminModel = {
      ...existingSuperAdmin,
      ...superAdminData,
    };
    await this.superAdminRepository.updateSuperAdmin(id, updatedSuperAdminData);

    const updatedSuperAdminEntity: SuperAdminEntity | null =
      await this.superAdminRepository.getSuperAdminById(id);

    if (!updatedSuperAdminEntity) {
      throw new Error("Super Admin not found after update.");
    }

    return updatedSuperAdminEntity;
  }
}