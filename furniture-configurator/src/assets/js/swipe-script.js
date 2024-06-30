function arrowClick(scrollValue){
  const card = document.querySelector('.list-view')
  card.scrollLeft+=scrollValue;
}
const leftArrow= document.getElementById("prev")
const rightArrow = document.getElementById("next")

leftArrow.addEventListener('click', () =>{
  arrowClick(-document.querySelector('.list-view').offsetWidth)
})

rightArrow.addEventListener('click', () =>{
  arrowClick(document.querySelector('.list-view').offsetWidth)
})