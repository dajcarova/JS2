import {Carousel} from '../components/carousel/Carousel.js'
import {Day} from '../components/day/Day.js'

const carousel = document.querySelector('app-carousel')

fetch('http://localhost:3000/news.json')
  .then(serverResponse => serverResponse.text())
  .then(responseText => {
    const data = JSON.parse(responseText);
    carousel.populateNewsCarousel(data.articles);
  });

  const main = document.querySelector('.main-content');

function createCalendar(){
  for(let i = 0; i < 31; i++){
    const day = new Day(i + 1);
    // let day = createDivForCalendar(i + 1)
    main.appendChild(day)
  }
}

function createDivForCalendar(n){
  const day = document.createElement('div');
  day.classList.add('main-content__day')
  day.innerText = n;
  return day;
}

createCalendar()

console.log('work')