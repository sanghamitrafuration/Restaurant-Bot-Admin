import { UserEntity } from "../entities/user";
import { UserRepository } from "../repositories/user-repository";

export interface GetAllUsersUsecase {
  execute: () => Promise<UserEntity[]>;
}

export class GetAllUsers implements GetAllUsersUsecase {
  private readonly userRepository: UserRepository;
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(): Promise<UserEntity[]> {
    return await this.userRepository.getUsers();
  }
}