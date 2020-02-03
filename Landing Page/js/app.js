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

// End Global Variables

for(let i=0;i<section_list.length;i++)
{
    // Build menu
    const list_item=document.createElement('li');
    list_item.innerHTML=`<a href="#${section_list[i].id}" onClick="addMenuLinkClass(this,event)">`+'Section ' +(i+1)+`</a>`;
    nav_list.appendChild(list_item);
    list_item.addEventListener('click',function(event){
        event.preventDefault();

        // Scroll to section on link click
        section_list[i].scrollIntoView({behavior: 'smooth'});
    });

    var isInViewport = function (elem) {
        var bounding = elem.getBoundingClientRect();
        return (
            bounding.top >= 0 &&
            bounding.left >= 0 &&
            bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    };

    // Set sections as active
    window.addEventListener("scroll", function () {

        // Add class 'active' to section when near top of viewport
        if (isInViewport(section_list[i])) {
            section_list[i].classList.add("active-class");
        }
    });
}

//Start Helper Functions
function addMenuLinkClass(element,event){
    element.classList.add("menu__link");
    const links=document.querySelectorAll("a");
    console.log(element);
    console.log(event.target);
    for(let i=0;i<links.length;i++)
    {
        console.log(links[i]);
        if(element!=links[i])
            links[i].classList.remove("menu__link");

    }
}