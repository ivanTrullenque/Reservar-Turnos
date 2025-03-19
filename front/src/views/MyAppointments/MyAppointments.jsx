import { useState, useEffect } from "react";
import Appointment from "../../components/Appointment/Appointment";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUserAppointments } from "../../redux/reducer";
import styles from './MyAppointments.module.css';
const MyAppointments = () => {
    const navigate = useNavigate();

    const userData = useSelector((state) => state.userActive);
    const userAppointments = useSelector((state) => state.userAppointment);

    const dispatch = useDispatch();

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/users/${userData.id}`);
            dispatch(addUserAppointments(response.data.appointments));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        !userData.name ? navigate("/") : fetchData();
    }, []);

    const handleNewAppointment = () => {
        navigate("/new-appointment");
    };

    return (
        <div className={styles.container}>
            <h1>Mis Turnos</h1>
            <button className={styles.newAppointmentButton} onClick={handleNewAppointment}>
                Nuevo Turno
            </button>
            <table className={styles.appointmentTable}>
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Hora</th>
                        <th>Descripción</th>
                        <th>Estado</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {userAppointments.length ? (
                        userAppointments.map(({ date, time, id, status, description }) => (
                            <Appointment
                                key={id}
                                date={date}
                                time={time}
                                description={description}
                                id={id}
                                status={status}
                            />
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">Aún no tienes turnos agendados.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default MyAppointments;
