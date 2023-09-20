import { SuperAdminEntity } from "../entities/superAdmin";
import { SuperAdminRepository } from "../repositories/superAdmin-repository";

export interface GetSuperAdminByIdUsecase {
  execute: (id: string) => Promise<SuperAdminEntity | null>;
}

export class GetSuperAdminById implements GetSuperAdminByIdUsecase {
  private readonly superAdminRepository: SuperAdminRepository;

  constructor(superAdminRepository: SuperAdminRepository) {
    this.superAdminRepository = superAdminRepository;
  }

  async execute(id: string): Promise<SuperAdminEntity | null> {
    return await this.superAdminRepository.getSuperAdminById(id);
  }
}