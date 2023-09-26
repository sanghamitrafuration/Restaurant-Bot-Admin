import { Request, Response } from "express";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";
import { CreateAdminUsecase } from "@domain/admin/usecases/create-admin";
import { DeleteAdminUsecase } from "@domain/admin/usecases/delete-admin";
import { GetAdminByIdUsecase } from "@domain/admin/usecases/get-admin-by-id";
import { GetAllAdminsUsecase } from "@domain/admin/usecases/get-all-admins";
import { UpdateAdminUsecase } from "@domain/admin/usecases/update-admin";
import { AdminEntity, AdminMapper, AdminModel } from "@domain/admin/entities/admin";

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
    const adminData: AdminModel = AdminMapper.toModel(req.body);

    const newAdminData: Either<ErrorClass, AdminEntity> = 
      await this.createAdminUsecases.execute(adminData);

      newAdminData.cata(
      (error : ErrorClass) =>
      res.status(error.status).json({error : error.message}),
      (result : AdminEntity) => {
        const responseData = AdminMapper.toEntity(result, true);
        return res.json(responseData);
      }
    )
  }

  async deleteAdmin(req: Request, res: Response): Promise<void> {
    const id : string= req.params.id;
    const deletedAdmin: Either<ErrorClass, void> =
    await this.deleteAdminUsecases.execute(id);
    
    deletedAdmin.cata(
      (error: ErrorClass) =>
      res.status(error.status).json({ error: error.message }),
      (result: void) => {
        return res.json({ message: "Admin deleted successfully." });
      }
    );
  }

  async getAdminById(req: Request, res: Response): Promise<void> {
    const id : string = req.params.id;
    const admin : Either<ErrorClass, AdminEntity> = 
    await this.getAdminByIdUsecases.execute(id);
    admin.cata(
      (error: ErrorClass) =>
      res.status(error.status).json({ error: error.message }),
      (result: AdminEntity) => {
        const resdata = AdminMapper.toModel(result);
        return res.json(resdata);
      }
    );
  }

  async getAllAdmins (req: Request, res: Response) : Promise<void> {
    const admins : Either<ErrorClass, AdminEntity[]> = await this.getAllAdminsUsecases.execute();
    admins.cata(
        (error: ErrorClass) =>
            res.status(error.status).json({ error: error.message }),
        (result: AdminEntity[]) => {
            const resdata = result.map((admin) =>
            AdminMapper.toModel(admin)
          );
          return res.json(resdata);
        }
    )
  }

  async updateAdmin(req: Request, res: Response): Promise<void> {
    const id: string = req.params.id;
    const adminData: AdminModel = req.body;
    
    const existingAdmin: Either<ErrorClass, AdminEntity> =
    await this.getAdminByIdUsecases.execute(id);
    
    existingAdmin.cata(
      (error: ErrorClass) => {
        res.status(error.status).json({ error: error.message });
      },
      async (existingAdminData: AdminEntity) => {
        const updatedAdminEntity: AdminEntity = AdminMapper.toEntity(
          adminData,
          true,
          existingAdminData
        );
        
        const updatedAdmin: Either<ErrorClass, AdminEntity> =
        await this.updateAdminUsecases.execute(
          id,
          updatedAdminEntity
        );
        
        updatedAdmin.cata(
          (error: ErrorClass) => {
                res.status(error.status).json({ error: error.message });
          },
          (result: AdminEntity) => {
            const resData = AdminMapper.toEntity(result, true);
            res.json(resData);
          }
        );
      }
    );
  }
}