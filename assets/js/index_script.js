

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

function createNewsCard(newsItem) {
    const card = document.createElement('div');
    card.classList.add('news-card');

    const content = document.createElement('div');
    content.classList.add('news-content');

    const titleElement = document.createElement('h3');
    titleElement.textContent = newsItem.title;

    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = newsItem.description;

    const publishedAtElement = document.createElement('p');
    publishedAtElement.textContent = `Published: ${new Date(newsItem.publishedAt).toLocaleString()}`;

    const fullArticleLinkElement = document.createElement('a');
    fullArticleLinkElement.href = newsItem.url;
    fullArticleLinkElement.textContent = 'Read full article';
    fullArticleLinkElement.target = '_blank';
    fullArticleLinkElement.classList.add('read-more-link');

    content.append(titleElement, descriptionElement, publishedAtElement, fullArticleLinkElement);

    const imageContainer = document.createElement('div');
    imageContainer.classList.add('news-image');

    const imageElement = document.createElement('img');
    imageElement.src = newsItem.urlToImage;
    imageElement.alt = newsItem.title;

    imageContainer.appendChild(imageElement);

    card.append(content, imageContainer);

    return card;
}

news();
