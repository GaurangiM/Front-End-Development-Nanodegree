/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

//Define Global Variables
const nav_bar=document.getElementsByClassName('navbar__menu');
const nav_list=document.getElementById('navbar__list');
const section_list=document.querySelectorAll('section');
let i=1;
// End Global Variables

section_list.forEach(element =>{
    // Build menu
    const list_item=document.createElement('li');
    list_item.innerHTML=`<a href="#${element.id}" onClick="addMenuLinkClass(this,event)">`+'Section ' +i+`</a>`;
    i++;
    nav_list.appendChild(list_item);
    list_item.addEventListener('click',function(event){
        event.preventDefault();

        // Scroll to section on link click
        element.scrollIntoView({behavior: 'smooth'});
    });

    // Set sections as active
    window.addEventListener("scroll", function () {

        // Add class 'active' to section when near top of viewport
        if (isInViewport(element)) {
            element.classList.add("active-class");
            removeActiveClass(element);
        }
    });
})

const removeActiveClass=(el)=>{
    section_list.forEach(sec=>{
        if(sec!=el)
        sec.classList.remove("active-class");
    })
}

var isInViewport = (elem) => {
    var bounding = elem.getBoundingClientRect();
    return (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};

//Start Helper Functions
const addMenuLinkClass=(element,event)=>{
    element.classList.add("menu__link");
    const links=document.querySelectorAll("a");
    for(let i=0;i<links.length;i++)
    {
        if(element!=links[i])
            links[i].classList.remove("menu__link");
    }
}