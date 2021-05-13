export class NewsArticle {
  createDivForNews(newsItem){
    const newsArticle = document.createElement('div');
    const title = document.createElement('span');
    title.classList.add('news-article__title')
    newsArticle.classList.add('news-article')
    newsArticle.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, .5), transparent), url(${newsItem.image})`
    newsArticle.innerText = newsItem.title;
    newsArticle.appendChild(title)
    return newsArticle;
  }
}

