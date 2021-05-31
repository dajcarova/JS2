export class NewsArticle extends HTMLElement{

  constructor(newsItem){
    // means that we call a constructor of parent class
    super()
    this.classList.add('news-article')
    this.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, .5), transparent), url(${newsItem.image})`

    const title = document.createElement('span');
    title.classList.add('news-article__title')
    this.innerText = newsItem.title;

    this.appendChild(title)
  }
}

customElements.define('app-news-article', NewsArticle)

