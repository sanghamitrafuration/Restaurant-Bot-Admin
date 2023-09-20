import { SuperAdminEntity } from "../entities/superAdmin";
import { SuperAdminRepository } from "../repositories/superAdmin-repository";

export interface GetAllSuperAdminsUsecase {
  execute: () => Promise<SuperAdminEntity[]>;
}

export class GetAllSuperAdmins implements GetAllSuperAdminsUsecase {
  private readonly superAdminRepository: SuperAdminRepository;
  constructor(superAdminRepository: SuperAdminRepository) {
    this.superAdminRepository = superAdminRepository;
  }

  async execute(): Promise<SuperAdminEntity[]> {
    return await this.superAdminRepository.getSuperAdmins();
  }
}