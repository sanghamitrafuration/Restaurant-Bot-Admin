import { NextFunction, Request, Response } from "express";
import ApiError from "@presentation/error-handling/api-error";
import { CreateSuperAdminUsecase } from "@domain/superAdmin/usecases/create-superAdmin";
import { DeleteSuperAdminUsecase } from "@domain/superAdmin/usecases/delete-superAdmin";
import { GetSuperAdminByIdUsecase } from "@domain/superAdmin/usecases/get-superAdmin-by-id";
import { GetAllSuperAdminsUsecase } from "@domain/superAdmin/usecases/get-all-superAdmin";
import { UpdateSuperAdminUsecase } from "@domain/superAdmin/usecases/update-superAdmin";
import { SuperAdminEntity, SuperAdminMapper, SuperAdminModel } from "@domain/superAdmin/entities/superAdmin";

export class SuperAdminServices {
  private readonly createSuperAdminUsecases: CreateSuperAdminUsecase;
  private readonly deleteSuperAdminUsecases: DeleteSuperAdminUsecase;
  private readonly getSuperAdminByIdUsecases: GetSuperAdminByIdUsecase;
  private readonly getAllSuperAdminsUsecases: GetAllSuperAdminsUsecase;
  private readonly updateSuperAdminUsecases: UpdateSuperAdminUsecase;

  constructor(
    createSuperAdminUsecases: CreateSuperAdminUsecase,
    deleteSuperAdminUsecases: DeleteSuperAdminUsecase,
    getSuperAdminByIdUsecases: GetSuperAdminByIdUsecase,
    getAllSuperAdminsUsecases: GetAllSuperAdminsUsecase,
    updateSuperAdminUsecases: UpdateSuperAdminUsecase
  ) {
    (this.createSuperAdminUsecases = createSuperAdminUsecases),
      (this.deleteSuperAdminUsecases = deleteSuperAdminUsecases),
      (this.getSuperAdminByIdUsecases = getSuperAdminByIdUsecases),
      (this.getAllSuperAdminsUsecases = getAllSuperAdminsUsecases),
      (this.updateSuperAdminUsecases = updateSuperAdminUsecases);
  }

  async createSuperAdmin(req: Request, res: Response): Promise<void> {
    try {
      const superAdminData: SuperAdminModel = SuperAdminMapper.toModel(req.body);

      // Call the CreateSuperAdminUsecase to create the superAdmin
      const newSuperAdmin: SuperAdminEntity =
        await this.createSuperAdminUsecases.execute(superAdminData);

      const responseData = SuperAdminMapper.toEntity(newSuperAdmin, true);

      res.json(responseData);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.status).json({ error: error.message });
      }

      const err = ApiError.internalError();
      res.status(err.status).json(err.message);
    }
  }

  async deleteSuperAdmin(req: Request, res: Response): Promise<void> {
    try {
      const id: string = req.params.id;

      await this.deleteSuperAdminUsecases.execute(id);

      res.json({ message: "Super Admin deleted successfully." });
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.status).json({ error: error.message });
      }
      const err = ApiError.internalError();
      res.status(err.status).json(err.message);
    }
  }

  async getSuperAdminById(req: Request, res: Response): Promise<void> {
    try {
      const id: string = req.params.id;

      const superAdmin: SuperAdminEntity | null =
        await this.getSuperAdminByIdUsecases.execute(id);

      if (superAdmin) {
        const responseData = SuperAdminMapper.toModel(superAdmin);

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

  async getAllSuperAdmins(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const superAdmins: SuperAdminEntity[] =
        await this.getAllSuperAdminsUsecases.execute();

      const responseData = superAdmins.map((superAdmin) =>
      SuperAdminMapper.toModel(superAdmin)
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

  async updateSuperAdmin(req: Request, res: Response): Promise<void> {
    try {
      const id: string = req.params.id;
      const superAdminData: SuperAdminModel = req.body;

      const existingSuperAdmin: SuperAdminEntity | null =
        await this.getSuperAdminByIdUsecases.execute(id);

      if (!existingSuperAdmin) {
        ApiError.notFound();
        return;
      }

      const updatedSuperAdminEntity: SuperAdminEntity = SuperAdminMapper.toEntity(
        superAdminData,
        true,
        existingSuperAdmin
      );

      const updatedSuperAdmin: SuperAdminEntity =
        await this.updateSuperAdminUsecases.execute(
        id,
          updatedSuperAdminEntity
        );

      const responseData = SuperAdminMapper.toModel(updatedSuperAdmin);

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