import { UserEntity, UserModel } from "../entities/user";
import { UserRepository } from "../repositories/user-repository";

export interface LoginUserUsecase {
  execute: (userData:  UserModel) => Promise<UserEntity>;
}

export class LoginUser implements LoginUserUsecase {
  private readonly userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(userData: UserModel): Promise<UserEntity> {
    return await this.userRepository.loginUser(userData);
  }
}