import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";
import { AdminEntity, AdminModel } from "../entities/admin";
import { AdminRepository } from "../repositories/admin-repository";


export interface UpdateAdminUsecase {
    execute : (id : string, data: AdminModel) => Promise<Either<ErrorClass, AdminEntity>>
}

export class UpdateAdmin implements UpdateAdminUsecase {
    
    private readonly adminRepository : AdminRepository

    constructor (adminRepository : AdminRepository){
        this.adminRepository= adminRepository;
    }

    async execute(id : string, data : AdminModel) : Promise<Either<ErrorClass, AdminEntity>>{
        return await this.adminRepository.updateAdmin(id, data);
    }
}