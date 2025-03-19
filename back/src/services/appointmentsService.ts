import { appointmentModel, userModel } from "../config/data-source";
import IAppointmentDto from "../dtos/IAppointment.Dto";
import Appointment from "../entities/Appointment";
import User from "../entities/User";

export const getAppointmentsService = async () => {
    const allAppointments: Appointment[] = await appointmentModel.find()
    return allAppointments
}

export const getAppointmentByIdService = async (appointmentId:number) => {
    const foundAppointment: Appointment | null = await appointmentModel.findOneBy({id: appointmentId})
    if(!foundAppointment){
        throw  Error("El turno no fue encontrado")
    } else{
        return foundAppointment
    }
}

export const createAppointmentService = async (createAppointmentDTO: IAppointmentDto) => {
    const newAppointment = appointmentModel.create(createAppointmentDTO);
    await appointmentModel.save(newAppointment);

    const user: User | null = await userModel.findOneBy({ id: createAppointmentDTO.userId });

    if (user === null) {
        throw new Error("El usuario no fue encontrado");
    }

    newAppointment.user = user;
    await appointmentModel.save(newAppointment);

    return newAppointment;
};

export const cancelAppointmentService = async (id:number) => {
    const appointment = await appointmentModel.findOneBy({ id });
if(!appointment) throw Error("Turno Inexistente")
    appointment.status = "Cancelled";
    await appointmentModel.save(appointment)
    return appointment;
}
