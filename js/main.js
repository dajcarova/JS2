const header = document.querySelector('.header-news__container');
let carouselItemStart = 0
let articles;

const carouselItemCount = 3;

fetch('http://localhost:3000/news.json')
  .then(serverResponse => serverResponse.text())
  .then(responseText => {
    const data = JSON.parse(responseText);
    articles = data.articles;
    populateNewsCarousel(data.articles, 0);
  });

function populateNewsCarousel(news, startAt){
  header.innerText = ''
  for(let i = startAt; i < startAt + carouselItemCount; i++){
    let newsArticle = createDivForNews(news[i])
    header.appendChild(newsArticle)
  }
}

function createDivForNews(newsItem){
  const newsArticle = document.createElement('div');
  const title = document.createElement('span');
  title.classList.add('news-article__title')
  newsArticle.classList.add('news-article')
  newsArticle.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, .5), transparent), url(${newsItem.image})`
  newsArticle.innerText = newsItem.title;
  newsArticle.appendChild(title)
  return newsArticle;
}


const btnPrev = document.querySelector('#carousel-button-prev')
const btnNext = document.querySelector('#carousel-button-next')



btnPrev.addEventListener('click', () => {
  carouselItemStart --;
  populateNewsCarousel(articles, carouselItemStart);
})

btnNext.addEventListener('click', () => {
  carouselItemStart ++;
  populateNewsCarousel(articles, carouselItemStart);
});