import { credentialModel } from "../config/data-source";
import ICredentialDto from "../dtos/ICredentialDto";
import Credential from "../entities/Credential";

export const createCredential =async (credentialDTO:ICredentialDto) => {
    const newCredential: Credential = await credentialModel.create(credentialDTO)
    credentialModel.save(newCredential)
    return newCredential;
};

export const validateCredential = async (credentialDTO:ICredentialDto) =>{
    const {username, password} = credentialDTO
    const foundCredential:Credential | null = await credentialModel.findOneBy({username})

    if(!foundCredential){
        throw Error("credenciales incorrectas")
    } else if(foundCredential && foundCredential.username !== username){
        throw Error("usuario incorrecto")
    } else if(foundCredential && foundCredential.password !== password)
        throw Error ("Contraseña incorrecta")
    else{
        return foundCredential
    }
}

