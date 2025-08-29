// validaciones.js

// Validación de correo electrónico
function validarCorreo(correo) {
    const regex = /^[a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
    return regex.test(correo);
}

// Validación de contraseña
function validarContrasena(contrasena) {
    return contrasena.length >= 4 && contrasena.length <= 10;
}

// Validación de nombre
function validarNombre(nombre) {
    return nombre.length > 0 && nombre.length <= 100;
}

// Validación de comentario
function validarComentario(comentario) {
    return comentario.length > 0 && comentario.length <= 500;
}

// Validación de RUN (RUT chileno)
function validarRUN(run) {
    const regex = /^\d{7,8}[K0-9]$/;
    return regex.test(run);
}

// Validación de fecha de nacimiento
function validarFechaNacimiento(fecha) {
    // Aquí puedes agregar lógica para validar la fecha de nacimiento si es necesario
    return true; // Placeholder
}

// Función para mostrar mensajes de error
function mostrarError(mensaje) {
    alert(mensaje); // Puedes cambiar esto para mostrar errores en la UI
}

// Ejemplo de uso en el registro
function validarRegistro(nombre, correo, contrasena, run) {
    if (!validarNombre(nombre)) {
        mostrarError("El nombre es requerido y debe tener un máximo de 100 caracteres.");
        return false;
    }
    if (!validarCorreo(correo)) {
        mostrarError("El correo debe ser de un dominio permitido (@duoc.cl, @profesor.duoc.cl, @gmail.com).");
        return false;
    }
    if (!validarContrasena(contrasena)) {
        mostrarError("La contraseña debe tener entre 4 y 10 caracteres.");
        return false;
    }
    if (!validarRUN(run)) {
        mostrarError("El RUN debe tener entre 7 y 8 dígitos y un dígito verificador.");
        return false;
    }
    return true;
}

// Exportar funciones si es necesario
export { validarCorreo, validarContrasena, validarNombre, validarComentario, validarRUN, validarRegistro };