// auth.js

// Función para registrar un nuevo usuario
function registerUser() {
    const form = document.getElementById('registrationForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar el envío del formulario

        const email = form.email.value;
        const password = form.password.value;
        const name = form.name.value;

        // Validar el correo electrónico
        if (!validateEmail(email)) {
            alert('Por favor, ingresa un correo electrónico válido.');
            return;
        }

        // Validar la contraseña
        if (!validatePassword(password)) {
            alert('La contraseña debe tener entre 4 y 10 caracteres.');
            return;
        }

        // Guardar el usuario en el LocalStorage
        const user = {
            email: email,
            password: password,
            name: name
        };

        localStorage.setItem('user', JSON.stringify(user));
        alert('Registro exitoso. Puedes iniciar sesión ahora.');
        window.location.href = 'login.html'; // Redirigir a la página de inicio de sesión
    });
}

// Función para iniciar sesión
function loginUser() {
    const form = document.getElementById('loginForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar el envío del formulario

        const email = form.email.value;
        const password = form.password.value;

        const user = JSON.parse(localStorage.getItem('user'));

        // Validar credenciales
        if (user && user.email === email && user.password === password) {
            localStorage.setItem('sessionUser', JSON.stringify(user));
            alert('Inicio de sesión exitoso.');
            window.location.href = 'index.html'; // Redirigir a la página principal
        } else {
            alert('Credenciales incorrectas. Intenta nuevamente.');
        }
    });
}

// Función para validar el formato del correo electrónico
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Función para validar la contraseña
function validatePassword(password) {
    return password.length >= 4 && password.length <= 10;
}

// Llamar a las funciones según la página
if (document.getElementById('registrationForm')) {
    registerUser();
}

if (document.getElementById('loginForm')) {
    loginUser();
}