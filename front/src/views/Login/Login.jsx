import React, { useEffect, useState } from 'react';
import { validateLogin } from '../../helpers/validate';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../../redux/reducer';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const initialState = {
        username: '',
        password: ''
    };

    const [form, setForm] = useState(initialState);
    const [errors, setErrors] = useState(initialState);

    useEffect(() => {
        const errors = validateLogin(form);
        setErrors(errors);
    }, [form]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    };

    const postData = async () => {
        try {
            const response = await axios.post('http://localhost:3000/users/Login', form);
            if (response.status === 201) {
                dispatch(addUser(response.data.user));
                localStorage.setItem('user', JSON.stringify(response.data.user));
                Swal.fire({
                    icon: 'success',
                    title: '¡Éxito!',
                    text: 'Usuario logeado correctamente'
                }).then(() => {
                    navigate('/appointments');
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error en el logeo'
                });
            }
            setForm(initialState);
        } catch (error) {
            console.error('Error en el servidor', error);
    
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error en el servidor'
            });
        }
    };
    

    const handleSubmit = (event) => {
        event.preventDefault();
        postData();
    };

    return (
        <div className={styles.formContainer}>
            <h1 className={styles.formTitle}>Iniciar Sesión</h1>
            <form onSubmit={handleSubmit}>
                {[
                    { label: 'Nombre de usuario', name: 'username', type: 'text' },
                    { label: 'Contraseña', name: 'password', type: 'password' }
                ].map(({ label, name, type }) => (
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
                ))}
                <button
                    type="submit"
                    className={styles.button}
                    disabled={errors.username || errors.password}
                >
                    Ingresar
                </button>
            </form>
        </div>
    );
};

export default Login;
