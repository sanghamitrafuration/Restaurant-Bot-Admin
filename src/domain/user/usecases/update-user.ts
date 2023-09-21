import { UserEntity, UserModel } from "../entities/user";
import { UserRepository } from "../repositories/user-repository";

export interface UpdateUserUsecase {
  execute: (
    id: string,
    userData: Partial<UserModel>
  ) => Promise<UserEntity>;
}

export class UpdateUser implements UpdateUserUsecase {
  private readonly userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }
  
  async execute(
    id: string,
    userData: Partial<UserModel>
  ): Promise<UserEntity> {
    const existingUser: UserEntity | null =
      await this.userRepository.getUserById(id);

    if (!existingUser) {
      throw new Error("Super Admin not found.");
    }

    const updatedUserData: UserModel = {
      ...existingUser,
      ...userData,
    };
    await this.userRepository.updateUser(id, updatedUserData);

    const updatedUserEntity: UserEntity | null =
      await this.userRepository.getUserById(id);

    if (!updatedUserEntity) {
      throw new Error("User not found after update.");
    }

    return updatedUserEntity;
  }
}