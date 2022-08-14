// ====================================================
// ================= I M P O R T S ====================
// ====================================================

import { goToSearchPage } from "./title_page";

// ===============================
// ==== CUSTOM HELPER METHODS ====
// ===============================

// Creates the title_page's pokeball background
export function createPokeball() {
    // Create elements used solely for web page presentation / styling
    const pokeball = document.createElement("div");
    const red_background = document.createElement("div");
    const black_background = document.createElement("div");
    const white_background = document.createElement("div");

    const b_circle = document.createElement("div");
    const w_circle = document.createElement("div");

    b_circle.setAttribute("id", "b_circle");
    w_circle.setAttribute("id", "w_circle");

    w_circle.addEventListener("click", goToSearchPage);

    // Nest above css elements inside the body element
    const body = document.querySelector("body");
    body.appendChild(pokeball);
    pokeball.append(red_background, black_background, white_background);
    black_background.append(b_circle);
    b_circle.append(w_circle);

    // Set ids for css elements
    pokeball.setAttribute("id", "pokeball");
    red_background.setAttribute("id", "red");
    black_background.setAttribute("id", "black");
    white_background.setAttribute("id", "white");
}

// Loads blue digital background video
export function loadBackgroundVid() {
    // Create html elements
    const body = document.querySelector("body");
    const video = document.createElement("video");
    const source = document.createElement("source");

    // Set up html structure
    body.appendChild(video);
    video.appendChild(source);

    // Set attributes to play the mp4 file
    video.setAttribute("autoplay", "");
    video.setAttribute("muted", "");
    video.setAttribute("loop", "");
    video.setAttribute("id", "background_video");
    source.setAttribute("src", "resources/pokeviser_background.mp4");
    source.setAttribute("type", "video/mp4");
}

// Creates loading screen
export function renderLoadingScreen() {
    const body = document.querySelector("body")
    const loadingScreen = document.createElement("div");
    const textContainer = document.createElement("div");
    const text = document.createElement("div");

    loadingScreen.setAttribute("id", "loadingScreen");
    textContainer.setAttribute("class", "text-container");
    text.setAttribute("id", "load-text");

    text.innerHTML = "LOADING"

    body.appendChild(loadingScreen);
    loadingScreen.appendChild(textContainer);
    textContainer.appendChild(text);
}

// Removes loading screen
export function removeLoadingScreen() {
    const loadingScreen = document.getElementById("loadingScreen");
    loadingScreen.remove();
}

// Checks if node is a child of parent
export function isChild(parent, node) {
    for(let i = 0; i < parent.children.length; i++) {
        if(parent.children[i] === node) {
            return true;
        }
    }
    return false;
}

// Returns capitalized word from passed string: pokemon --> Pokemon
export function capitalize(word) {
    return word[0].toUpperCase() + word.slice(1);
}

// Returns number of keys in the object
export function size(object) {
    let count = 0;
    for(let k in object) {
        count++;
    }
    return count;
}

// Returns random element from passed array / object
export function getRandomEl(store) {
    let random_index = 0;
    let max = Array.isArray(store) ? store.length : store.size + 1;
    random_index = Math.floor((Math.random() * max));
    return store[random_index];
}

// Convert decimeters to ft
export function convertHeight(dm) {
    return Math.floor((dm / 3.048) * 100) / 100;
}

// Convert hectograms to lbs
export function convertWeight(hg) {
    return Math.floor((hg / 4.536) * 100) / 100;
}

// Loads cache with desired object structure
export function loadInitialState(cache) {
    for(let i = 1; i <= 898; i++) {
        cache[i] = {
            id: null,
            name: null,
            height: null,
            weight: null,
            types: null,
            stats: null,
            species_url: null,
            sprite_url: null,
            dmg_relations: null,
            flavor_texts: null,
        }
    }
}

// Loads all pokemon names and types into storage
export function cachePokemonInitialState(cache) {
    fetch("./src/pokemon_types.txt")
        .then(response => response.text())
        .then(text => {
            let pokemons = text.split('\n');
            for(let i = 0; i < pokemons.length; i++) {
                cache.size++;
                let temp = pokemons[i].split(".");
                let id = temp[0];
                let name = temp[1];
                let types = temp[2].split(' ');
                cache[id].id = id;
                cache[id].name = name;
                cache[id].types = types;
                cache[id].species_url = `https://pokeapi.co/api/v2/pokemon-species/${id}/`;
                cache[id].sprite_url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
            }
        })
}

// Loads all pokemon heights and weights into storage
export function cachePokemonHtWt(cache) {
    fetch("./src/pokemon_ht_wt.txt")
        .then(response => response.text())
        .then(text => {
            let pokemons = text.split('\n');
            for(let i = 0; i < pokemons.length; i++) {
                let temp = pokemons[i].split(" ");
                let id = temp[0];
                let ht = temp[1];
                let wt = temp[2];
                cache[id].height = ht;
                cache[id].weight = wt;
            }
        })
}

// Loads all pokemon stats into storage
export function cachePokemonStats(cache) {
    fetch("./src/pokemon_stats.txt")
        .then(response => response.text())
        .then(text => {
            let pokemons = text.split('\n');
            for(let i = 0; i < pokemons.length; i++) {
                let temp = pokemons[i].split(" ");
                let id = temp[0];
                let hp = temp[1];
                let atk = temp[2];
                let def = temp[3];
                let sp_atk = temp[4];
                let sp_def = temp[5];
                let speed = temp[6];
                cache[id].stats = {
                    hp: hp, speed: speed,
                    atk: atk, sp_atk: sp_atk,
                    def: def, sp_def: sp_def,
                };
            }
        })
}

// Loads all pokemon damage relations into storage
export function cachePokemonDmgRelations(cache) {
    const dmg_relations = {};
    fetch("./src/pokemon_damage.txt")
        .then(response => response.text())
        .then(text => {
            let lines = text.split("\n");
            for(let i = 0; i < lines.length; i++) {
                let data = lines[i].split("|");
                let double = data[1].split(":")[1];
                let half = data[2].split(":")[1];
                let no = data[3].split(":")[1];

                double = double === undefined ? [] : double.split(" ");
                half = half === undefined ? [] : half.split(" ");
                no = no === undefined ? [] : no.split(" ");

                const type = data[0];
                dmg_relations[type] = {
                    "double": double,
                    "half": half,
                    "no": no,
                };
            }
            for(let i = 1; i < cache.size; i++) {
                cache[i]["dmg_relations"] = {};
                cache[i].types.forEach(type => {
                    cache[i].dmg_relations[type] = dmg_relations[type];
                });
            }
        })
}

// Load all pokemon flavor texts into storage
export function cachePokemonFlavors(cache) {
    fetch("./src/pokemon_flavors.txt")
        .then(res => res.text())
        .then(text => {
            const pokemons = text.split("\n");
            for(let i = 0; i < pokemons.length; i++) {
                let data = pokemons[i].split(":");
                let id = data[0];
                let flavs = data[1].split("||");
                cache[id].flavor_texts = flavs;
            }
        })
}
