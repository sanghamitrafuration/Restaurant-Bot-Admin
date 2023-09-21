import { UserEntity, UserModel } from "../entities/user";
import { UserRepository } from "../repositories/user-repository";

export interface CreateUserUsecase {
  execute: (userData: UserModel) => Promise<UserEntity>;
}

export class CreateUser implements CreateUserUsecase {
  private readonly userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(userData: UserModel): Promise<UserEntity> {
    return await this.userRepository.createUser(userData);
  }
}