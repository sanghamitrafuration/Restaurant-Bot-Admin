import { AdminEntity, AdminModel } from "@domain/admin/entities/admin";
import { AdminDataSource } from "../datasource/admin-data-source";
import { AdminRepository } from "@domain/admin/repositories/admin-repository";

export class AdminRepositoryImpl implements AdminRepository {
  private readonly dataSource: AdminDataSource;

  constructor(dataSourse: AdminDataSource) {
    this.dataSource = dataSourse;
  }

  async createAdmin(admin: AdminModel): Promise<AdminEntity> {
    return await this.dataSource.create(admin);
  }

  async deleteAdmin(id: string): Promise<void> {
    await this.dataSource.delete(id);
  }

  async updateAdmin(id: string, data: AdminModel): Promise<AdminEntity> {
    return await this.dataSource.update(id, data);
  }

  async getAdmins(): Promise<AdminEntity[]> {
    return await this.dataSource.getAllAdmin();
  }

  async getAdminById(id: string): Promise<AdminEntity | null> {
    return await this.dataSource.read(id);
  }
}