// ====================================================
// ================= I M P O R T S ====================
// ====================================================

// Helper methods
import { convertHeight } from './helpers'

// Cache of pokemon data
import { POKEMON } from './search_page'

// ====================================================
// =============== C O N S T A N T S ==================
// ====================================================

// Original image heights
const IMAGE_HTS = { trainer: 600 };

// ====================================================
// ===================== M A I N ======================
// ================== E X P O R T S ===================
// ====================================================

export function loadSizePage(selected_pokemon) {
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
    const slider = document.createElement("input");

    size_container.setAttribute("id", "size_container");
    slider.setAttribute("id", "slider");
    slider.setAttribute("type", "range");
    slider.setAttribute("min", 10);
    slider.setAttribute("max", 200);
    slider.setAttribute("value", 100);

    main.appendChild(size_container);
    main.appendChild(slider);

    slider.addEventListener("input", e => magnify(e.target.value));
}

// Load trainer
function loadTrainer(selected_pokemon) {
    const size_container = document.getElementById("size_container");

    let tile = document.createElement("div");
    let human = document.createElement("img");
    let info = document.createElement("p");

    tile.setAttribute("class", "size_tile");
    human.setAttribute("class", "trainer");
    human.setAttribute("src", "./resources/trainer.png");
    human.setAttribute("height", IMAGE_HTS.trainer);
    
    info.innerHTML = `5.5 ft`

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
        const ft = convertHeight(pokemon.height);
        let img_ht = (ft * 800) / 5.5;

        IMAGE_HTS[id] = img_ht;

        info.innerHTML = `${ft} ft`

        tile.setAttribute("class", "size_tile");
        sprite_img.setAttribute("id", id)
        sprite_img.setAttribute("class", "pokemon");
        sprite_img.setAttribute("src", img_url);
        sprite_img.setAttribute("height", img_ht);

        tile.appendChild(sprite_img);
        tile.appendChild(info);
        size_container.appendChild(tile);
    }
}

// Click handler for plus/minus image size
function magnify(percent) {
    const trainer = document.getElementsByClassName("trainer");
    const pokemon = document.getElementsByClassName("pokemon");

    let new_trainer_ht = IMAGE_HTS.trainer * (percent / 100);
    trainer[0].height = new_trainer_ht;

    pokemon.forEach(poke => {
        let new_pokemon_ht = IMAGE_HTS[poke.id] * (percent / 100);
        poke.height = new_pokemon_ht;
    });
}