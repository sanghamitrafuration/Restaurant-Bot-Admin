import { UserEntity, UserModel } from "../entities/user";
import { UserRepository } from "../repositories/user-repository";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";

export interface LoginUserUsecase {
  execute: (phone:  string, password: string) => Promise<Either<ErrorClass, UserEntity>>;
}

export class LoginUser implements LoginUserUsecase {
  private readonly userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(phone: string, password: string): Promise<Either<ErrorClass, UserEntity>> {
    return await this.userRepository.loginUser(phone, password);
  }
}