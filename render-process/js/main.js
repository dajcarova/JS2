import {Carousel} from '../components/carousel/Carousel.js'

const carousel = new Carousel(0, 3)

fetch('http://localhost:3000/news.json')
  .then(serverResponse => serverResponse.text())
  .then(responseText => {
    const data = JSON.parse(responseText);
    carousel.populateNewsCarousel(data.articles);
  });
