import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import styles from './NewAppointment.module.css';
import { validateAppointment } from '../../helpers/validate';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Importa SweetAlert2

const NewAppointment = () => {
    const navigate = useNavigate();
    const initialState = {
        date: "",
        time: "",
        description: ""
    };

    const [form, setForm] = useState(initialState);
    const [errors, setErrors] = useState(initialState);

    const user = useSelector((state) => state.userActive);

    useEffect(() => {
        const errors = validateAppointment(form);
        setErrors(errors);
    }, [form]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    };

    const postData = async () => {
        if (!user || !user.id) {
            Swal.fire({
                title: 'Error',
                text: 'No estás logueado.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
            return;
        }

        const appointmentData = {
            ...form,
            userId: user.id,
            status: "active"
        };

        try {
            const response = await axios.post('http://localhost:3000/appointments/schedule', appointmentData);

            if (response.status === 200) {
                Swal.fire({
                    title: 'Éxito',
                    text: 'Turno registrado exitosamente',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                }).then(() => {
                    navigate('/appointments')
                });
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Error al registrar el turno',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
            }
            setForm(initialState);
        } catch (error) {
            console.log('Error en el servidor', error);
            Swal.fire({
                title: 'Error',
                text: 'Error en el registro del turno',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        postData();
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Registro de Turno</h1>
            <div className={styles.attentionMessage}>
                <p>Nuestro horario de atención es de 09 a 19 hs. ¡Que tengas un buen día!</p>
            </div>
            <form onSubmit={handleSubmit}>
                {
                    [
                        {
                            label: "Fecha",
                            name: "date",
                            type: "date",
                        },
                        {
                            label: "Hora",
                            name: "time",
                            type: "time",
                        },
                        {
                            label: "Descripción",
                            name: "description",
                            type: "text",
                        },
                    ].map(({ label, name, type }) => {
                        return (
                            <div key={name} className={styles.formGroup}>
                                <label className={styles.label}>{label}</label>
                                <input
                                    type={type}
                                    name={name}
                                    value={form[name]}
                                    onChange={handleChange}
                                    className={styles.input}
                                />
                                {errors[name] && <span className={styles.error}>{errors[name]}</span>}
                            </div>
                        );
                    })
                }
                <button disabled={errors.date || errors.time || errors.description} type='submit' className={styles.button}>
                    Registrar Turno
                </button>
            </form>
        </div>
    );
};

export default NewAppointment;
