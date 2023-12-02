// script.js
document.addEventListener('DOMContentLoaded', function () {
    const apiKey = '7a378c18';
    const apiUrl = 'http://www.omdbapi.com/';

    function buscarPeliculas() {
        const searchTerm = document.getElementById('searchInput').value;

        console.log(searchTerm);
        if (!searchTerm) {
            console.log('Ingrese un término de búsqueda');
            return;
        }

        // Añade el API key y el término de búsqueda como parámetros de consulta
        const apiUrlWithKeyAndSearch = `${apiUrl}?s=${searchTerm}&apikey=${apiKey}`;

        // Realiza la solicitud HTTP utilizando fetch
        fetch(apiUrlWithKeyAndSearch)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                mostrarSeleccionEspecial(data.Search);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    function mostrarSeleccionEspecial(resultados) {
        const seleccionEspecialContainer = document.querySelector('.selección-especial');

        // Limpia los resultados anteriores
        seleccionEspecialContainer.innerHTML = '';

        if (resultados && resultados.length > 0) {
            resultados.forEach(movie => {
                // Crea un elemento <div> para cada resultado
                const resultElement = document.createElement('div');
                resultElement.classList.add('Seleccion', 'seleccion-especial-result');

                // Añade el título y el póster al elemento
                resultElement.innerHTML = `
                    <a href='#'><p><strong>Título:</strong> ${movie.Title}</p>
                    <img src="${movie.Poster}" alt="${movie.Title} Poster"></a>
                `;

                // Agrega el elemento al contenedor
                seleccionEspecialContainer.appendChild(resultElement);
            });
        } else {
            seleccionEspecialContainer.textContent = 'No se encontraron resultados';
        }
    }

    // Obtén la referencia al elemento de entrada
    const searchInput = document.getElementById('searchInput');

    // Agrega un evento al elemento de entrada para escuchar la tecla Enter
    searchInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            // Llama al método buscarPeliculas() cuando se presiona Enter
            buscarPeliculas();
        }
    });
});
