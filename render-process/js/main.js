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


const openModalButton = document.querySelector('.open-modal')
openModalButton.addEventListener('click', ()=>{
  showDayModal().then((result) => console.log(result))
  
})

function showDayModal(){

  const promiseResult = new Promise((resolve, reject) => {

    const template = document.querySelector('#modal-template')
    const modal = template.content.cloneNode(true)

    const closeAction = () => {
      document.body.removeChild(document.querySelector('section.modal-container'))
      resolve(null)
    }

    modal.querySelector('#close-modal').addEventListener('click', closeAction)

    modal.querySelector('#cancel-button').addEventListener('click', closeAction)

    modal.querySelector('#save-button').addEventListener('click', () => {
      const formRef = document.querySelector('#modal-form')

      const formData = new FormData(formRef)
      const isHoliday = formData.get('isHoliday') === 'on'
      resolve('ahoj')
    })

    document.body.appendChild(modal)
  })

  return promiseResult
}
