import { SuperAdminEntity, SuperAdminModel } from "../entities/superAdmin";


export interface SuperAdminRepository {
  createSuperAdmin(superAdmin: SuperAdminModel): Promise<SuperAdminEntity>;
  deleteSuperAdmin(id: string): Promise<void>;
  getSuperAdmins(): Promise<SuperAdminEntity[]>;
  getSuperAdminById(id: string): Promise<SuperAdminEntity | null>;
  updateSuperAdmin(id: string, data: SuperAdminModel): Promise<SuperAdminEntity>;
}