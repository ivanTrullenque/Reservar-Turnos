import { DataSource } from "typeorm";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USERNAME } from "./envs";
import User from "../entities/User";
import Credential from "../entities/Credential";
import Appointment from "../entities/Appointment";

export const AppDataSource = new DataSource({
    type: "postgres",
    host:DB_HOST || "localhost",
    port:DB_PORT || 5432,
    username:DB_USERNAME || "postgres",
    password:DB_PASSWORD|| "123456789",
    database:DB_NAME|| "test",
    synchronize: true,
    dropSchema:false,
    logging: true,
    entities: [User,Credential,Appointment],
    subscribers: [],
    migrations: [],
})

export const userModel = AppDataSource.getRepository(User)
export const credentialModel = AppDataSource.getRepository(Credential)
export const appointmentModel = AppDataSource.getRepository(Appointment)