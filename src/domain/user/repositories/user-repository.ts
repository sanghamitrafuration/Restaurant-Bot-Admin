import { UserEntity, UserModel } from "../entities/user";


export interface UserRepository {
  createUser(user: UserModel): Promise<UserEntity>;
  loginUser(data: UserModel): Promise<UserEntity>;
  deleteUser(id: string): Promise<void>;
  getUsers(): Promise<UserEntity[]>;
  getUserById(id: string): Promise<UserEntity | null>;
  updateUser(id: string, data: UserModel): Promise<UserEntity>;
}