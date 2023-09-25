import mongoose from "mongoose";
import { Router } from "express";
import { UserDataSourceImpl } from "@data/user/datasource/user-data-source";
import { UserRepositoryImpl } from "@data/user/repositories/user-repositories-impl";
import { CreateUser } from "@domain/user/usecases/create-user";
import { DeleteUser } from "@domain/user/usecases/delete-user";
import { GetUserById } from "@domain/user/usecases/get-user-by-id";
import { GetAllUsers } from "@domain/user/usecases/get-all-user";
import { UserServices } from "@presentation/services/user-services";
import { LoginUser } from "@domain/user/usecases/login-user";
import { UpdateUser } from "@domain/user/usecases/update-user";

const userDataSource = new UserDataSourceImpl(mongoose.connection);

const userRepository = new UserRepositoryImpl(userDataSource);

const createUserUsecase = new CreateUser(userRepository);
const loginUserUsecase = new LoginUser(userRepository);
const deleteUserUsecase = new DeleteUser(userRepository);
const getUserByIdUsecases = new GetUserById(userRepository);
const getAllUsersUsecase = new GetAllUsers(userRepository);
const updateUserUsecase = new UpdateUser(userRepository);

const userService = new UserServices(
  createUserUsecase,
  loginUserUsecase,
  deleteUserUsecase,
  getUserByIdUsecases,
  getAllUsersUsecase,
  updateUserUsecase
);

// Create an Express router
export const userRouter = Router();

userRouter.post("/register", userService.createUser.bind(userService));

userRouter.post("/login", userService.loginUser.bind(userService));

userRouter.get(
  "/:id",
  userService.getUserById.bind(userService)
);

userRouter.get("/", userService.getAllUsers.bind(userService));

userRouter.put(
  "/:id",
  userService.updateUser.bind(userService)
);

userRouter.delete(
  "/:id",
  userService.deleteUser.bind(userService)
);