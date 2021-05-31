import {NewsArticle} from '../news-article/NewsArticle.js'

export class Carousel extends HTMLElement {
  constructor(
    carouselItemStart = 0,
    carouselItemCount = 3
  ){
    super()
    this.innerHTML = `
    <header class="header-news">
      <div class="header-news__container"></div>
      <button id="carousel-button-prev" class="button">
        <i class="fas fa-chevron-left"></i>
      </button>
      <button id="carousel-button-next" class="button button--next">
        <i class="fas fa-chevron-right"></i>
      </button>
    </header>
    `
    this.carouselItemCount = carouselItemCount
    this.carouselItemStart = carouselItemStart
    this.header = document.querySelector('.header-news__container')
    this.articles
    this.btnPrev = document.querySelector('#carousel-button-prev')
    this.btnNext = document.querySelector('#carousel-button-next')

    this.btnPrev.addEventListener('click', () => {
      this.carouselItemStart --;
      this.populateNewsCarousel(this.articles, this.carouselItemStart);
    })
    
    this.btnNext.addEventListener('click', () => {
      this.carouselItemStart ++;
      this.populateNewsCarousel(this.articles, this.carouselItemStart);
    });
  }
  
  checkButtonsVisibility(){
    if(this.carouselItemStart === 0){
      this.btnPrev.style.display = 'none';
    }
    else if(this.carouselItemStart >= (this.articles.length - this.carouselItemCount)){
      this.btnNext.style.display = 'none';
    }
    else{
      this.btnPrev.style.display = 'block';
      this.btnNext.style.display = 'block';
    }
  }
  
  populateNewsCarousel(news){
    this.articles = news
    this.header.innerText = ''
    for(let i = this.carouselItemStart; i < this.carouselItemStart + this.carouselItemCount; i++){
      // const newsArticle = new NewsArticle(news[i])
      this.header.appendChild(new NewsArticle(news[i]))
    }
    this.checkButtonsVisibility()
  }
}

customElements.define('app-carousel', Carousel)


