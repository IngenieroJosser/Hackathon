document.addEventListener('DOMContentLoaded', function () {
    const apiKey = '7a378c18';
    const apiUrl = 'http://www.omdbapi.com/';

    async function obtenerParametroImdbID() {
        try {
            const urlParams = new URLSearchParams(window.location.search);
            const imdbID = urlParams.get('imdbID');

            const apiUrlWithKeyAndSearch = `${apiUrl}?i=${imdbID}&apikey=${apiKey}`;
            const response = await fetch(apiUrlWithKeyAndSearch);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            

            const codigoPeliculas = await obtenerCodigoPeliculas(data.imdbID);

            for (const movie of codigoPeliculas.movie_results) {
                const trailerData = await obtenerCodigoTrailers(movie.id);

                for (const trailer of trailerData.results) {
                    mostrarInformacionPelicula(data, trailer.key);
                    break;
                }
                break;
            }

        } catch (error) {
            console.error('Error:', error);
        }
    }

    function mostrarInformacionPelicula(data, keys) {
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
        // Crear el elemento <main>
        const mainElement = document.createElement('main');

        // Crear el elemento <div> con la clase 'video-container'
        const videoContainer = document.createElement('div');
        videoContainer.classList.add('video-container');

        // Crear el elemento <iframe>
        const iframeElement = document.createElement('iframe');
        iframeElement.width = '560';
        iframeElement.height = '315';
        iframeElement.src = `https://www.youtube.com/embed/${keys}`;
        iframeElement.frameBorder = '0';
        iframeElement.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        iframeElement.allowFullscreen = true;

        // Agregar el <iframe> al <div>
        videoContainer.appendChild(iframeElement);

        // Agregar el <div> al <main>
        mainElement.appendChild(videoContainer);

        // Agregar el <main> al final del cuerpo del documento
        document.body.appendChild(mainElement);

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
    /*
    obtenerNombrePeliculas(searchTerm).then(data => {
            mostrarSeleccionNombre(data.results);
        });
    */
    async function obtenerCodigoPeliculas(id) {
        const url = `https://api.themoviedb.org/3/find/${id}?external_source=imdb_id`;

        const headers = {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNjExMjA1YTc4M2E5MGFmZTQyYzljNmQwOGQ5ZTZkZCIsInN1YiI6IjY1NmFkNmJlNGE0YmY2MDEyMDI3NTlkOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.suimHOlR8jRohBaBecitn2XaoKORn_xg1bgHFZXbn8w',
            'accept': 'application/json',
        };

        try {
            const response = await fetch(url, { method: 'GET', headers: headers });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error al obtener datos de la API:', error);
        }
    }

    async function obtenerCodigoTrailers(id) {
        const url = `https://api.themoviedb.org/3/movie/${id}/videos`;

        const headers = {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNjExMjA1YTc4M2E5MGFmZTQyYzljNmQwOGQ5ZTZkZCIsInN1YiI6IjY1NmFkNmJlNGE0YmY2MDEyMDI3NTlkOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.suimHOlR8jRohBaBecitn2XaoKORn_xg1bgHFZXbn8w',
            'accept': 'application/json',
        };

        try {
            const response = await fetch(url, { method: 'GET', headers: headers });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error al obtener datos de la API:', error);
        }
    }

    obtenerParametroImdbID();
});
