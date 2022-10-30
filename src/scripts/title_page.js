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

    // const instructions = document.createElement("p");
    const instructions_text = document.createElement("p");

    // Set ids and classes on created elements
    title_container.setAttribute("id", "title_container");
    logo.setAttribute("class", "hidden");
    logo.setAttribute("id", "logo");
    logo.setAttribute("src", "resources/logo.png");
    logo.setAttribute("alt", "Poke Viser logo");

    // instructions.setAttribute("id", "instructions_title");
    instructions_text.setAttribute("id", "instructions_text");
    instructions_text.classList.add("hide");

    // Set title's class to load so it fades in
    window.setTimeout(() => {
        logo.setAttribute("class", "load");
        instructions_text.classList.remove("hide");
    }, 1000);

    // Set text describing to users how to use the website
    instructions_text.innerHTML = "Choose up to 6 Pokemon then click 'VIEW' to see base stats, descriptions, weaknesses, and sizes. Click the center ball to get started.";

    // Set ability to click on title & center circle --> leads to search page
    logo.addEventListener("click", goToSearchPage);

    // Set up the html structure
    const red = document.getElementById("red");
    red.append(logo);
    const white = document.getElementById("white");
    white.append(instructions_text);

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
