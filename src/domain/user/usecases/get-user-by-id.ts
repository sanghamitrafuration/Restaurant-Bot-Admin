import { UserEntity } from "../entities/user";
import { UserRepository } from "../repositories/user-repository";

export interface GetUserByIdUsecase {
  execute: (id: string) => Promise<UserEntity | null>;
}

export class GetUserById implements GetUserByIdUsecase {
  private readonly userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(id: string): Promise<UserEntity | null> {
    return await this.userRepository.getUserById(id);
  }
}