import mongoose from "mongoose";
import ApiError from "@presentation/error-handling/api-error";
import { SuperAdminModel } from "@domain/superAdmin/entities/superAdmin";
import SuperAdmin from "../model/superAdmin-model";

//Create SuperAdminDataSourse Interface
export interface SuperAdminDataSource {
  create(admin: SuperAdminModel): Promise<any>;
  update(id: String, superAdmin: SuperAdminModel): Promise<any>;
  delete(id: string): Promise<void>;
  read(id: string): Promise<any | null>;
  getAllSuperAdmin(): Promise<any[]>;
}


export class SuperAdminDataSourceImpl implements SuperAdminDataSource {
  constructor(private db: mongoose.Connection) {}
  async create(superAdmin: SuperAdminModel): Promise<any> {
    const existingSuperAdmin = await SuperAdmin.findOne({ email: superAdmin.email });
    if (existingSuperAdmin) {
      throw ApiError.emailExist();
    }

    const superAdminData = new SuperAdmin(superAdmin);
    const createdSuperAdmin = await superAdminData.save();

    return createdSuperAdmin.toObject();
  }

  async update(id: string, superAdmin: SuperAdminModel): Promise<any> {
    const updatedSuperAdmin = await SuperAdmin.findByIdAndUpdate(id, superAdmin, {
      new: true,
    }); // No need for conversion here
    return updatedSuperAdmin ? updatedSuperAdmin.toObject() : null; // Convert to plain JavaScript object before returning
  }

  async delete(id: string): Promise<void> {
    await SuperAdmin.findByIdAndDelete(id);
  }

  async read(id: string): Promise<any | null> {
    const superAdmin = await SuperAdmin.findById(id);
    return superAdmin ? superAdmin.toObject() : null; // Convert to plain JavaScript object before returning
  }

  async getAllSuperAdmin(): Promise<any[]> {
    const superAdmins = await SuperAdmin.find();
    return superAdmins.map((superAdmin) => superAdmin.toObject()); // Convert to plain JavaScript objects before returning
  }
}