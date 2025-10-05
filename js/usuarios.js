// usuarios.js

// Función para obtener usuarios del LocalStorage
function getUsers() {
    const users = localStorage.getItem('usuarios');
    return users ? JSON.parse(users) : [];
}

// Función para guardar un nuevo usuario en el LocalStorage
function saveUser(user) {
    const usuarios = getUsers();
    usuarios.push(user);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

// Función para actualizar un usuario existente
function updateUser(correo, updatedUser) {
    const usuarios = getUsers();
    const index = usuarios.findIndex(user => user.correo === correo);
    if (index !== -1) {
        usuarios[index] = { ...usuarios[index], ...updatedUser };
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }
}

// Función para eliminar un usuario
function deleteUser(correo) {
    const usuarios = getUsers();
    const nuevosUsuarios = usuarios.filter(user => user.correo !== correo);
    localStorage.setItem('usuarios', JSON.stringify(nuevosUsuarios));
}

// Función para validar el RUT chileno
function validarRUT(rut) {
    const regex = /^\d{7,8}-[\dkK]$/;
    if (!regex.test(rut)) return false;
    const [numero, dv] = rut.split('-');
    let suma = 0, multiplo = 2;
    for (let i = numero.length - 1; i >= 0; i--) {
        suma += parseInt(numero[i]) * multiplo;
        multiplo = multiplo === 7 ? 2 : multiplo + 1;
    }
    const dvCalculado = 11 - (suma % 11);
    if (dvCalculado === 11) return dv.toUpperCase() === '0';
    if (dvCalculado === 10) return dv.toUpperCase() === 'K';
    return dvCalculado.toString() === dv;
}

// Función para validar el registro de un nuevo usuario
function validarRegistro(user) {
    const { rut, nombre, apellidos, correo, fechaNacimiento } = user;
    const errores = [];

    if (!validarRUT(rut)) {
        errores.push('RUT inválido.');
    }
    if (!nombre || nombre.length > 50) {
        errores.push('Nombre requerido y debe tener menos de 50 caracteres.');
    }
    if (!apellidos || apellidos.length > 100) {
        errores.push('Apellidos requeridos y deben tener menos de 100 caracteres.');
    }
    if (!correo || !/^[a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/.test(correo)) {
        errores.push('Correo inválido o no permitido.');
    }
    if (fechaNacimiento && !/^\d{4}-\d{2}-\d{2}$/.test(fechaNacimiento)) {
        errores.push('Fecha de nacimiento inválida.');
    }

    return errores;
}

// Función para obtener un usuario por su correo
function getUserByCorreo(correo) {
    const usuarios = getUsers();
    return usuarios.find(user => user.correo === correo);
}

// Las funciones están disponibles globalmente