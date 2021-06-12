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

const currentDate = new Date();
const maxDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();


  for(let i = 0; i <= maxDate; i++){
    const dayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), i)
    main.appendChild(new Day(dayDate))
  }

console.log('work')

const buttonOpenModal = document.querySelector('.open-modal')
const modalContainer = document.querySelector('.modal-container')
buttonOpenModal.addEventListener('click', () =>{
  modalContainer.hidden = false
})