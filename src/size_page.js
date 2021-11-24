// ====================================================
// ================= I M P O R T S ====================
// ====================================================

// Helper methods
import { convertHeight } from './helpers'

// Cache of pokemon data
import { POKEMON } from './search_page'

// ====================================================
// ===================== M A I N ======================
// ================== E X P O R T S ===================
// ====================================================

export function loadSizePage(selected_pokemon) {
    loadSizePage_structure();
    loadTrainer(selected_pokemon);
    loadSprites(selected_pokemon);

    const minus = document.getElementById("minus");
    const plus = document.getElementById("plus");
    minus.addEventListener("click", () => magnify("minus"));
    plus.addEventListener("click", () => magnify("plus"));
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
    const minus = document.createElement("button");
    const plus = document.createElement("button");

    size_container.setAttribute("id", "size_container");
    minus.setAttribute("id", "minus");
    plus.setAttribute("id", "plus");

    minus.innerHTML = " - ";
    plus.innerHTML = " + ";

    main.appendChild(size_container);
    main.appendChild(minus);
    main.appendChild(plus);
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
    human.setAttribute("height", 175);
    
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
        let img_ht = (ft * 200) / 5.5;

        info.innerHTML = `${ft} ft`

        tile.setAttribute("class", "size_tile");
        sprite_img.setAttribute("class", "pokemon");
        sprite_img.setAttribute("src", img_url);
        sprite_img.setAttribute("height", img_ht);

        tile.appendChild(sprite_img);
        tile.appendChild(info);
        size_container.appendChild(tile);
    }
}

// Click handler for plus/minus image size
function magnify(type) {
    const trainer = document.getElementsByClassName("trainer");
    const pokemon = document.getElementsByClassName("pokemon");

    let increment = 10;
    const ratio = increment / trainer[0].height

    if(type === "minus") {
        trainer[0].height -= increment;
    } else if(type === "plus") {
        trainer[0].height += increment;
    }

    pokemon.forEach(poke => {
        increment = poke.height * ratio;
        if(type === "minus") {
            poke.height -= increment;
        } else if(type === "plus") {
            poke.height += increment;
        }
    });
}