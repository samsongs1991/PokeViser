// ====================================================
// ================= I M P O R T S ====================
// ====================================================

// Helper methods
import { convertHeight } from './helpers'

// To show loading screen until POKEMON is loaded with all 898 pokemon
import { renderLoadingScreen, removeLoadingScreen } from './presentation'

// Cache of pokemon data
import { POKEMON } from './search_page'

// Cache of description and damage data for every searched pokemon
import { SELECTION_DATA } from './show_page'

// ====================================================
// =============== C O N S T A N T S ==================
// ====================================================



// ====================================================
// ===================== M A I N ======================
// ================== E X P O R T S ===================
// ====================================================

export function loadSizePage(selected_pokemon) {
    console.log(selected_pokemon);
    console.log(SELECTION_DATA);

    loadSizePage_structure();
    loadTrainer(selected_pokemon);
    loadSprites(selected_pokemon);
}

// ====================================================
// =================== H E L P E R ====================
// ================== M E T H O D S ===================
// ====================================================

// Setup html elements for size page
function loadSizePage_structure() {
    const main = document.querySelector("main");
    main.setAttribute("id", "size_page");
    main.innerHTML = "";
    const size_container = document.createElement("section");
    size_container.setAttribute("id", "size_container");
    main.appendChild(size_container);
}

// Load trainer
function loadTrainer(selected_pokemon) {
    const size_container = document.getElementById("size_container");

    let tile = document.createElement("div");
    let human = document.createElement("img");
    let info = document.createElement("p");
    let trainer_ht = 100;

    tile.setAttribute("class", "size_tile");
    human.setAttribute("src", "./resources/trainer.png");
    human.setAttribute("height", trainer_ht);
    
    info.innerHTML = `${6}ft ~ ${150}cm`

    tile.appendChild(human);
    tile.appendChild(info);
    size_container.appendChild(tile);
}

// Load sprites
function loadSprites(selected_pokemon) {
    const size_container = document.getElementById("size_container");

    for(let id in selected_pokemon.selection) {
        let tile = document.createElement("div");
        let sprite_img = document.createElement("img");
        let info = document.createElement("p");

        let pokemon = POKEMON[id];
        let img_url = pokemon.sprites.front_default;
        let img_ht = pokemon.height * 30;
        info.innerHTML = `${6}ft ~ ${150}cm`

        sprite_img.setAttribute("src", img_url);
        sprite_img.setAttribute("height", img_ht);

        tile.appendChild(sprite_img);
        tile.appendChild(info);
        size_container.appendChild(tile);
    }
}