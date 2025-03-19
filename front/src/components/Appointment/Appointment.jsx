import axios from "axios";
import { useDispatch } from "react-redux";
import { cancelAppointmentAction } from "../../redux/reducer";
import Swal from "sweetalert2"; // Importa SweetAlert2
import styles from './Appointment.module.css'; // Asegúrate de tener este archivo para los estilos

const Appointment = ({ date, time, description, id, status }) => {
    const dispatch = useDispatch();
    
    const cancelAppointment = async () => {
        try {
            const response = await axios.put(`http://localhost:3000/appointments/cancel/${id}`);
            dispatch(cancelAppointmentAction(id));
            console.log(response);
        } catch (error) {
            console.error("Ocurrió un error en el servidor", error);
        }
    };

    const handleCancelClick = () => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás revertir esta acción",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, cancelar',
            cancelButtonText: 'No, mantener'
        }).then((result) => {
            if (result.isConfirmed) {
                cancelAppointment();
                Swal.fire(
                    'Cancelado',
                    'El turno ha sido cancelado.',
                    'success'
                );
            }
        });
    };

    const getStatusBadge = () => {
        if (status === 'Cancelled') {
            return <span className={styles.badgeRed}>Cancelado</span>;
        } else {
            return <span className={styles.badgeGreen}>Activo</span>;
        } 
    };

    return (
        <tr className={styles.tableRow}>
            <td className={styles.tableCell}>{date}</td>
            <td className={styles.tableCell}>{time}</td>
            <td className={styles.tableCell}>{description}</td>
            <td className={`${styles.tableCell} ${styles.statusCell}`}>
                {getStatusBadge()}
            </td>
            <td className={styles.tableCell}>
                <button 
                    className={`${styles.cancelButton} ${status === "Cancelled" ? styles.disabledButton : ''}`}
                    disabled={status === "Cancelled"} 
                    onClick={handleCancelClick}
                >
                    Cancelar
                </button>
            </td>
        </tr>
    );
};

export default Appointment;
