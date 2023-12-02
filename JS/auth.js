const realizarConsulta = require('../mysql');

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
            // Llamar a la función de conexión y realizar consulta
            realizarConsulta((results) => {
                // Puedes trabajar con los resultados de la consulta aquí
                console.log('Resultados en auth.js:', results);

                // Simplemente como ejemplo, puedes redirigir a index.html
                window.location.href = "index.html";
            });
        } catch (error) {
            console.error("Error al autenticar:", error);
        }
    });

    document.addEventListener("DOMContentLoaded", function () {
        // Puedes agregar lógica aquí para verificar si el usuario está autenticado
        const isAuthenticated = false; // Cambia esto con tu lógica de autenticación

        if (!isAuthenticated) {
            // Si el usuario no está autenticado, redirigir a login.html
            window.location.href = "login.html";
        }
    });
});