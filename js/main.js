const draggableElements = {}
const draggableDivs = document.querySelectorAll('.drag');
const wrapper = document.querySelector('.wrapper');
let activeId = null;



// init background size
const initBgSize = () =>{
  console.log('init bg size', wrapper)
  const width = window.innerWidth;
  const height = window.innerHeight;
  wrapper.style.backgroundSize = `${width}px auto`
  // also set the size for all the draggable divs
  const keys = Object.keys(draggableElements);
  keys.forEach((id) => {
    draggableElements[id].div.style.backgroundSize = `${width}px auto`
  });
}


draggableDivs.forEach((div)=>{
  // Create an object for each draggable element
  const divId = div.id
  const draggableElement = {
    div: div,
    isDragging : false,
    pos1: 0,
    pos2: 0,
    pos3: 0,
    pos4: 0,
  }
  // add it to the array
  draggableElements[divId]  = draggableElement;

  div.addEventListener('mousedown',(e)=>{
    startDrag(e)
  })
})

window.addEventListener('mouseup',(e)=>{
  stopDrag(e)
})

window.addEventListener('mousemove', (e)=>{
  drag(e)
})

const startDrag = (e)=>{
  e.preventDefault();
  const elementId = e.target.id;
  focusOnElement(elementId);
  const currentElement = draggableElements[elementId]
  currentElement.isDragging = true;
  // get the mouse cursor position at startup:
  currentElement.pos3 = e.clientX;
  currentElement.pos4 = e.clientY;
}


const drag =(e) =>{
  if(!activeId) return
  const elementId = activeId; //e.target.id;
  const currentElement = draggableElements[elementId]
  if(!currentElement.isDragging) return;
    e.preventDefault();
    // calculate the new cursor position:
    currentElement.pos1 = currentElement.pos3 - e.clientX;
    currentElement.pos2 = currentElement.pos4 - e.clientY;
    currentElement.pos3 = e.clientX;
    currentElement.pos4 = e.clientY;


    // also move the backgroundimage
    const backgroundPositionX = - (currentElement.div.offsetLeft - currentElement.pos1) + "px";
    const backroundPositionY = - (currentElement.div.offsetTop - currentElement.pos2) + "px";
    currentElement.div.style.backgroundPosition = (backgroundPositionX +" "+backroundPositionY)


    // set the element's new position:
    currentElement.div.style.top = (currentElement.div.offsetTop - currentElement.pos2) + "px";
    currentElement.div.style.left = (currentElement.div.offsetLeft - currentElement.pos1) + "px";

}

const stopDrag = (e)=>{
  const elementId = activeId //e.target.id;
  const currentElement = draggableElements[elementId]
  currentElement.isDragging = false;
  activeId = null;
}

const focusOnElement = (elementId) =>{  
  activeId = elementId
  const keys = Object.keys(draggableElements);
  keys.forEach((id) => {
      if(id == elementId){
        // Put the dragged element on the foreground
        draggableElements[id].div.classList.add('z-99');
      }else{
        // Put all other elements in the background
        draggableElements[id].div.classList.remove('z-99');
      }
  });

}


initBgSize();
