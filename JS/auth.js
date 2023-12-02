// auth.js

document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.querySelector('form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    // Variable de sesión que indica si el usuario está autenticado
    let isAuthenticated = false;

    // Agrega un evento de click al enlace de detalle
    const detalleEnlace = document.getElementById('detallePelicula');
    detalleEnlace.addEventListener('click', function (event) {
        // Verifica si el usuario está autenticado
        if (!isAuthenticated) {
            event.preventDefault(); // Evita la redirección
            alert('Debes iniciar sesión para ver el detalle.'); // Muestra un mensaje de alerta o redirige a la página de inicio de sesión
        }
    });

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const email = emailInput.value;
        const password = passwordInput.value;

        // Simula una autenticación exitosa para este ejemplo
        if (email === 'usuario@example.com' && password === 'contraseña') {
            isAuthenticated = true;
            Swal.fire({
                title: 'Inicio de sesión exitoso',
                text: '¡Bienvenido!',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                window.location = '/ruta-de-destino';
            });
        } else {
            isAuthenticated = false;
            Swal.fire({
                title: 'Error de inicio de sesión',
                text: 'Credenciales incorrectas',
                icon: 'error',
                showConfirmButton: true
            });
        }
    });
});
