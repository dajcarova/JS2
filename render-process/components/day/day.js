export class Day extends HTMLElement{

  constructor(dayNumber){
    super()
    this.innerText = 'ahoj';
    this.dayNumber = dayNumber
    this.addEventListener('click', this.handleClickEvent)
  }
  handleClickEvent(){
    alert('clicked day: ', this.dayNumber)
  }

}

customElements.define('app-day', Day)