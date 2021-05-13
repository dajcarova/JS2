import {NewsArticle} from '../components/news-article/NewsArticle.js'

const header = document.querySelector('.header-news__container');
let carouselItemStart = 0
let articles;
const btnPrev = document.querySelector('#carousel-button-prev')
const btnNext = document.querySelector('#carousel-button-next')

const carouselItemCount = 3;

fetch('http://localhost:3000/news.json')
  .then(serverResponse => serverResponse.text())
  .then(responseText => {
    const data = JSON.parse(responseText);
    articles = data.articles;
    populateNewsCarousel(data.articles, 0);
  });
function checkButtonsVisibility(){
  if(carouselItemStart === 0){
    btnPrev.style.display = 'none';
  }
  else if(carouselItemStart >= (articles.length - carouselItemCount)){
    btnNext.style.display = 'none';
  }
  else{
    btnPrev.style.display = 'block';
    btnNext.style.display = 'block';
  }
}

function populateNewsCarousel(news, startAt){
  header.innerText = ''
  for(let i = startAt; i < startAt + carouselItemCount; i++){
    let newsArticle = new NewsArticle()
    header.appendChild(newsArticle.createDivForNews(news[i]))
  }
  checkButtonsVisibility()
}

btnPrev.addEventListener('click', () => {
  carouselItemStart --;
  populateNewsCarousel(articles, carouselItemStart);
})

btnNext.addEventListener('click', () => {
  carouselItemStart ++;
  populateNewsCarousel(articles, carouselItemStart);
});

