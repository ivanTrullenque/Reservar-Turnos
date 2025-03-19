import { Request, Response } from "express";
import { cancelAppointmentService, createAppointmentService, getAppointmentByIdService, getAppointmentsService } from "../services/appointmentsService";
import Appointment from "../entities/Appointment";

export const getAllAppointments = async (req:Request,res:Response) => {
    try {
        const appointments:Appointment[] = await getAppointmentsService();
        res.status(200).json(appointments);
        
    } catch (error:any) {
        res.status(400).json({error: error.message});
    }
}
export const getAppointmentById = async (req:Request,res:Response) => {
    try {
        const {id} = req.params
        const appointment:Appointment = await getAppointmentByIdService(Number(id))
        res.status(200).json(appointment)
        
    } catch (error:any) {
        res.status(400).json({error: error.message});
    }
   
}
export const schedule =async (req:Request,res:Response) => {
    try {
        const newAppointment = await createAppointmentService(req.body)
        res.status(200).json(newAppointment)
        
    } catch (error:any) {
        res.status(400).json({error: error.message});
    }

}
export const cancel = async (req:Request,res:Response) => {
    try {
        const {id} = req.params;
        const cancelAppointment = await cancelAppointmentService(Number(id));
        res.status(200).json({
         message:"turno cancelado con exito",
         cancelAppointment
        })
        
    } catch (error:any) {
        res.status(400).json({error: error.message});
    }


}