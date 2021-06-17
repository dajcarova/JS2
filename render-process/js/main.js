import {Carousel} from '../components/carousel/Carousel.js'
import {Day} from '../components/day/Day.js'

window.showLoader = showLoader;
window.hideLoader = hideLoader;
function showLoader() {
    document.body.appendChild(document.querySelector('#loaderTemplate').content.cloneNode(true));
}
function hideLoader() {
    document.body.removeChild(document.querySelector('.loader'));
}
function showToaster(success, title, message) {
    const toasterTemplate = document.querySelector('#toasterTemplate').content.cloneNode(true);
    const toasterElement = toasterTemplate.querySelector('.toaster');
    toasterElement.addEventListener('click', () => document.body.removeChild(toasterElement));
    toasterElement.classList.add(success ? 'success' : 'error');
    toasterTemplate.querySelector('h1').innerText = title;
    toasterTemplate.querySelector('p').innerText = message;
    document.body.appendChild(toasterTemplate);
    setTimeout(() => {
        try {
            document.body.removeChild(toasterElement);
        } catch(e) {
            console.warn('Toaster already removed');
        }
    }, 3000);
}


const carousel = document.querySelector('app-carousel')

fetch('http://localhost:3000/calendar')
    .then(serverResponse => serverResponse.text())
    .then(responseText => {
      const data = JSON.parse(responseText);
    })

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



function showDayModal(dayDate) {

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
      const data = formData.entries()

      const object = { 
        date: dayDate
      }

      for(let formValue of data){
        const key = formValue[0]
        const value = formValue[1]
        object[key] = value
      }

      showLoader()

      fetch('http://localhost:3000/calendar', {
          method: 'POST',
          body: JSON.stringify(object),
          header: {
            'Content-Type': 'application/json'
          }
        }
      )
        .then(response =>{
          hideLoader()
          console.log(response)
          if(response.status === 200){
            
            showToaster(true, 'Data Ulozeny', 'Vase udalost byla ulozena.');
            fetch('http://localhost:3000/calendar')
            .then(serverResponse => serverResponse.text())
            .then(responseText => {
                const events = JSON.parse(responseText);
                const days = document.querySelectorAll('app-day');

                const eventValues = Object.values(events);

                eventValues.forEach(event => {
                    for (let day of days) {
                        const eventDate = new Date(event.date);
                        const dayDate = day.date;
                        // eventDate.toDateString()
                        // v pripade ze sa rovna eventDate a dayDate -> nastavit event
                        console.log(eventDate.toDateString(), eventDate.toDateString() === dayDate.toDateString())
                    }
                });
                    

              console.log(events)
            })
          } else{
            showToaster(false, 'Error', 'server neni dostupny')
          }
        })
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

let contactsArray

fetch('http://localhost:3000/contacts')
    .then(serverResponse => serverResponse.text())
    .then(responseText => {
      contactsArray = JSON.parse(responseText);
      createOptions(contactsArray)
    })

    // itterating object
    const radioButtons = document.querySelectorAll('#genderSelectRow > input')

    for(let radio of radioButtons) {
      radio.addEventListener('change', () => {
        const formRef = document.querySelector('#modal-form')
        const formData = new FormData(formRef)
        const gender = formData.get('gender')
        const filteredContacts = contactsArray.filter(contact => {
          return contact.gender === gender
        })
        createOptions(filteredContacts)
      })
    }
}

function createOptions(contactsArray){
  const select = document.querySelector('#eventAttendees')

  const oldOptions = document.querySelectorAll('.old')

  oldOptions.forEach(opt => {
    select.removeChild(opt)
  })

  contactsArray.forEach(it => {
      const option = document.createElement('option');
      option.setAttribute('value', it.id);
      option.innerText = `${it.first_name} ${it.last_name}`;
      option.classList.add('old')
      select.appendChild(option);
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