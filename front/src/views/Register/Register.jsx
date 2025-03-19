import React, { useEffect, useState } from 'react';
import { validateRegister } from '../../helpers/validate';
import axios from 'axios';
import styles from './Register.module.css';
const Register = () => {
    const initialState = {
        name: "",
        email: "",
        birthdate: "",
        nDni: "",
        username: "",
        password: ""
    };

    const [form, setForm] = useState(initialState);
    const [errors, setErrors] = useState(initialState);

    useEffect(() => {
        const errors = validateRegister(form);
        setErrors(errors);
    }, [form]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    };

    const postData = async () => {
        try {
            const response = await axios.post('http://localhost:3000/users/register', form);

            if (response.status === 200) {
                alert('Registro exitoso');
            } else {
                alert('Error en el registro');
            }
            setForm(initialState);
        } catch (error) {
            console.log('Error en el servidor', error);
            alert('Error en el registro');
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        postData();
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Registro de usuario</h1>

            <form onSubmit={handleSubmit}>
                {
                    [
                        {
                            label: "Nombre",
                            name: "name",
                            type: "text",
                        },
                        {
                            label: "Nombre de usuario",
                            name: "username",
                            type: "text",
                        },
                        {
                            label: "Contraseña",
                            name: "password",
                            type: "password",
                        },
                        {
                            label: "X Electronico",
                            name: "email",
                            type: "text",
                        },
                        {
                            label: "Fecha de nacimiento",
                            name: "birthdate",
                            type: "date",
                        },
                        {
                            label: "Numero de dni",
                            name: "nDni",
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
                <button disabled={errors.email} type='submit' className={styles.button}>
                    Registrar
                </button>
            </form>
        </div>
    );
};

export default Register;
