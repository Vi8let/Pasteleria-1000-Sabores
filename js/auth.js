// auth.js

// Función para mostrar errores
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

// Función para registrar un nuevo usuario
function registerUser() {
    const form = document.getElementById('registrationForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const nombre = form.name.value.trim();
        const correo = form.email.value.trim();
        const contrasena = form.password.value;
        const run = form.run.value.trim();
        const fechaNacimiento = form.fechaNacimiento.value;

        // Validaciones básicas
        if (!nombre || nombre.trim().length === 0) {
            mostrarError('Nombre inválido.', '#registroError');
            return;
        }
        if (!correo || !/^[a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/.test(correo)) {
            mostrarError('Correo no permitido.', '#registroError');
            return;
        }
        if (contrasena.length < 6 || contrasena.length > 20) {
            mostrarError('Contraseña debe tener entre 6 y 20 caracteres.', '#registroError');
            return;
        }
        if (!run || !/^\d{7,8}-[\dkK]$/.test(run)) {
            mostrarError('RUN/RUT inválido.', '#registroError');
            return;
        }
        if (!fechaNacimiento) {
            mostrarError('Fecha de nacimiento requerida.', '#registroError');
            return;
        }

        // Guardar el usuario en el LocalStorage (array de usuarios)
        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        if (usuarios.some(u => u.correo === correo)) {
            mostrarError('El correo ya está registrado.', '#registroError');
            return;
        }
        const user = { nombre, correo, contrasena, run, fechaNacimiento };
        usuarios.push(user);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        alert('Registro exitoso. Puedes iniciar sesión ahora.');
        window.location.href = '../login.html';
    });
}

// Función para iniciar sesión
function loginUser() {
    const form = document.getElementById('loginForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const correo = form.email.value.trim();
        const contrasena = form.password.value;

        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        const user = usuarios.find(u => u.correo === correo && u.contrasena === contrasena);

        if (user) {
            localStorage.setItem('sessionUser', JSON.stringify(user));
            alert('Inicio de sesión exitoso.');
            window.location.href = 'admin/index.html';
        } else {
            mostrarError('Credenciales incorrectas.', '#loginError');
        }
    });
}

// Llamar a las funciones según la página
if (document.getElementById('registrationForm')) {
    registerUser();
}
if (document.getElementById('loginForm')) {
    loginUser();
}