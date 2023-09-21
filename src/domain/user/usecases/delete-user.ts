import { UserRepository } from "../repositories/user-repository";


export interface DeleteUserUsecase {
  execute: (id: string) => Promise<void>;
}

export class DeleteUser implements DeleteUserUsecase {
  private readonly userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(id: string): Promise<void> {
    await this.userRepository.deleteUser(id);
  }
}