// ====================================================
// ================= I M P O R T S ====================
// ====================================================

// For loadTitlePage
import { createPokeball } from './presentation'

// For goToSearchPage
import { loadBackgroundVid } from './presentation'
import { loadHeader } from './header'
import { cachePokemon, loadMainSearchPage, POKEMON } from './search_page'
import { loadFooter } from './footer'

// ====================================================
// ===================== M A I N ======================
// ================== E X P O R T S ===================
// ====================================================

export function loadTitlePage() {
    // Create all elements needed for title page
    const body = document.querySelector("body");
    const title_container = document.createElement("div");
    const logo = document.createElement("img");
    const instructions = document.createElement("p");
    const instructions_text = document.createElement("p");

    // Set body to contain nothing
    body.innerHTML = ""; 
    
    // Set ids and classes on created elements
    title_container.setAttribute("id", "title_container");
    logo.setAttribute("class", "hidden");
    logo.setAttribute("id", "logo");
    logo.setAttribute("src", "resources/pokeviser_img.png");
    logo.setAttribute("alt", "Poke Viser logo");
    instructions.setAttribute("id", "instructions_title");
    instructions_text.setAttribute("id", "instructions_text");

    // Set title's class to load so it fades in
    window.setTimeout(() => {
        logo.setAttribute("class", "load");
    }, 1000);
    
    // Set text describing to users how to use the website
    instructions.innerHTML = "INSTRUCTIONS";
    instructions_text.innerHTML = "Click on the Poke Viser logo to start searching for you favorite Pokemon. Use the search bar to input the name of a Pokemon. Use the filters to tell the auto suggestor to only display Pokemon of a type you have selected. You can select up to 6 Pokemon to view and when you are ready click the VIEW STATS button to learn all about the Pokemon you selected.";
    
    // Set ability to click on title --> leads to search page
    logo.addEventListener("click", goToSearchPage);
    
    // Set up the html structure
    body.appendChild(title_container);
    title_container.appendChild(logo);
    title_container.appendChild(instructions);
    title_container.appendChild(instructions_text);
    
    // Load pokeball background
    createPokeball();
}

export function goToSearchPage() {
    cachePokemon(POKEMON);
    const body = document.querySelector("body");
    body.innerHTML = ""; 
    loadBackgroundVid();
    loadHeader();
    loadMainSearchPage();
    loadFooter();
}