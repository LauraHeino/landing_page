

// Global variable definition

const allSections = document.querySelectorAll('section'); // select all section elements
const navBar = document.querySelector('.navbar__menu'); 
const toTopButton = document.getElementById("toTopBtn"); // button to scroll to back top


// FUNCTIONS

// helper function to check if an element is near the top of viewport

function isAtTop(element) {                         
    const rect = element.getBoundingClientRect();
    return (rect.top <= 40);
}


// Add nav items dynamically

function createNavItem(section) {     
    const linkTarget = `#${section.id}`;
    const listElem = document.createElement('li');
    const aElem = document.createElement('a');
    const title = section.getAttribute('data-nav');
    aElem.textContent = title;
    
    aElem.setAttribute('href', linkTarget);
    aElem.setAttribute('class', `menu__link ${section.id}`);
    
    listElem.appendChild(aElem);
    
    listElem.addEventListener('click', (e) => {              //add event listener to each item upon creation
        e.preventDefault();
        document.getElementById(`${section.id}`).scrollIntoView(({behavior: 'smooth'}));
     });
  
    return listElem;
}

// Populate nav bar with created items

function buildNav() {

    for (const section of allSections) {
        const navBar = document.getElementById('navbar__list');
        const navItem = createNavItem(section);
        navBar.appendChild(navItem);
    }
}


buildNav();

// Add class 'active' to section when near top of viewport

function setActive(element) {
    if (isAtTop(element)) {
        element.classList.add('active');
    }
    else {
        element.classList.remove('active');
    }    
    
}
 

// Hide return button until user has reached the bottom of page, by checking how far from the top they are


window.onscroll = function() {
    const page = document.documentElement;
    const offset = page.scrollTop + window.innerHeight;
    const height = page.offsetHeight;
  
    if (height - offset < 200) {
        toTopButton.style.display = "block";
    } else {
      toTopButton.style.display = "none";
    }
  };


 // Make page smoothly scroll to the top on click

function scrollToTop () {
    const distance = document.documentElement.scrollTop || document.body.scrollTop;
    if (distance > 0) {
      window.requestAnimationFrame(scrollToTop);
      window.scrollTo(0, distance - distance / 15);
    }
  };


// Event listener for adding the class 'active' to the topmost element

window.addEventListener('scroll', () => {                   
    for (let i = 0; i < allSections.length; i++) {
        setActive(allSections[i]);
    }
});


/* Functionality to hide nav bar when user scrolls down and display it when scrolling up by
comparing previous and current scroll positions */

let prevPosition = 0;

window.addEventListener("scroll", () => { 
    let currentPosition = window.pageYOffset || document.documentElement.scrollTop; 
        if (currentPosition > prevPosition){
        navBar.style.display = "none";
        } else {
        navBar.style.display = "block";
        }
        prevPosition = currentPosition <= 0 ? 0 : currentPosition; 
});

