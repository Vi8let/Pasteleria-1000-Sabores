// usuarios.js

// Arreglo para almacenar los usuarios
let usuarios = [];

// Función para obtener usuarios del LocalStorage
function getUsers() {
    const users = localStorage.getItem('usuarios');
    return users ? JSON.parse(users) : [];
}

// Función para guardar un nuevo usuario en el LocalStorage
function saveUser(user) {
    usuarios = getUsers();
    usuarios.push(user);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

// Función para actualizar un usuario existente
function updateUser(id, updatedUser) {
    usuarios = getUsers();
    const index = usuarios.findIndex(user => user.id === id);
    if (index !== -1) {
        usuarios[index] = updatedUser;
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }
}

// Función para eliminar un usuario
function deleteUser(id) {
    usuarios = getUsers();
    usuarios = usuarios.filter(user => user.id !== id);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

// Función para validar el RUT chileno
function validarRUT(rut) {
    const regex = /^\d{7,8}-[0-9K]$/;
    if (!regex.test(rut)) return false;

    const [numero, dv] = rut.split('-');
    const suma = [...numero].reverse().reduce((acc, digito, index) => {
        return acc + (parseInt(digito) * (index % 6 + 2));
    }, 0);
    const dvCalculado = 11 - (suma % 11);
    return dvCalculado === (dv === 'K' ? 10 : parseInt(dv));
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
    if (!correo || !/\S+@\S+\.\S+/.test(correo)) {
        errores.push('Correo inválido.');
    }
    if (fechaNacimiento && !/^\d{4}-\d{2}-\d{2}$/.test(fechaNacimiento)) {
        errores.push('Fecha de nacimiento inválida.');
    }

    return errores;
}

// Función para obtener un usuario por su RUT
function getUserByRUT(rut) {
    usuarios = getUsers();
    return usuarios.find(user => user.rut === rut);
}

// Exportar funciones para uso en otros módulos
export { getUsers, saveUser, updateUser, deleteUser, validarRUT, validarRegistro, getUserByRUT };