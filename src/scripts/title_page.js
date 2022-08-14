// ====================================================
// ================= I M P O R T S ====================
// ====================================================

import { POKEMON_NAMES } from './store.js'
import {
    createPokeball, loadBackgroundVid, isChild,
    loadInitialState, cachePokemonInitialState,
    cachePokemonHtWt, cachePokemonStats,
    cachePokemonDmgRelations, cachePokemonFlavors,
} from './helpers'
import { loadHeader } from './header'
import { loadMainSearchPage } from './search_page'
import { loadFooter } from './footer'

// ====================================================
// ===================== M A I N ======================
// ================== E X P O R T S ===================
// ====================================================

export function loadTitlePage() {
    // Set body to contain nothing
    const body = document.querySelector("body");
    body.innerHTML = "";

    // Load pokeball background
    createPokeball();

    // Create all elements needed for title page
    const title_container = document.createElement("div");
    const logo = document.createElement("img");

    const instructions = document.createElement("p");
    const instructions_text = document.createElement("p");

    // Set ids and classes on created elements
    title_container.setAttribute("id", "title_container");
    logo.setAttribute("class", "hidden");
    logo.setAttribute("id", "logo");
    logo.setAttribute("src", "resources/logo.png");
    logo.setAttribute("alt", "Poke Viser logo");

    instructions.setAttribute("id", "instructions_title");
    instructions_text.setAttribute("id", "instructions_text");
    instructions_text.setAttribute("class", "hide");

    // Set title's class to load so it fades in
    window.setTimeout(() => {
        logo.setAttribute("class", "load");
    }, 1000);

    // Set text describing to users how to use the website
    instructions.innerHTML = "INSTRUCTIONS";
    instructions_text.innerHTML = "Click on the Poke Viser logo to start searching for you favorite Pokemon. Use the search bar find Pokemon. Use the filters to show Pokemon of a specific type. Choose up to 6 Pokemon and click the VIEW button to learn about your selected Pokemon.";

    // Set ability to click on title & center circle --> leads to search page
    logo.addEventListener("click", goToSearchPage);

    // Set ability to hover or click on INSTRUCTIONS --> reveal/hide instructions text
    instructions.addEventListener("click", () => {
        instructions_text.classList.contains("hide") ?
        instructions_text.classList.remove("hide") :
        instructions_text.setAttribute("class", "hide")
    });

    // Set up the html structure
    const red = document.getElementById("red");
    red.append(logo);
    const white = document.getElementById("white");
    white.append(instructions, instructions_text);
    // body.appendChild(title_container);
    // title_container.appendChild(logo);

    // title_container.appendChild(instructions);
    // title_container.appendChild(instructions_text);

    // On window resize, below certain window.innerHeight remove instructions
    // window.onresize = () => {
    //     if(window.innerHeight < 300) {
    //         if(isChild(title_container, instructions)) {
    //             title_container.removeChild(instructions);
    //             title_container.removeChild(instructions_text);
    //         }
    //     } else {
    //         title_container.appendChild(instructions);
    //         title_container.appendChild(instructions_text);
    //     }
    // }

    // Cache pokemon data
    if(POKEMON_NAMES.size === 0) {
        loadInitialState(POKEMON_NAMES);
        cachePokemonInitialState(POKEMON_NAMES);
        cachePokemonHtWt(POKEMON_NAMES);
        cachePokemonStats(POKEMON_NAMES);
        cachePokemonDmgRelations(POKEMON_NAMES);
        cachePokemonFlavors(POKEMON_NAMES);
    }
}

export function goToSearchPage() {
    const body = document.querySelector("body");
    body.innerHTML = "";
    loadBackgroundVid();
    loadHeader();
    loadMainSearchPage();
    loadFooter();
}
