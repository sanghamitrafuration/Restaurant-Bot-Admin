import { SuperAdminRepository } from "@domain/superAdmin/repositories/superAdmin-repository";
import { SuperAdminDataSource } from "../datasource/superAdmin-data-source";
import { SuperAdminEntity, SuperAdminModel } from "@domain/superAdmin/entities/superAdmin";


export class SuperAdminRepositoryImpl implements SuperAdminRepository {
  private readonly dataSource: SuperAdminDataSource;

  constructor(dataSourse: SuperAdminDataSource) {
    this.dataSource = dataSourse;
  }

  async createSuperAdmin(superAdmin: SuperAdminModel): Promise<SuperAdminEntity> {
    return await this.dataSource.create(superAdmin);
  }

  async deleteSuperAdmin(id: string): Promise<void> {
    await this.dataSource.delete(id);
  }

  async updateSuperAdmin(id: string, data: SuperAdminModel): Promise<SuperAdminEntity> {
    return await this.dataSource.update(id, data);
  }

  async getSuperAdmins(): Promise<SuperAdminEntity[]> {
    return await this.dataSource.getAllSuperAdmin();
  }

  async getSuperAdminById(id: string): Promise<SuperAdminEntity | null> {
    return await this.dataSource.read(id);
  }
}