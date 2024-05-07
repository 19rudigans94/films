document.addEventListener('DOMContentLoaded', function () {
    const moviesContainer = document.getElementById('movies');
    const header = document.getElementById('header');
    const sections = document.querySelectorAll('section');
    const searchGenreSelect = document.getElementById('search-genre');
    const genres = ['Боевик', 'Комедия', 'Драма', 'Аниме']; // список жанров фильмов для выпадающего списка пока вписываю сам, потом получать из API
    const swiperWrapper = document.querySelector('.swiper-wrapper');
    const modalContainer = document.querySelector('.modal_container');
    const favoritesContainer = document.querySelector('.favorite-movies');


    // API для получения новостей и функции для создания карточки новости (ru, en, ua доступны разные языки но не везде есть катинки) 
    const news = async () => {
        const url = 'https://newsapi.org/v2/top-headlines?' +
            'country=us&' +
            'apiKey=3e557151e4b845adbb50464c0c255fb2';

        const response = await fetch(url);
        const data = await response.json();
        const newsSection = document.querySelector('.news-section');
        for (let i = 0; i < data.articles.length; i++) {
            const article = data.articles[i];
            const card = createNewsCard(article);
            newsSection.appendChild(card);
        }
    }

    // функция для получения рандомного фильма с API псевдоКинопоиска
    const getRandomMovieFromAPI = async () => {
        const options = {
            method: 'GET',
            headers: { accept: 'application/json', 'X-API-KEY': 'CT4KCKH-JPN4227-MCNH7K2-ETEJVT6' }  // BVSW5PY-3ZD4PNB-KFXKP2X-WS9HSA8
        };

        const response = await fetch('https://api.kinopoisk.dev/v1.4/movie/random?notNullFields=top250&notNullFields=description&notNullFields=poster.url', options);
        const data = await response.json();
        showModalfromMain(data); // использовать если запросы закончились
        // return data; // использовать с API псевдоКинопоиска
    }

    // функция для создания карточки новости
    function createNewsCard(news) {
        const card = document.createElement('div');
        card.classList.add('news-card');

        const content = document.createElement('div');
        content.classList.add('news-content');

        const title = document.createElement('h3');
        title.textContent = news.title;

        const description = document.createElement('p');
        description.textContent = news.description;

        const publishedAt = document.createElement('p');
        publishedAt.textContent = `Опубликован: ${new Date(news.publishedAt).toLocaleString()}`;

        const fullArticleLink = document.createElement('a');
        fullArticleLink.href = news.url;
        fullArticleLink.textContent = 'читать полностью';
        fullArticleLink.target = '_blank';
        fullArticleLink.classList.add('read-more-link');

        content.appendChild(title);
        content.appendChild(description);
        content.appendChild(publishedAt);
        content.appendChild(fullArticleLink);

        card.appendChild(content);

        const imageContainer = document.createElement('div');
        imageContainer.classList.add('news-image');

        const image = document.createElement('img');
        image.src = news.urlToImage;
        image.alt = news.title;

        imageContainer.appendChild(image);

        card.appendChild(imageContainer);

        return card;
    }

    // // функция для генерации случайных постеров на главной странице и работы слайдера на API кинопоиска
    // async function generateRandomPosters(numPosters) {
    //     const swiperWrapper = document.querySelector('.swiper-wrapper');
    //     let promises = [];

    //     // Выполняем запросы на получение рандомных фильмов и сохраняем их промисы
    //     for (let i = 0; i < numPosters; i++) {
    //         promises.push(getRandomMovieFromAPI());
    //     }

    //     // Дожидаемся выполнения всех промисов
    //     const responses = await Promise.all(promises);
    //     console.log(responses);

    //     // Обрабатываем каждый ответ и добавляем его в слайдер
    //     responses.forEach(data => {
    //         const moviePosterUrl = data.poster.url;
    //         swiperWrapper.innerHTML += `<div class="swiper-slide" style="background-image: url(${moviePosterUrl})"></div>`;
    //     });

    //     // Инициализируем слайдер после добавления всех постеров
    //     new Swiper('.swiper-container', {
    //         autoplay: {
    //             delay: 2500,
    //             disableOnInteraction: false,
    //         },
    //         pagination: {
    //             el: ".swiper-pagination",
    //             type: "progressbar",
    //         },
    //         direction: 'horizontal',
    //         loop: true,
    //         slidesPerView: 7,
    //         spaceBetween: 20,
    //     });
    // }

    // функция для генерации случайных постеров на главной странице и работы слайдера в дальнейшем заменить на API кинопоиска и получать рандомные постеры
    function generateRandomPosters(numPosters) { // numPosters - кол-во постеров в слайдере (можно указать любое число)
        const swiperWrapper = document.querySelector('.swiper-wrapper');
        for (let i = 0; i < numPosters; i++) {
            const posterUrl = `https://picsum.photos/200/300?random=${Math.floor(Math.random() * 1000)}`;
            swiperWrapper.innerHTML += `<div class="swiper-slide" style="background-image: url(${posterUrl})"></div>`;
        }


        new Swiper('.swiper-container', {
            autoplay: {
                delay: 2500,
                disableOnInteraction: false,
            },
            pagination: {
                el: ".swiper-pagination",
                type: "progressbar",
            },
            direction: 'horizontal',
            loop: true,
            slidesPerView: 7,
            spaceBetween: 20,
        });
    }

    // генерирую массив для получения карточек фильмов
    function generateMoviesData(numMovies) { // numMovies - кол-во фильмов на странице (можно указать любое число)
        let moviesData = [];
        for (let i = 1; i <= numMovies; i++) {
            const movie = {
                nameRu: `Фильм ${i}`,
                posterUrl: `https://picsum.photos/200/300?random=${i}`,
                year: 2020 - i % 20,
                genres: ['Жанр 1', 'Жанр 2', 'Жанр 3'],
                rating: (Math.random() * (10 - 1) + 1).toFixed(1),
                filmLength: `${Math.floor(Math.random() * 3) + 1} ч ${Math.floor(Math.random() * 60)} мин`,
                description: `Описание фильма ${i}`
            };
            moviesData.push(movie);
        }
        return moviesData;
    }

    // функция для создания карточки фильма в разделе "фильмы"
    function createMovieCard(movie) {
        const card = document.createElement('div');
        card.classList.add('movie-card');
        card.innerHTML = `
            <img src="${movie.posterUrl}" alt="${movie.nameRu}">
            <h2>${movie.nameRu}</h2>
            <p><strong>Год:</strong> ${movie.year}</p>
            <p><strong>Жанр:</strong> ${movie.genres.join(', ')}</p>
            <p><strong>Рейтинг:</strong> ${movie.rating}</p>
            <p><strong>Продолжительность:</strong> ${movie.filmLength}</p>
        `;
        card.addEventListener('click', () => showModal(movie));
        return card;
    }

    // функция для отображения карточек фильмов в разделе "фильмы"
    function renderMovies(numMovies) {
        const moviesData = generateMoviesData(numMovies);
        moviesData.forEach(movie => moviesContainer.appendChild(createMovieCard(movie)));
    }

    // функция для отображения модального окна с информацией о фильме (при клике на карточку) для страницы "фильмы"
    function showModal(movie) {
        const modal = document.createElement('div');
        modal.classList.add('modal');
        modal.innerHTML = `
        <div class="modal-content" data-movie-id="${movie.nameRu}">
            <span class="close-modal">&times;</span>
            <span class="put-to-favorites"></span>
            <div class="modal-movie-info-container">
                <img src="${movie.posterUrl}" alt="${movie.nameRu}">
                <div class="modal-movie-info">
                    <h2>${movie.nameRu}</h2>
                    <p><strong>Год:</strong> ${movie.year || year}</p>
                    <p><strong>Жанр:</strong> ${movie.genres.join(', ')}</p>
                    <p><strong>Рейтинг:</strong> ${movie.rating}</p>
                    <p><strong>Продолжительность:</strong> ${movie.filmLength}</p>
                    <p><strong>Описание:</strong> ${movie.description}</p>
                </div>
            </div>
        </div>
    `;
        modalContainer.appendChild(modal);
        modalContainer.classList.remove('hide');

        const closeModal = document.querySelector('.close-modal');

        closeModal.addEventListener('click', () => {
            modalContainer.classList.add('hide');
            modalContainer.removeChild(modal);
        });
    }

    // функция для отображения модального окна с информацией о фильме (при клике на карточку) (для главной страницы)
    function showModalfromMain(movie) {
        const genres = movie.genres.map(genre => genre.name);
        const img = movie.poster ? movie.poster.url : '';
        const ratings = movie.rating || {};

        const modal = document.createElement('div');
        modal.classList.add('modal');
        modal.innerHTML = `
        <div class="modal-content"  data-movie-id="${movie.name || movie.alternativeName}">
            <span class="close-modal">&times;</span>
            <span class="put-to-favorites"></span>
            <div class="modal-movie-info-container">
                <img src="${img}" alt="${movie.name || movie.alternativeName}">
                <div class="modal-movie-info">
                    <h2>${movie.name || movie.alternativeName}</h2>
                    <p><strong>Год:</strong> ${movie.year || 'Отсутствует'}</p>
                    <p><strong>Жанр:</strong> ${genres.join(', ').toUpperCase() || 'Отсутствует'}</p>
                    <p><strong>Рейтинг:</strong> ${Object.keys(ratings).length > 0 ? Object.entries(ratings).map(([key, value]) => `${key}: ${value}`).join(', ') : 'Отсутствует'}</p>
                    <p><strong>Продолжительность:</strong> ${movie.filmLength || 'Отсутствует'}</p>
                    <p><strong>Описание:</strong> ${movie.description || 'Отсутствует'}</p>
                </div>
            </div>
        </div>
    `;
        modalContainer.appendChild(modal);
        modalContainer.classList.remove('hide');

        const closeModal = document.querySelector('.close-modal');

        closeModal.addEventListener('click', () => {
            modalContainer.classList.add('hide');
            modalContainer.removeChild(modal);
        });
    }

    // функция для отображения карточек избранных фильмов для страницы "избранное" из локального хранилища при  перезагрузке страницы
    function renderFavoriteCards() {
        // Получаем текущий список избранных из локального хранилища
        let favorites = JSON.parse(localStorage.getItem('favorites')) || {};

        // Проходим по всем элементам избранных и создаем DOM-элементы для каждого из них
        Object.entries(favorites).forEach(([movieId, favoriteCardHTML]) => {
            const card = document.createElement('div');
            card.classList.add('card-favorite-movies');
            card.innerHTML = favoriteCardHTML;

            // Добавляем обработчик для кнопки удаления из избранного
            const delCard = document.createElement('div');
            delCard.classList.add('del-card');
            delCard.textContent = 'X';
            delCard.addEventListener('click', () => removeFromFavorites(movieId));

            card.appendChild(delCard);

            // Вставляем созданный DOM-элемент в контейнер для избранных элементов
            favoritesContainer.appendChild(card);
        });
    }

    // функция для добавления фильмов в избранное
    function addToFavorites(clone) {
        const container = document.querySelector('.favorite-movies');
        const card = document.createElement('div');
        card.classList.add('card-favorite-movies');
        card.insertAdjacentHTML('afterbegin', clone);
        container.appendChild(card);
        card.dataset.movieId = (Math.random() * 1000).toFixed(0);
        movieId = card.dataset.movieId;

        // Удаляем первые два дочерних элемента из добавленной карточки
        const children = card.children;
        for (let i = 0; i < 2; i++) {
            if (children.length > 0) {
                card.removeChild(children[0]);
            }
        }

        const delCard = document.createElement('div');
        delCard.classList.add('del-card');
        delCard.textContent = 'X';
        card.appendChild(delCard);

        addToFavoritesLocalStorage(movieId, card.outerHTML);
    }

    // функция для добавления фильмов в избранное на локальное хранилища
    function addToFavoritesLocalStorage(movieId, favoriteCardHTML) {
        // Получаем текущий список избранных из локального хранилища
        let favorites = JSON.parse(localStorage.getItem('favorites')) || {};

        // Добавляем новую карточку в список избранных по ключу movieId
        favorites[movieId] = favoriteCardHTML;

        // Сохраняем обновленный список избранных в локальное хранилище
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }

    // функция для удаления фильмов из избранного с локального хранилища
    function removeFromFavorites(movieId) {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || {};
        delete favorites[movieId];
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }

    // добавляю жанры для поиска пока из массива genres 
    genres.forEach(genre => {
        const option = document.createElement('option');
        option.value = genre.toLowerCase();
        option.textContent = genre;
        searchGenreSelect.appendChild(option);
    });

    // обработчики событий для меню главной страницы 
    header.addEventListener('click', (event) => {
        const target = event.target;
        if (target.tagName === "A" && target.dataset.target) {
            const targetId = target.dataset.target;
            sections.forEach(section => {
                section.classList.toggle('hide', section.id !== targetId);
            });
        }
    });

    // обработчики событий для слайдера фильмов на главной странице, по клику на карточку будет открываться модальное окно с информацией о фильме загруженное с API
    swiperWrapper.addEventListener('click', (event) => {
        const target = event.target;
        if (target.classList.contains('swiper-slide')) {
            getRandomMovieFromAPI();
        }
    });

    // обработчики событий  модального окна для добовления в избранное
    modalContainer.addEventListener('click', (event) => {
        const btnFavorite = event.target.closest('.put-to-favorites');
        if (btnFavorite) {
            if (btnFavorite.style.backgroundColor === 'white') {
                btnFavorite.style.backgroundColor = 'goldenrod';
                btnFavorite.classList.add('star');
                const parentElem = btnFavorite.parentNode.innerHTML;
                addToFavorites(parentElem);
            } else {
                btnFavorite.style.backgroundColor = 'white';
                btnFavorite.classList.remove('star');
                removeFromFavorites(movieId);
            }
        }
    });

    // обработчики событий для удаления избранного и удаления из локального хранилища
    favoritesContainer.addEventListener('click', (event) => {
        const target = event.target;
        if (target.classList.contains('del-card')) {
            const modalMovieInfoContainer = target.parentNode.querySelector('.modal-movie-info-container');
            if (modalMovieInfoContainer) {
                const movieId = modalMovieInfoContainer.dataset.movieId;
                removeFromFavorites(movieId);
            }
            target.parentNode.remove();
        }
    });




    // вызывыю функции
    renderMovies(10);
    generateRandomPosters(10);
    news();
    renderFavoriteCards();
});


// проогресс бар
window.onload = function () {
    const progressBar = document.getElementById('myBar');
    const progressContainer = document.querySelector('.progress-container');

    const documentHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    window.onscroll = function () {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollProgress = (scrollTop / documentHeight) * 100;

        progressBar.style.width = scrollProgress + "%";
    };
};