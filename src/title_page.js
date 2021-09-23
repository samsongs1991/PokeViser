// For loadTitlePage
import { createPokeball } from './presentation'

// For goToSearchPage
import { loadBackgroundVid } from './presentation'
import { loadHeader } from './header'
import { loadMainSearchPage } from './search_page'
import { loadFooter } from './footer'

export function loadTitlePage() {
    // Create all elements needed for title page
    const body = document.querySelector("body");
    const outer_container = document.createElement("div");
    const title_container = document.createElement("div");
    const title = document.createElement("img");
    const instructions_container = document.createElement("div");
    const instructions = document.createElement("p");
    const instructions_text = document.createElement("p");

    // Set body to contain nothing
    body.innerHTML = ""; 
    
    // Set ids and classes on created elements
    outer_container.setAttribute("id", "outer_container");
    title_container.setAttribute("id", "title_container");
    title.setAttribute("class", "hidden");
    title.setAttribute("id", "title");
    title.setAttribute("src", "resources/pokeviser_img.png");
    title.setAttribute("alt", "Poke Viser logo");
    instructions_container.setAttribute("id", "instructions_container");
    instructions.setAttribute("id", "instructions");
    instructions_text.setAttribute("id", "instructions_text");

    // Set title's class to load so it fades in
    window.setTimeout(() => {
        title.setAttribute("class", "load");
    }, 1000);
    
    // Set text describing to users how to use the website
    instructions.innerHTML = "INSTRUCTIONS";
    instructions_text.innerHTML = "Click on the Poke Viser logo to start searching for you favorite Pokemon. Use the search bar to input the name of a Pokemon. Use the filters to tell the auto suggestor to only display Pokemon of a type you have selected. You can select up to 6 Pokemon to view and when you are ready click the VIEW STATS button to learn all about the Pokemon you selected.";
    
    // Set ability to click on title --> leads to search page
    title.addEventListener("click", goToSearchPage);
    
    // Set up the html structure
    body.appendChild(outer_container);
    outer_container.appendChild(title_container);
    outer_container.appendChild(instructions_container);
    title_container.appendChild(title);
    instructions_container.appendChild(instructions);
    instructions_container.appendChild(instructions_text);
    
    // Load pokeball background
    createPokeball();
}

export function goToSearchPage() {
    const body = document.querySelector("body");
    body.innerHTML = ""; 
    loadBackgroundVid();
    loadHeader();
    loadMainSearchPage();
    loadFooter();
}