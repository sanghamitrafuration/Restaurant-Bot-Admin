import mongoose from "mongoose";
import { Router } from "express";
import { SuperAdminDataSourceImpl } from "@data/superAdmin/datasource/superAdmin-data-source";
import { SuperAdminRepositoryImpl } from "@data/superAdmin/repositories/superAdmin-repositories-impl";
import { CreateSuperAdmin } from "@domain/superAdmin/usecases/create-superAdmin";
import { DeleteSuperAdmin } from "@domain/superAdmin/usecases/delete-superAdmin";
import { GetSuperAdminById } from "@domain/superAdmin/usecases/get-superAdmin-by-id";
import { GetAllSuperAdmins } from "@domain/superAdmin/usecases/get-all-superAdmin";
import { UpdateSuperAdmin } from "@domain/superAdmin/usecases/update-superAdmin";
import { SuperAdminServices } from "@presentation/services/superAdmin-services";

const superAdminDataSource = new SuperAdminDataSourceImpl(mongoose.connection);

const superAdminRepository = new SuperAdminRepositoryImpl(superAdminDataSource);

const createSuperAdminUsecase = new CreateSuperAdmin(superAdminRepository);
const deleteSuperAdminUsecase = new DeleteSuperAdmin(superAdminRepository);
const getSuperAdminByIdUsecases = new GetSuperAdminById(superAdminRepository);
const getAllSuperAdmins = new GetAllSuperAdmins(superAdminRepository);
const updateSuperAdmin = new UpdateSuperAdmin(superAdminRepository);

const superAdminService = new SuperAdminServices(
  createSuperAdminUsecase,
  deleteSuperAdminUsecase,
  getSuperAdminByIdUsecases,
  getAllSuperAdmins,
  updateSuperAdmin
);

// Create an Express router
export const superAdminRouter = Router();

superAdminRouter.post("/new", superAdminService.createSuperAdmin.bind(superAdminService));

superAdminRouter.get(
  "/:id",
  superAdminService.getSuperAdminById.bind(superAdminService)
);

superAdminRouter.get("/", superAdminService.getAllSuperAdmins.bind(superAdminService));

superAdminRouter.put(
  "/:id",
  superAdminService.updateSuperAdmin.bind(superAdminService)
);

superAdminRouter.delete(
  "/:id",
  superAdminService.deleteSuperAdmin.bind(superAdminService)
);