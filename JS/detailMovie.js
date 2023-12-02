document.addEventListener('DOMContentLoaded', function () {
    const apiKey = '7a378c18';
    const apiUrl = 'http://www.omdbapi.com/';

    function obtenerParametroImdbID() {
        const urlParams = new URLSearchParams(window.location.search);
        const imdbID = urlParams.get('imdbID');

        const apiUrlWithKeyAndSearch = `${apiUrl}?i=${imdbID}&apikey=${apiKey}`;

        fetch(apiUrlWithKeyAndSearch)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                mostrarInformacionPelicula(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });

        if (imdbID) {
            console.log('ImdbID obtenido de la URL:', imdbID);
        } else {
            console.log('No se encontró el parámetro imdbID en la URL');
        }
    }

    function mostrarInformacionPelicula(data) {
        // Aquí puedes manipular el DOM para mostrar la información de la película
        const cover = document.querySelector('.cover');
        const title1 = document.querySelector('.title1');
        const title2 = document.querySelector('.title2');
        const tags = document.querySelector('.tags');
        const readMore = document.querySelector('.read-more');
        const column2p = document.querySelector('.column2 p');
        const director = document.querySelector('.director');
        const writer = document.querySelector('.writer');
        const actors = document.querySelector('.actors');
        const language = document.querySelector('.language');
        const country = document.querySelector('.country');
        const runtime = document.querySelector('.runtime');
        const released = document.querySelector('.released');

        // Asegúrate de que las propiedades de data coincidan con tu API real
        director.textContent = data.Director;
        writer.textContent = data.Writer;
        actors.textContent = data.Actors;
        language.textContent = data.Language;
        country.textContent = data.Country;
        runtime.textContent = data.Runtime;
        released.textContent = data.Released;
        cover.src = data.Poster;
        title1.textContent = data.Title;
        title2.textContent = `${data.Rated} | ${data.Year}`;
        // Puedes continuar extrayendo y mostrando más información según tus necesidades

        // Ejemplo: Mostrar géneros como etiquetas
        const genres = data.Genre.split(', ');
        genres.forEach(genre => {
            const tag = document.createElement('span');
            tag.classList.add('tag');
            tag.textContent = genre;
            tags.appendChild(tag);
        });

        // Ejemplo: Mostrar el enlace "read more"
        readMore.href = data.Website || '#';

        // Ejemplo: Mostrar la descripción en la segunda columna
        column2p.textContent = data.Plot;
    }

    obtenerParametroImdbID();
});
