import { Router } from "express";
import { cancel, getAllAppointments, getAppointmentById, schedule } from "../controllers/appointmentsController";

const appointmentsRouter : Router = Router();

appointmentsRouter.get("/", getAllAppointments)
appointmentsRouter.get("/:id",getAppointmentById)
appointmentsRouter.post("/schedule", schedule)
appointmentsRouter.put("/cancel/:id", cancel)


export default appointmentsRouter