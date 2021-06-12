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



function showDayModal() {
  const template = document.querySelector('#modal-template');
  const modal = template.content.cloneNode(true);
  const closeAction = () => {
      const child = document.querySelector('section.modal-container');
      document.body.removeChild(child);
      
  };
  modal.querySelector('#close-modal').addEventListener('click', closeAction);
  const cancelButton = modal.querySelector('#cancel-button');
  
  cancelButton.addEventListener('click', closeAction);
  modal.querySelector('#save-button').addEventListener('click', () => {
      const formRef = document.querySelector('#modal-form');
      const formData = new FormData(formRef);
      const isHoliday = formData.get('isHolidayControl') === 'on';
      
  });


  const checkbox = modal.querySelector('#limitAttendeesByGender')
  const row = modal.querySelector('#genderSelectRow')
  checkbox.addEventListener('change', (event) => {
    if (event.target.checked){
      row.classList.remove('hidden')
    } else {
      row.classList.add('hidden')
    }
  })
  
  document.body.appendChild(modal);


fetch('http://localhost:3000/contacts')
    .then(serverResponse => serverResponse.text())
    .then(responseText => {
      const data = JSON.parse(responseText);
      const select = document.querySelector('#eventAttendees')

      data.forEach(it => {
          const option = document.createElement('option');
          option.setAttribute('value', it.id);
          option.innerText = `${it.first_name} ${it.last_name}`;
          select.appendChild(option);
      })

    })
}

window.showModal = showDayModal

// homework 5

let userInput = []
document.addEventListener('keydown', (keyboardEvent) => {

  
  userInput.push(keyboardEvent.key)

  if((userInput.toString()).indexOf('t,i,m,e') > -1){
    showTimeModal()
    userInput = []
  }

  // heslo = clock
  if((userInput.toString()).indexOf('c,l,o,c,k') > -1){
    showTimeModal()
    userInput = []
  }
  console.log(userInput.toString())
})



function showTimeModal(){
  const clockTemplate = document.querySelector('#clock-template');
  const clock = clockTemplate.content.cloneNode(true);
  document.body.appendChild(clock);
  const clockContainer = document.querySelector('.clock-container');
   

  for(let i = 0; i < 5; i++){
    setTimeout(
      () => {
        let clockTime = new Date()
   
        clockContainer.innerText = clockTime.toLocaleTimeString();
      },
      i * 1000,
     );
  }

  setTimeout(
    () => {
      document.body.removeChild(clockContainer);
    },
    5000,
   );

}

// end of homework 5