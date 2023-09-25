import { UserEntity, UserModel } from "../entities/user";
import { UserRepository } from "../repositories/user-repository";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";


export interface UpdateUserUsecase {
    execute : (id : string, data: UserModel) => Promise<Either<ErrorClass, UserEntity>>
}

export class UpdateDeliverypartner implements UpdateUserUsecase {
    
    private readonly userRepository : UserRepository

    constructor (userRepository : UserRepository){
        this.userRepository= userRepository;
    }

    async execute(id : string, data : UserModel) : Promise<Either<ErrorClass, UserEntity>>{
        return await this.userRepository.updateUser(id, data);
    }
}