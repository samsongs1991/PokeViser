import { POKEMON } from './search_page.js'

// ===============================
// ==== Custom helper methods ====
// ===============================

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
    let max = Array.isArray(store) ? store.length : store.size;
    random_index = Math.floor((Math.random() * max) + 1);
    return store[random_index];
}

// Returns the ID corresponding to the pokemon name
export function convertNameToId(name) {
    for(let k in POKEMON) {
        if(POKEMON[k].name === name.toLowerCase()) {
            return k;
        }``
    }
}

// Convert decimeters to ft
export function convertHeight(dm) {
    return Math.floor((dm / 3.048) * 100) / 100;
}

// Convert hectograms to lbs
export function convertWeight(hg) {
    return Math.floor((hg / 4.536) * 100) / 100;
}

// Loads all pokemon names and types into storage
export function cachePokemonNamesAndTypes(cache) {
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
                cache[id] = { "id": id, "name": name, "types": types };
            }
        })
}

// Loads all pokemon heights and weights into storage
export function cachePokemonHtAndWt(cache) {
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

// Loads all pokemon sprite_url into storage
export function cachePokemonSprites(cache) {
    fetch("./src/pokemon_sprites.txt")
        .then(response => response.text())
        .then(text => {
            let pokemons = text.split('\n');
            for(let i = 0; i < pokemons.length; i++) {
                let temp = pokemons[i].split(" ");
                let id = temp[0];
                let url = temp[1];
                cache[id].sprite_url = url;
            }
        })
}

// Loads all pokemon species_url into storage
export function cachePokemonSpecies(cache) {
    fetch("./src/pokemon_species.txt")
        .then(response => response.text())
        .then(text => {
            let pokemons = text.split('\n');
            for(let i = 0; i < pokemons.length; i++) {
                let temp = pokemons[i].split(" ");
                let id = temp[0];
                let url = temp[1];
                cache[id].species_url = url;
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
