import { NextFunction, Request, Response } from "express";
import { CreateUserUsecase } from "@domain/user/usecases/create-user";
import { DeleteUserUsecase } from "@domain/user/usecases/delete-user";
import { GetUserByIdUsecase } from "@domain/user/usecases/get-user-by-id";
import { GetAllUsersUsecase } from "@domain/user/usecases/get-all-user";
import { UpdateUserUsecase } from "@domain/user/usecases/update-user";
import { UserEntity, UserMapper, UserModel } from "@domain/user/entities/user";
import { LoginUserUsecase } from "@domain/user/usecases/login-user";
import ApiError from "@presentation/error-handling/api-error";
import { Either } from "monet";
import ErrorClass from "@presentation/error-handling/api-error";
import env from "@main/config/env";
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
    const data= req.body;
    const hash = bcrypt.hashSync(data.password, env.saltRound);
    const userData: UserModel = UserMapper.toModel({...data, password:hash});

    const newUserData: Either<ErrorClass, UserEntity> = 
      await this.createUserUsecases.execute(userData);

      newUserData.cata(
      (error : ErrorClass) =>
      res.status(error.status).json({error : error.message}),
      (result : UserEntity) => {
        const responseData = UserMapper.toEntity(result, true);
        return res.json(responseData);
      }
    )
  }

  async loginUser(req: Request, res: Response): Promise<void> {
    const {phone, password} = req.body;
    
    const existingUser: Either<ErrorClass, any> =
    await this.loginUserUsecases.execute(phone, password);
    
    existingUser.cata(
      (error: ErrorClass) => {
        res.status(error.status).json({ error: error.message });
      },
      async (result: any) => {
          const isMatch= await result.matchPassword(password);
          if(isMatch){
            const token= jwt.sign( {phone , userId: result.id}, env.secret_key);
            res.json({ message: "Successfully Logged in" , token});
          }else {
            ApiError.notFound();
            return;
          }
      }
    );
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    const id : string= req.params.id;
    const deletedUser: Either<ErrorClass, void> =
    await this.deleteUserUsecases.execute(id);
    
    deletedUser.cata(
      (error: ErrorClass) =>
      res.status(error.status).json({ error: error.message }),
      (result: void) => {
        return res.json({ message: "User deleted successfully." });
      }
    );
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    const id : string = req.params.id;
    const user : Either<ErrorClass, UserEntity> = 
    await this.getUserByIdUsecases.execute(id);
    user.cata(
      (error: ErrorClass) =>
      res.status(error.status).json({ error: error.message }),
      (result: UserEntity) => {
        const resdata = UserMapper.toModel(result);
        return res.json(resdata);
      }
    );
  }

  async getAllUsers (req: Request, res: Response) : Promise<void> {
    const users : Either<ErrorClass, UserEntity[]> = await this.getAllUsersUsecases.execute();
    users.cata(
        (error: ErrorClass) =>
            res.status(error.status).json({ error: error.message }),
        (result: UserEntity[]) => {
            const resdata = result.map((user) =>
            UserMapper.toModel(user)
          );
          return res.json(resdata);
        }
    )
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    const id: string = req.params.id;
    const userData: UserModel = req.body;
    
    const existingUser: Either<ErrorClass, UserEntity> =
    await this.getUserByIdUsecases.execute(id);
    
    existingUser.cata(
      (error: ErrorClass) => {
        res.status(error.status).json({ error: error.message });
      },
      async (existingUserData: UserEntity) => {
        const updatedUserEntity: UserEntity = UserMapper.toEntity(
          userData,
          true,
          existingUserData
        );
        
        const updatedUser: Either<ErrorClass, UserEntity> =
        await this.updateUserUsecases.execute(
          id,
          updatedUserEntity
        );
        
        updatedUser.cata(
          (error: ErrorClass) => {
                res.status(error.status).json({ error: error.message });
          },
          (result: UserEntity) => {
            const resData = UserMapper.toEntity(result, true);
            res.json(resData);
          }
        );
      }
    );
  }
}