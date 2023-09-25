import mongoose from "mongoose";
import ApiError from "@presentation/error-handling/api-error";
import { AdminModel } from "@domain/admin/entities/admin";
import Admin from "../model/admin-model";

//Create AdminDataSourse Interface
export interface AdminDataSource {
  create(admin: AdminModel): Promise<any>;
  update(id: String, admin: AdminModel): Promise<any>;
  delete(id: string): Promise<void>;
  read(id: string): Promise<any | null>;
  getAllAdmin(): Promise<any[]>;
}


export class AdminDataSourceImpl implements AdminDataSource {
  constructor(private db: mongoose.Connection) {}
  async create(admin: AdminModel): Promise<any> {
    const existingAdmin = await Admin.findOne({ userId: admin.userId });
    if (existingAdmin) {
      throw ApiError.emailExist();
    }

    const adminData = new Admin(admin);
    const createdAdmin = await adminData.save();

    return createdAdmin.toObject();
  }

  async update(id: string, admin: AdminModel): Promise<any> {
    const updatedAdmin = await Admin.findByIdAndUpdate(id, admin, {
      new: true,
    }); // No need for conversion here
    return updatedAdmin ? updatedAdmin.toObject() : null; // Convert to plain JavaScript object before returning
  }

  async delete(id: string): Promise<void> {
    await Admin.findByIdAndDelete(id);
  }

  async read(id: string): Promise<any | null> {
    const admin = await Admin.findById(id);
    return admin ? admin.toObject() : null; // Convert to plain JavaScript object before returning
  }

  async getAllAdmin(): Promise<any[]> {
    const admins = await Admin.find();
    return admins.map((admin) => admin.toObject()); // Convert to plain JavaScript objects before returning
  }
}