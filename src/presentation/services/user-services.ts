import { NextFunction, Request, Response } from "express";
import ApiError from "@presentation/error-handling/api-error";
import { CreateUserUsecase } from "@domain/user/usecases/create-user";
import { DeleteUserUsecase } from "@domain/user/usecases/delete-user";
import { GetUserByIdUsecase } from "@domain/user/usecases/get-user-by-id";
import { GetAllUsersUsecase } from "@domain/user/usecases/get-all-user";
import { UpdateUserUsecase } from "@domain/user/usecases/update-user";
import { UserEntity, UserMapper, UserModel } from "@domain/user/entities/user";
import { LoginUserUsecase } from "@domain/user/usecases/login-user";
const bcrypt= require("bcrypt");
const jwt= require("jsonwebtoken");

export class UserServices {
  private readonly createUserUsecases: CreateUserUsecase;
  private readonly loginUserUsecases: LoginUserUsecase;
  private readonly deleteUserUsecases: DeleteUserUsecase;
  private readonly getUserByIdUsecases: GetUserByIdUsecase;
  private readonly getAllUsersUsecases: GetAllUsersUsecase;
  private readonly updateUserUsecases: UpdateUserUsecase;

  constructor(
    createUserUsecases: CreateUserUsecase,
    loginUserUsecases: LoginUserUsecase,
    deleteUserUsecases: DeleteUserUsecase,
    getUserByIdUsecases: GetUserByIdUsecase,
    getAllUsersUsecases: GetAllUsersUsecase,
    updateUserUsecases: UpdateUserUsecase
  ) {
    (this.createUserUsecases = createUserUsecases),
    (this.loginUserUsecases = loginUserUsecases),
    (this.deleteUserUsecases = deleteUserUsecases),
    (this.getUserByIdUsecases = getUserByIdUsecases),
    (this.getAllUsersUsecases = getAllUsersUsecases),
    (this.updateUserUsecases = updateUserUsecases);
  }

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const data= req.body;
      const hash = bcrypt.hashSync(data.password, process.env.saltRound);

      const userData: UserModel = UserMapper.toModel({...data, password:hash});

      // Call the CreateUserUsecase to create the user
      const newUser: UserEntity = await this.createUserUsecases.execute(userData);

      const responseData = UserMapper.toEntity(newUser, true);

      res.json(responseData);

    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.status).json({ error: error.message });
      }

      const err = ApiError.internalError();
      res.status(err.status).json(err.message);
    }
  }

  async loginUser(req: Request, res: Response): Promise<void> {
    try {
      const userData: UserModel = req.body;

      const existingUser: UserEntity | null =
        await this.loginUserUsecases.execute(userData);

      if (!existingUser) {
        // ApiError.notFound();
        // return;
      }else {
        const result= bcrypt.compareSync(existingUser.password, userData.password);
        if(result){
          const token= jwt.sign( {phone : userData.phone, userId: existingUser.id}, process.env.secret_key);
          res.json({ message: "Successfully Logged in" , token});
        }else {
          // ApiError.notFound();
          // return;
        }
      }
    } catch (error) {
      console.log(error);
      if (error instanceof ApiError) {
        res.status(error.status).json({ error: error.message });
      }
      ApiError.internalError();
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const id: string = req.params.id;

      await this.deleteUserUsecases.execute(id);

      res.json({ message: "User deleted successfully." });
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.status).json({ error: error.message });
      }
      const err = ApiError.internalError();
      res.status(err.status).json(err.message);
    }
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const id: string = req.params.id;

      const user: UserEntity | null =
        await this.getUserByIdUsecases.execute(id);

      if (user) {
        const responseData = UserMapper.toModel(user);

        res.json(responseData);
      } else {
        ApiError.notFound();
      }
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.status).json({ error: error.message });
      }

      const err = ApiError.internalError();
      res.status(err.status).json(err.message);
    }
  }

  async getAllUsers(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const users: UserEntity[] =
        await this.getAllUsersUsecases.execute();

      const responseData = users.map((user) =>
        UserMapper.toModel(user)
      );

      res.json(responseData);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.status).json({ error: error.message });
      }
      const err = ApiError.internalError();
      res.status(err.status).json(err.message);
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const id: string = req.params.id;
      const userData: UserModel = req.body;

      const existingUser: UserEntity | null =
        await this.getUserByIdUsecases.execute(id);

      if (!existingUser) {
        ApiError.notFound();
        return;
      }

      const updatedUserEntity: UserEntity = UserMapper.toEntity(
        userData,
        true,
        existingUser
      );

      const updatedUser: UserEntity =
        await this.updateUserUsecases.execute(
        id,
          updatedUserEntity
        );

      const responseData = UserMapper.toModel(updatedUser);

      res.json(responseData);
    } catch (error) {
      console.log(error);
      if (error instanceof ApiError) {
        res.status(error.status).json({ error: error.message });
      }
      ApiError.internalError();
    }
  }
}