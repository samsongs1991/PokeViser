// ===============================
// ==== Custom helper methods ====
// ===============================

// Returns capitalized word from passed string: pokemon --> Pokemon
export function capitalize(word) {
    return word[0].toUpperCase() + word.slice(1).toLowerCase();
}

// Returns number of keys in the object
export function size(object) {
    let count = 0;
    for(let k in object) { 
        count++;
    }
    return count;
}

// Returns random element from passed array
export function getRandomEl(array) {
    let random_index = Math.floor(Math.random() * array.length);
    return array[random_index];
}