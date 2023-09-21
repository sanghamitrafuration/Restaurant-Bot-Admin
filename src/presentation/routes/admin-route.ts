import mongoose from "mongoose";
import { Router } from "express";
import { AdminDataSourceImpl } from "@data/admin/datasource/admin-data-source";
import { CreateAdmin } from "@domain/admin/usecases/create-admin";
import { DeleteAdmin } from "@domain/admin/usecases/delete-admin";
import { GetAdminById } from "@domain/admin/usecases/get-admin-by-id";
import { GetAllAdmins } from "@domain/admin/usecases/get-all-admins";
import { UpdateAdmin } from "@domain/admin/usecases/update-admin";
import { AdminRepositoryImpl } from "@data/admin/repositories/admin-repositories-impl";
import { AdminServices } from "@presentation/services/admin-services";

const adminDataSource = new AdminDataSourceImpl(mongoose.connection);

const adminRepository = new AdminRepositoryImpl(adminDataSource);

const createAdminUsecase = new CreateAdmin(adminRepository);
const deleteAdminUsecase = new DeleteAdmin(adminRepository);
const getAdminByIdUsecases = new GetAdminById(adminRepository);
const getAllAdmins = new GetAllAdmins(adminRepository);
const updateAdmin = new UpdateAdmin(adminRepository);

const adminService = new AdminServices(
  createAdminUsecase,
  deleteAdminUsecase,
  getAdminByIdUsecases,
  getAllAdmins,
  updateAdmin
);

// Create an Express router
export const adminRouter = Router();

adminRouter.post("/register", adminService.createAdmin.bind(adminService));

adminRouter.get(
  "/:id",
  adminService.getAdminById.bind(adminService)
);

adminRouter.get("/", adminService.getAllAdmins.bind(adminService));

adminRouter.put(
  "/:id",
  adminService.updateAdmin.bind(adminService)
);

adminRouter.delete(
  "/:id",
  adminService.deleteAdmin.bind(adminService)
);