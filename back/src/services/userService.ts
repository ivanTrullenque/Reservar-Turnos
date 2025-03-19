import { userModel } from "../config/data-source";
import IUserDto from "../dtos/IUserDto";
import Credential from "../entities/Credential";
import User from "../entities/User";
import { createCredential } from "./credentialService"



export const gerUsersService = async () : Promise<User[]> => {
    const allUsers: User[] = await userModel.find()
    return allUsers
}

export const getUserByIdService = async (id: number): Promise<User> => {
    const foundUser: User | null = await userModel.findOne({ where: { id }, relations: ["appointments"] });
    if (!foundUser) {
        throw new Error("Usuario no encontrado");
    }
    return foundUser;
}


export const createUserService = async (createUserDTO:IUserDto) => {
    const newCredential: Credential = await createCredential({
        username: createUserDTO.username,
        password: createUserDTO.password
    })
    const newUser: User = await userModel.create(createUserDTO)
    await userModel.save(newUser)
    
    
    newUser.credential = newCredential;
    userModel.save(newUser)
    return newUser;
}

export const findUSerByCredentialId = async (credentialID:number) =>{
    const userFound = await userModel.findOneBy({credential:{id:credentialID}})
    return userFound
}