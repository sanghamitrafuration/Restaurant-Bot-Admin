import { UserRepository } from "@domain/user/repositories/user-repository";
import { UserDataSource } from "../datasource/user-data-source";
import { UserEntity, UserModel } from "@domain/user/entities/user";



export class UserRepositoryImpl implements UserRepository {
  private readonly dataSource: UserDataSource;

  constructor(dataSourse: UserDataSource) {
    this.dataSource = dataSourse;
  }

  async createUser(user: UserModel): Promise<UserEntity> {
    return await this.dataSource.create(user);
  }

  async loginUser(user: UserModel): Promise<UserEntity> {
    return await this.dataSource.loginUser(user);
  }

  async deleteUser(id: string): Promise<void> {
    await this.dataSource.delete(id);
  }

  async updateUser(id: string, data: UserModel): Promise<UserEntity> {
    return await this.dataSource.update(id, data);
  }

  async getUsers(): Promise<UserEntity[]> {
    return await this.dataSource.getAllUser();
  }

  async getUserById(id: string): Promise<UserEntity | null> {
    return await this.dataSource.read(id);
  }
}