document.addEventListener('DOMContentLoaded', () => {
    function generateMoviesData(numMovies) {
        let moviesData = [];
        for (let i = 1; i <= numMovies; i++) {
            const movie = {
                nameRu: `Фильм ${i}`,
                posterUrl: `https://picsum.photos/200/300?random=${i}`,
                year: new Date().getFullYear() - (i % 20),
                genres: ['Жанр 1', 'Жанр 2', 'Жанр 3', 'Жанр 4'],
                rating: (Math.random() * (10 - 1) + 1).toFixed(1),
                filmLength: `${Math.floor(Math.random() * 3) + 1} ч ${Math.floor(Math.random() * 60)} мин`,
                description: `Описание фильма бла бла бла ${i}`
            };
            moviesData.push(movie);
        }
        return moviesData;
    }

    function createMovieCard(movie) {
        const card = document.createElement('div');
        card.classList.add('movie-card');
        card.innerHTML = `
            <img src="${movie.posterUrl}" alt="Постер фильма ${movie.nameRu}">
            <div class="icons">
            <svg class="icon favorite" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            </div>
            <div class="content">
                <h1>${movie.nameRu}</h1>
                <div class="infos">
                    <span>· ${movie.year} · ${movie.filmLength}</span>
                </div>
                <p class="synopsis">${movie.description}</p>
            </div>
        `;
        return card;
    }

    function renderMovies(numMovies) {
        const moviesContainer = document.getElementById('movies');
        const moviesData = generateMoviesData(numMovies);
        const fragment = document.createDocumentFragment();

        moviesData.forEach(movie => {
            fragment.appendChild(createMovieCard(movie));
        });

        moviesContainer.appendChild(fragment);
    }

    renderMovies(100);
});
