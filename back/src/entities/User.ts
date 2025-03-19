import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
    OneToMany,
} from "typeorm"

import Credential from "./Credential"
import Appointment from "./Appointment"


@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    email: string
    
    @Column()
    birthdate: Date
    
    @Column()
    nDni: number


    @OneToOne(() => Credential)
    @JoinColumn()
    credential: Credential

    
    @OneToMany(() => Appointment, (appointment) => appointment.user)
    appointments: Appointment[]

}

export default User