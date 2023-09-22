import { NextFunction, Request, Response } from "express";

const jwt= require("jsonwebtoken");

const validator= ( next: NextFunction, req: Request, res: Response)=>{
    const token= req.headers.authorization;
    if(token){
        jwt.verify(token, process.env.secret_key, (err: any, decoded: any)=>{
            if(decoded){
                req.body.userId= decoded.userId;
                next();
            }else if(err){
                res.send({message : "Please Login First"})
            }
        })
    }else{
        res.send({message : "Please Login First"})
    }
}

export default validator;