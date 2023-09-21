import { AdminEntity, AdminModel } from "../entities/admin";


export interface AdminRepository {
  createAdmin(admin: AdminModel): Promise<AdminEntity>;
  deleteAdmin(id: string): Promise<void>;
  getAdmins(): Promise<AdminEntity[]>;
  getAdminById(id: string): Promise<AdminEntity | null>;
  updateAdmin(id: string, data: AdminModel): Promise<AdminEntity>;
}