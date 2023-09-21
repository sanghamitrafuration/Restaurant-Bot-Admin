import { NextFunction, Request, Response } from "express";
import ApiError from "@presentation/error-handling/api-error";
import { CreateAdminUsecase } from "@domain/admin/usecases/create-admin";
import { DeleteAdminUsecase } from "@domain/admin/usecases/delete-admin";
import { GetAdminByIdUsecase } from "@domain/admin/usecases/get-admin-by-id";
import { GetAllAdminsUsecase } from "@domain/admin/usecases/get-all-admins";
import { UpdateAdminUsecase } from "@domain/admin/usecases/update-admin";
import { AdminEntity, AdminMapper, AdminModel } from "@domain/admin/entities/admin";
const bcrypt= require("bcrypt");
require("dotenv").config();

export class AdminServices {
  private readonly createAdminUsecases: CreateAdminUsecase;
  private readonly deleteAdminUsecases: DeleteAdminUsecase;
  private readonly getAdminByIdUsecases: GetAdminByIdUsecase;
  private readonly getAllAdminsUsecases: GetAllAdminsUsecase;
  private readonly updateAdminUsecases: UpdateAdminUsecase;

  constructor(
    createAdminUsecases: CreateAdminUsecase,
    deleteAdminUsecases: DeleteAdminUsecase,
    getAdminByIdUsecases: GetAdminByIdUsecase,
    getAllAdminsUsecases: GetAllAdminsUsecase,
    updateAdminUsecases: UpdateAdminUsecase
  ) {
    (this.createAdminUsecases = createAdminUsecases),
    (this.deleteAdminUsecases = deleteAdminUsecases),
    (this.getAdminByIdUsecases = getAdminByIdUsecases),
    (this.getAllAdminsUsecases = getAllAdminsUsecases),
    (this.updateAdminUsecases = updateAdminUsecases);
  }

  async createAdmin(req: Request, res: Response): Promise<void> {
    try {

      const data= req.body;
      const hash = bcrypt.hashSync(data.password, process.env.saltRound);
      const adminData: AdminModel = AdminMapper.toModel({...data, password:hash});

      // Call the CreateAdminUsecase to create the admin
      const newAdmin: AdminEntity = await this.createAdminUsecases.execute(adminData);
      const responseData = AdminMapper.toEntity(newAdmin, true);

      res.json(responseData);

    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.status).json({ error: error.message });
      }

      const err = ApiError.internalError();
      res.status(err.status).json(err.message);
    }
  }

  async deleteAdmin(req: Request, res: Response): Promise<void> {
    try {
      const id: string = req.params.id;

      await this.deleteAdminUsecases.execute(id);

      res.json({ message: "Admin deleted successfully." });
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.status).json({ error: error.message });
      }
      const err = ApiError.internalError();
      res.status(err.status).json(err.message);
    }
  }

  async getAdminById(req: Request, res: Response): Promise<void> {
    try {
      const id: string = req.params.id;

      const admin: AdminEntity | null =
        await this.getAdminByIdUsecases.execute(id);

      if (admin) {
        const responseData = AdminMapper.toModel(admin);

        res.json(responseData);
      } else {
        ApiError.notFound();
      }
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.status).json({ error: error.message });
      }

      const err = ApiError.internalError();
      res.status(err.status).json(err.message);
    }
  }

  async getAllAdmins(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const admins: AdminEntity[] =
        await this.getAllAdminsUsecases.execute();

      const responseData = admins.map((admin) =>
      AdminMapper.toModel(admin)
      );

      res.json(responseData);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.status).json({ error: error.message });
      }
      const err = ApiError.internalError();
      res.status(err.status).json(err.message);
    }
  }

  async updateAdmin(req: Request, res: Response): Promise<void> {
    try {
      const id: string = req.params.id;
      const adminData: AdminModel = req.body;

      const existingAdmin: AdminEntity | null =
        await this.getAdminByIdUsecases.execute(id);

      if (!existingAdmin) {
        ApiError.notFound();
        return;
      }

      const updatedAdminEntity: AdminEntity = AdminMapper.toEntity(
        adminData,
        true,
        existingAdmin
      );

      const updatedAdmin: AdminEntity =
        await this.updateAdminUsecases.execute(
        id,
          updatedAdminEntity
        );

      const responseData = AdminMapper.toModel(updatedAdmin);

      res.json(responseData);
    } catch (error) {
      console.log(error);
      if (error instanceof ApiError) {
        res.status(error.status).json({ error: error.message });
      }
      ApiError.internalError();
    }
  }
}