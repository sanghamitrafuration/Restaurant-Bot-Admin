import { UserEntity } from "../entities/user";
import { UserRepository } from "../repositories/user-repository";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";

export interface GetUserByIdUsecase {
  execute: (id: string) => Promise<Either<ErrorClass, UserEntity>>;
}

export class GetUserById implements GetUserByIdUsecase {
  private readonly userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(id: string): Promise<Either<ErrorClass, UserEntity>> {
    return await this.userRepository.getUserById(id);
  }
}