// ====================================================
// ================= I M P O R T S ====================
// ====================================================

// Helper methods
import { capitalize, convertHeight } from './helpers'

// Cache of pokemon data
import { POKEMON_NAMES, SELECTED_POKEMON } from './store.js'

// ====================================================
// =============== C O N S T A N T S ==================
// ====================================================

// Original image heights
const IMAGE_HTS = { trainer: 400 };

// ====================================================
// ===================== M A I N ======================
// ================== E X P O R T S ===================
// ====================================================

export function loadSizePage() {
    loadSizePageStructure();
    loadTrainer();
    loadSprites();
}

// ====================================================
// =================== H E L P E R ====================
// ================== M E T H O D S ===================
// ====================================================

// Setup html elements for size page
function loadSizePageStructure() {
    const main = document.querySelector("main");
    main.setAttribute("id", "size_page");
    main.innerHTML = "";

    const size_container = document.createElement("section");
    const slider_container = document.createElement("div");
    const slider = document.createElement("input");

    size_container.setAttribute("id", "size_container");
    slider.setAttribute("id", "slider");
    slider.setAttribute("type", "range");
    slider.setAttribute("min", 10);
    slider.setAttribute("max", 150);
    slider.setAttribute("value", 100);

    main.appendChild(slider_container);
    main.appendChild(size_container);
    slider_container.appendChild(slider);

    slider.addEventListener("input", e => magnify(e.target.value));
}

// Load trainer
function loadTrainer() {
    const size_container = document.getElementById("size_container");

    let tile = document.createElement("div");
    let human = document.createElement("img");
    let name = document.createElement("p");
    let info = document.createElement("p");

    tile.setAttribute("class", "size_tile");
    human.setAttribute("class", "trainer");
    human.setAttribute("src", "resources/trainer.png");
    human.setAttribute("height", IMAGE_HTS.trainer);
    
    name.innerHTML = "Trainer";
    info.innerHTML = `5.5 ft`;

    tile.appendChild(human);
    tile.appendChild(name);
    tile.appendChild(info);
    size_container.appendChild(tile);
}

// Load sprites
function loadSprites() {
    const size_container = document.getElementById("size_container");

    for(let id in SELECTED_POKEMON.selection) {
        let tile = document.createElement("div");
        let sprite_img = document.createElement("img");
        let name = document.createElement("p");
        let info = document.createElement("p");

        let pokemon = POKEMON_NAMES[id];
        let img_url = pokemon.sprite_url;
        const ft = convertHeight(pokemon.height);
        let img_ht = (ft * 650) / 5.5;

        IMAGE_HTS[id] = img_ht;

        name.innerHTML = capitalize(pokemon.name);
        info.innerHTML = `${ft} ft`

        tile.setAttribute("class", "size_tile");
        sprite_img.setAttribute("id", id)
        sprite_img.setAttribute("class", "pokemon");
        sprite_img.setAttribute("src", img_url);
        sprite_img.setAttribute("height", img_ht);

        tile.appendChild(sprite_img);
        tile.appendChild(name);
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