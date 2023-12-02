// script.js
document.addEventListener('DOMContentLoaded', function () {
    const apiKey = '7a378c18';
    const apiUrl = 'http://www.omdbapi.com/';

    function buscarPeliculas() {
        const searchTerm = document.getElementById('searchInput').value;

        console.log(searchTerm);
        if (!searchTerm) {
            window.location.href = "index.html";
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
                    <a href='pelicula.html?imdbID=${movie.imdbID}'><p><strong>Título:</strong> ${movie.Title}</p>
                    <img src="${movie.Poster}" alt="${movie.Title} Poster"></a>
                `;

                // Agrega el elemento al contenedor
                seleccionEspecialContainer.appendChild(resultElement);
            });
        } else {
            seleccionEspecialContainer.textContent = 'No se encontraron resultados';
        }

    }

    function buildCarousel(title, items) {
        const carruselContainer = document.createElement('div');
        carruselContainer.classList.add('carrusel-container');


        // Crea el contenedor de diapositivas
        const slideContainer = document.createElement('div');
        slideContainer.classList.add('carrusel-slide');

        // Añade las imágenes al carrusel
        items.forEach(item => {
            const anchorElement = document.createElement('a');
            anchorElement.href = `pelicula.html?imdbID=${item.imdbID}`;
            const imgElement = document.createElement('img');
            imgElement.classList.add('Seleccion');
            imgElement.src = item.Poster;
            imgElement.alt = item.Title;
            anchorElement.appendChild(imgElement);
            slideContainer.appendChild(anchorElement);
        });

        // Añade el contenedor de diapositivas al carrusel
        carruselContainer.appendChild(slideContainer);

        // Añade el carrusel al documento
        document.querySelector('.carrusel').appendChild(carruselContainer);
    }

    function crearCarrusel(pelicula) {

        // Realiza una solicitud adicional a la API para obtener información detallada de la película
        const apiUrlForMovie = `${apiUrl}?s=${pelicula}&apikey=${apiKey}`;

        console.log(apiUrlForMovie);
        fetch(apiUrlForMovie)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data.Search);
                mostrarSeleccionEspecial(data.Search);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    crearCarrusel("Batman");

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
