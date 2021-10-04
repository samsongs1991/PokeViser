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
// export function getRandomEl(array) {
//     let random_index = Math.floor(Math.random() * array.length);
//     return array[random_index];
// }

export function getRandomEl(store) {
    let random_index = 0;
    let max = Array.isArray(store) ? max = store.length : max = store.size;
    random_index = Math.floor((Math.random() * max) + 1);
    return store[random_index];
}

// function isObject(obj) {
//     return obj && typeof obj === 'object' && obj.constructor === Object;
// }