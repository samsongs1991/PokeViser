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
        }
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