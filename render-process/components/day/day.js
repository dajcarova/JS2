export class Day extends HTMLElement{

  constructor(date){
    super()
    this.innerHTML = `
      <div id="day"></div>
    `;
    this.date = date
    this.dayNumber = date.getDate()
    // this.date.getDay()
    this.querySelector('#day').innerText = this.dayNumber
    this.addEventListener('click', this.handleClickEvent)
  }

  getDayName(){
    switch(this.date.getDay()){
      case 0:
        return 'Sunday'
      case 1:
        return 'Monday'
      case 2:
        return 'Tuesday'
      case 3:
        return 'Wednesday'
      case 4:
        return 'Thursday'
      case 5:
        return 'Friday'
      case 6:
        return 'Saturday'
      
    }
  }

  handleClickEvent(){
    window.showModal(this.date)
  }

}

customElements.define('app-day', Day)