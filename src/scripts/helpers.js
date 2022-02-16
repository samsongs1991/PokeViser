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

// Convert decimeters to ft
export function convertHeight(dm) {
    return Math.floor((dm / 3.048) * 100) / 100;
}

// Convert hectograms to lbs
export function convertWeight(hg) {
    return Math.floor((hg / 4.536) * 100) / 100;
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