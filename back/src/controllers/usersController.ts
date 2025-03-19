import { Request, Response } from "express";
import IUser from "../interfaces/IUser";
import { createUserService, findUSerByCredentialId, gerUsersService, getUserByIdService } from "../services/userService";
import IUserDto from "../dtos/IUserDto";
import { validateCredential } from "../services/credentialService";
import User from "../entities/User";

export const getAllUsers =async (req:Request,res:Response) => {
    try {        
        const users:User[] = await gerUsersService();
        res.status(200).json(users);
    } catch (error:any) {
        res.status(400).json({error: error.message})
    }
}

export const getUserById = async (req:Request,res:Response) => {
    try {        
        const {id} = req.params
        const user =await getUserByIdService(Number(id))
        res.status(200).json(user)
    } catch (error:any) {
        res.status(400).json({error: error.message})
    }
}

export const register = async (req:Request,res:Response) => {
    try {
        const {name,email,birthdate,nDni,username,password}: IUserDto = req.body
        const newUser = await createUserService({name,email,birthdate,nDni,username,password})
        res.status(200).json(newUser)
        
    } catch (error:any) {
        res.status(400).json({error: error.message})
    }
}

export const login = async (req:Request,res:Response) => {
    try {        
        const {username, password} = req.body
        const credential = await validateCredential({username, password})
        const user = await findUSerByCredentialId(credential.id)
        res.status(201).json({
            login:true,
            user,
        })
    } catch (error:any) {
        res.status(400).json({error: error.message})
    }
}