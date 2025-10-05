// validaciones.js

// Validación de correo electrónico (solo dominios permitidos)
function validarCorreo(correo) {
    const regex = /^[a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
    return regex.test(correo);
}

// Validación de contraseña (mínimo 6, máximo 20 caracteres)
function validarContrasena(contrasena) {
    return contrasena.length >= 6 && contrasena.length <= 20;
}

// Validación de nombre (no vacío, máximo 100 caracteres)
function validarNombre(nombre) {
    return nombre.trim().length > 0 && nombre.length <= 100;
}

// Validación de comentario (no vacío, máximo 500 caracteres)
function validarComentario(comentario) {
    return comentario.trim().length > 0 && comentario.length <= 500;
}

// Validación de RUN/RUT chileno con dígito verificador
function validarRUN(run) {
    // Formato: 7-8 dígitos + guion + dígito verificador (ej: 12345678-9)
    const regex = /^\d{7,8}-[\dkK]$/;
    if (!regex.test(run)) return false;
    // Validación de dígito verificador
    const [num, dv] = run.split('-');
    return dv.toUpperCase() === calcularDV(num);
}

// Calcula dígito verificador para RUT chileno
function calcularDV(rut) {
    let suma = 0, multiplo = 2;
    for (let i = rut.length - 1; i >= 0; i--) {
        suma += parseInt(rut[i]) * multiplo;
        multiplo = multiplo === 7 ? 2 : multiplo + 1;
    }
    const dv = 11 - (suma % 11);
    if (dv === 11) return '0';
    if (dv === 10) return 'K';
    return dv.toString();
}

// Validación de fecha de nacimiento (mayor de 18 años)
function validarFechaNacimiento(fecha) {
    if (!fecha) return false;
    const nacimiento = new Date(fecha);
    const hoy = new Date();
    const edad = hoy.getFullYear() - nacimiento.getFullYear();
    if (edad > 18) return true;
    if (edad === 18) {
        if (
            hoy.getMonth() > nacimiento.getMonth() ||
            (hoy.getMonth() === nacimiento.getMonth() && hoy.getDate() >= nacimiento.getDate())
        ) {
            return true;
        }
    }
    return false;
}

// Función para mostrar mensajes de error en la UI
function mostrarError(mensaje, selector = null) {
    if (selector) {
        const errorDiv = document.querySelector(selector);
        if (errorDiv) {
            errorDiv.textContent = mensaje;
            errorDiv.classList.remove('d-none');
        }
    } else {
        alert(mensaje);
    }
}

// Validación de registro de usuario
function validarRegistro({ nombre, correo, contrasena, run, fechaNacimiento }, errorSelector = null) {
    if (!validarNombre(nombre)) {
        mostrarError("El nombre es requerido y debe tener un máximo de 100 caracteres.", errorSelector);
        return false;
    }
    if (!validarCorreo(correo)) {
        mostrarError("El correo debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com.", errorSelector);
        return false;
    }
    if (!validarContrasena(contrasena)) {
        mostrarError("La contraseña debe tener entre 6 y 20 caracteres.", errorSelector);
        return false;
    }
    if (!validarRUN(run)) {
        mostrarError("El RUN/RUT debe tener formato 12345678-9 y dígito verificador válido.", errorSelector);
        return false;
    }
    if (!validarFechaNacimiento(fechaNacimiento)) {
        mostrarError("Debes ser mayor de 18 años.", errorSelector);
        return false;
    }
    return true;
}

// Validación de login
function validarLogin({ correo, contrasena }, errorSelector = null) {
    if (!validarCorreo(correo)) {
        mostrarError("Correo inválido o no permitido.", errorSelector);
        return false;
    }
    if (!validarContrasena(contrasena)) {
        mostrarError("Contraseña inválida.", errorSelector);
        return false;
    }
    return true;
}

// Validación de formulario de contacto
function validarContacto({ nombre, correo, comentario }, errorSelector = null) {
    if (!validarNombre(nombre)) {
        mostrarError("El nombre es requerido.", errorSelector);
        return false;
    }
    if (!validarCorreo(correo)) {
        mostrarError("Correo inválido.", errorSelector);
        return false;
    }
    if (!validarComentario(comentario)) {
        mostrarError("El comentario es requerido y debe tener máximo 500 caracteres.", errorSelector);
        return false;
    }
    return true;
}

// Las funciones están disponibles globalmente