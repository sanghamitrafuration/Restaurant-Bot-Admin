import { AdminEntity, AdminModel } from "../entities/admin";
import { AdminRepository } from "../repositories/admin-repository";

export interface UpdateAdminUsecase {
  execute: (
    id: string,
    adminData: Partial<AdminModel>
  ) => Promise<AdminEntity>;
}

export class UpdateAdmin implements UpdateAdminUsecase {
  private readonly adminRepository: AdminRepository;

  constructor(adminRepository: AdminRepository) {
    this.adminRepository = adminRepository;
  }
  
  async execute(
    id: string,
    adminData: Partial<AdminModel>
  ): Promise<AdminEntity> {
    const existingAdmin: AdminEntity | null =
      await this.adminRepository.getAdminById(id);

    if (!existingAdmin) {
      throw new Error("Admin not found.");
    }

    const updatedAdminData: AdminModel = {
      ...existingAdmin,
      ...adminData,
    };
    await this.adminRepository.updateAdmin(id, updatedAdminData);

    const updatedAdminEntity: AdminEntity | null =
      await this.adminRepository.getAdminById(id);

    if (!updatedAdminEntity) {
      throw new Error("Admin not found after update.");
    }

    return updatedAdminEntity;
  }
}