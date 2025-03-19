// Validar registro
export const validateRegister = (formData) => {
    const errors = {};
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const dniRegex = /^[0-9]+$/;

    // Validación de email
    if (formData.email && !emailRegex.test(formData.email)) {
        errors.email = 'Ingresa un email válido';
    }

    // Validación de nombre de usuario
    if (!formData.username) {
        errors.username = 'Ingresa un nombre de usuario';
    }

    // Validación de DNI (debe ser numérico)
    if (!formData.dni || !dniRegex.test(formData.dni)) {
        errors.dni = 'Ingresa un DNI válido (solo números)';
    }

    // Validación de contraseña
    if (!formData.password) {
        errors.password = 'Ingresa una contraseña';
    } else if (formData.password.length < 6) {
        errors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    return errors;
};

// Validar login
export const validateLogin = (formData) => {
    const errors = {};

    // Validación de nombre de usuario
    if (!formData.username) {
        errors.username = 'Ingresa un nombre de usuario';
    }

    // Validación de contraseña
    if (!formData.password) {
        errors.password = 'Ingresa una contraseña';
    }

    return errors;
};

// Validar appointment
export const validateAppointment = (form) => {
    let errors = {};

    // Validación de fecha (no permitir días anteriores a hoy)
    const today = new Date();
    const appointmentDate = new Date(form.date);
    today.setHours(0, 0, 0, 0); // Para comparar solo fechas, sin horas
    appointmentDate.setHours(0, 0, 0, 0);

    if (!form.date) {
        errors.date = "La fecha es requerida";
    } else if (appointmentDate < today) {
        errors.date = "No puedes sacar un turno en días anteriores a hoy";
    }

    // Validación de hora (solo entre 09:00 y 19:00)
    const appointmentTime = form.time ? parseInt(form.time.split(':')[0], 10) : null;

    if (!form.time) {
        errors.time = "La hora es requerida";
    } else if (appointmentTime < 9 || appointmentTime >= 19) {
        errors.time = "El horario de citas es entre 09:00 y 19:00";
    }

    // Validación de descripción
    if (!form.description) {
        errors.description = "La descripción es requerida";
    }

    // Validación de userId
    if (!form.userId) {
        errors.userId = "El ID de usuario es requerido";
    }

    return errors;
};
