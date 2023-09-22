import mongoose from "mongoose";
import ApiError from "@presentation/error-handling/api-error";
import User from "../model/user-model";
import { UserModel } from "@domain/user/entities/user";

//Create UserDataSourse Interface
export interface UserDataSource {
  create(user: UserModel): Promise<any>;
  loginUser(user: UserModel): Promise<any>;
  update(id: String, user: UserModel): Promise<any>;
  delete(id: string): Promise<void>;
  read(id: string): Promise<any | null>;
  getAllUser(): Promise<any[]>;
}


export class UserDataSourceImpl implements UserDataSource {
  constructor(private db: mongoose.Connection) {}
  async create(user: UserModel): Promise<any> {
    const existingUser = await User.findOne({ phone: user.phone });
    if (existingUser) {
      throw ApiError.emailExist();
    }

    const userData = new User(user);
    const createdUser = await userData.save();

    return createdUser.toObject();
  }

  async loginUser(data: UserModel): Promise<any> {
    const existingUser = await User.findOne({ phone: data.phone });
    return existingUser ? existingUser.toObject() : null;
  }

  async update(id: string, user: UserModel): Promise<any> {
    const updatedUser = await User.findByIdAndUpdate(id, user, {
      new: true,
    }); // No need for conversion here
    return updatedUser ? updatedUser.toObject() : null; // Convert to plain JavaScript object before returning
  }

  async delete(id: string): Promise<void> {
    await User.findByIdAndDelete(id);
  }

  async read(id: string): Promise<any | null> {
    const user = await User.findById(id);
    return user ? user.toObject() : null; // Convert to plain JavaScript object before returning
  }

  async getAllUser(): Promise<any[]> {
    const users = await User.find();
    return users.map((user) => user.toObject()); // Convert to plain JavaScript objects before returning
  }
}