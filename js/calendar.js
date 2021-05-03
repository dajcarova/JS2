const main = document.querySelector('.main-content');

function createCalendar(){
  for(let i = 0; i < 31; i++){
    let day = createDivForCalendar(i + 1)
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