// ====================================================
// ================= I M P O R T S ====================
// ====================================================

// Helper methods
import { capitalize, getRandomEl } from './helpers'

// Cache of pokemon data
import { POKEMON } from './search_page'

// ====================================================
// ===================== M A I N ======================
// =================== E X P O R T ====================
// ====================================================

// * Will later refactor the selection_data out of all functions
// * so that entire app can have easy access to all the data
// * export const SELECTION_DATA = {};

export async function loadShowPage(selected_pokemon) {
    loadShowPage_structure();

    const ids = Object.keys(selected_pokemon.selection);
    const selection_data = await fetchStats(ids);

    let current_pokemon = POKEMON[ids[0]];
    current_pokemon = setupPrevNext(current_pokemon, ids, selection_data);

    loadSprites(selected_pokemon);
    loadShowContent(current_pokemon, selection_data);

    // const view_all_button = document.getElementById("view_all");
    // view_all_button.addEventListener("click", (event) => {
    //     loadGroupStatsPage(selected_pokemon);
    // });
}

// ====================================================
// =================== H E L P E R ====================
// ================== M E T H O D S ===================
// ====================================================

// Setup html elements for show page
function loadShowPage_structure() {
    const main = document.querySelector("main");
    main.setAttribute("id", "show_page");
    main.innerHTML = "";
    
    const prev_button = document.createElement("button");
    const stats_container = document.createElement("div");
    const next_button = document.createElement("button");

    const sprites = document.createElement("section");
    const main_content_container = document.createElement("div");
    const description = document.createElement("section");
    const image = document.createElement("img");
    const stats = document.createElement("section");
    const damage_multiplier = document.createElement("section");
    const new_view_container = document.createElement("div");
    const view_all_button = document.createElement("button");
    const view_size_button = document.createElement("button");

    stats_container.setAttribute("id", "stats_container");
    prev_button.setAttribute("id", "prev");
    next_button.setAttribute("id", "next");
    sprites.setAttribute("id", "sprites");
    main_content_container.setAttribute("id", "main_content_container");       
    description.setAttribute("id", "description");
    image.setAttribute("id", "image")
    image.setAttribute("height", "400px");
    stats.setAttribute("id", "stats");
    damage_multiplier.setAttribute("id", "damage_multiplier");
    new_view_container.setAttribute("id", "new_view_container");
    view_all_button.setAttribute("id", "view_all");
    view_size_button.setAttribute("id", "view_size");
    
    prev_button.innerHTML = "PREV";
    next_button.innerHTML = "NEXT";
    view_all_button.innerHTML = "View all selections";
    view_size_button.innerHTML = "View size comparisons";

    main.appendChild(prev_button);
    main.appendChild(stats_container);
    main.appendChild(next_button);        
    stats_container.appendChild(sprites);
    stats_container.appendChild(main_content_container);
    stats_container.appendChild(damage_multiplier);
    stats_container.appendChild(new_view_container);
    main_content_container.appendChild(description);
    main_content_container.appendChild(image);
    main_content_container.appendChild(stats);
    new_view_container.appendChild(view_all_button);
    new_view_container.appendChild(view_size_button);
}

// Fetch data for selected pokemon and cache
async function fetchStats(ids) {
    const selection_data = {};
    for(let i = 0; i < ids.length; i++) {
        selection_data[ids[i]] = { details: null, damage: { 0: null, 1: null} };
        await fetch(POKEMON[ids[i]].species.url)
        .then(res => res.json())
        .then(data => selection_data[ids[i]].details = data)
        
        for(let j = 0; j < 2; j++) {
            if(POKEMON[ids[i]].types[j] !== undefined) {
                await fetch(POKEMON[ids[i]].types[j].type.url)
                .then(res => res.json())
                .then(data => {
                    selection_data[ids[i]].damage[j] = data
                })
            }
        }
    }
    return selection_data;
}

// Add event listeners to the prev and next buttons
function setupPrevNext(current_pokemon, ids, selection_data) {
    const prev_button = document.getElementById("prev");
    const next_button = document.getElementById("next");
    prev_button.addEventListener("click", (event) => {
        current_pokemon = handlePrevNext(
            ids, 
            current_pokemon, 
            event.target.id, 
            selection_data
        );
    });
    next_button.addEventListener("click", (event) => {
        current_pokemon = handlePrevNext(
            ids, 
            current_pokemon, 
            event.target.id, 
            selection_data
        );
    });
    document.addEventListener("keydown", (event) => {
        if(event.key === "ArrowLeft") {
            current_pokemon = handlePrevNext(
                ids, 
                current_pokemon, 
                "prev", 
                selection_data
            );
        } else if(event.key === "ArrowRight") {
            current_pokemon = handlePrevNext(
                ids, 
                current_pokemon, 
                "next", 
                selection_data
            );
        }
    });
    return current_pokemon;
}

// Handle prev/next button clicks => Return new current pokemon
function handlePrevNext(ids, current_pokemon, type, selection_data) {
    let idx = ids.indexOf(current_pokemon.id.toString());

    if(type === "next") {
        if(idx === ids.length - 1) {
            current_pokemon = POKEMON[ids[0]];
        } else {
            current_pokemon = POKEMON[ids[idx + 1]];
        }
    } else if(type === "prev") {
        if(idx === 0) {
            current_pokemon = POKEMON[ids[ids.length - 1]];
        } else {
            current_pokemon = POKEMON[ids[idx - 1]];
        }
    }

    loadShowContent(current_pokemon, selection_data);
    return current_pokemon;
}

// Load sprites
function loadSprites(selected_pokemon) {
    const sprites = document.getElementById("sprites");
    for(let id in selected_pokemon.selection) {
        let pokemon = POKEMON[id];
        let img_url = pokemon.sprites.front_default;
        let sprite_img = document.createElement("img");
        sprite_img.setAttribute("src", img_url);
        sprites.appendChild(sprite_img);
    }
}

// Load current pokemon's data
function loadShowContent(current_pokemon, selection_data) {
    loadDescription(current_pokemon, selection_data);
    loadImage(current_pokemon);
    loadStats(current_pokemon);
    loadDamageMultipliers(current_pokemon, selection_data);
}

// Setup html elements for description
function loadDescription(current_pokemon, selection_data) {
    const details = selection_data[current_pokemon.id].details;
    
    const description = document.getElementById("description");
    description.innerHTML = "";

    const description_info = document.createElement("ul");
    const name = document.createElement("li");
    const flavor_text = document.createElement("li");
    const is_baby = document.createElement("li");
    const is_legendary = document.createElement("li");
    const is_mythical = document.createElement("li");
    const height = document.createElement("li");
    const weight = document.createElement("li");

    name.innerHTML = `Name: ${capitalize(details.name)}`;
    flavor_text.innerHTML = `Description: ${randomFlavorText(details)}`;
    is_baby.innerHTML = `Baby: ${details.is_baby ? "Yes" : "No"}`
    is_legendary.innerHTML = `Legendary: ${details.is_legendary ? "Yes" : "No"}`
    is_mythical.innerHTML = `Mythical: ${details.is_mythical ? "Yes" : "No"}`
    height.innerHTML = `Height:  ${convertHeight(current_pokemon.height)} feet`;
    weight.innerHTML = `Weight:  ${convertWeight(current_pokemon.weight)} lbs`;

    description.appendChild(description_info);
    description_info.appendChild(name);
    description_info.appendChild(flavor_text);
    description_info.appendChild(is_baby);
    description_info.appendChild(is_legendary);
    description_info.appendChild(is_mythical);
    description_info.appendChild(height);
    description_info.appendChild(weight);
}

// Get random flavor text
function randomFlavorText(details) {
    let flavor_data = details.flavor_text_entries;
    let flavor_texts = [];
    for(let i = 0; i < flavor_data.length; i++) {
        let flavor = flavor_data[i];
        if(flavor.language.name === "en") {
            flavor_texts.push(flavor.flavor_text);
        }
    }
    return getRandomEl(flavor_texts);
}

// Convert decimeters to ft
function convertHeight(dm) {
    return Math.floor((dm / 3.048) * 100) / 100;
}

// Convert hectograms to lbs
function convertWeight(hg) {
    return Math.floor((hg / 4.536) * 100) / 100;
}

// Load central image of current pokemon
function loadImage(data) {
    const image = document.getElementById("image");
    image.setAttribute("src", data.sprites.front_default);
    image.setAttribute("alt", `Image of ${data.name}`);
}

// Setup html elements for stats
function loadStats(current_pokemon) {
    const stats = document.getElementById("stats");
    stats.innerHTML = "";

    const stats_info = document.createElement("ul");
    const hp = document.createElement("li");
    const attack = document.createElement("li");
    const defense = document.createElement("li");
    const special_attack = document.createElement("li");
    const special_defense = document.createElement("li");
    const speed = document.createElement("li");

    hp.innerHTML = `HP:  ${current_pokemon.stats[0].base_stat}`;
    attack.innerHTML = `Attack:  ${current_pokemon.stats[1].base_stat}`;
    defense.innerHTML = `Defense:  ${current_pokemon.stats[2].base_stat}`;
    special_attack.innerHTML = `Special Attack: ${current_pokemon.stats[3].base_stat}`;
    special_defense.innerHTML = `Special Defense:  ${current_pokemon.stats[4].base_stat}`;
    speed.innerHTML = `Speed:  ${current_pokemon.stats[5].base_stat}`;
    
    stats.appendChild(stats_info);
    stats_info.appendChild(hp);
    stats_info.appendChild(attack);
    stats_info.appendChild(defense);
    stats_info.appendChild(special_attack);
    stats_info.appendChild(special_defense);
    stats_info.appendChild(speed);
}

// Setup html elements for damage_multiplier
function loadDamageMultipliers(current_pokemon, selection_data) {
    const damage = selection_data[current_pokemon.id].damage;

    const damage_multiplier = document.getElementById("damage_multiplier");
    damage_multiplier.innerHTML = ""; 

    const damage_multiplier_info = document.createElement("ul");
    damage_multiplier.appendChild(damage_multiplier_info);

    for(let i = 0; i <= 1; i++) {
        if(current_pokemon.types[i]) {
            const { double_damage_from, half_damage_from, no_damage_from } = damage[i].damage_relations;
            const type = document.createElement("li");
            const double_damage = document.createElement("li");
            const half_damage = document.createElement("li");
            const no_damage = document.createElement("li");

            type.innerHTML = 
                `${i === 0 ? "Primary" : "Secondary"} Type:  
                ${capitalize(current_pokemon.types[i].type.name)}`;
            double_damage.innerHTML = damageMultiplierText(double_damage_from, "double");
            half_damage.innerHTML = damageMultiplierText(half_damage_from, "half");
            no_damage.innerHTML = damageMultiplierText(no_damage_from, "no");

            damage_multiplier_info.appendChild(type);
            type.appendChild(double_damage);
            type.appendChild(half_damage);
            type.appendChild(no_damage);
        }
    }
}

// Return formatted string for damage multiplier info
function damageMultiplierText(data, multiplier) {
    if(data.length > 0) {
        return `Receives ${multiplier} damage from ${extractTypes(data).join(", ")}.`
    }
    return "";
}

// Return array of extracted types
function extractTypes(data) {
    const type_list = [];
    for(let i = 0; i < data.length; i++) {
        let type = data[i].name;
        type_list.push(type);
    }
    return type_list;
}




// Will refactor this into loadGroupShowPage and into a separate file
function loadGroupStatsPage(list_of_pokemon_objects) {
    const main = document.querySelector("main");
        main.innerHTML ="";

    console.log(list_of_pokemon_objects);

    // iterate through pokemon
    // - create a new article element
    // - append it to main
    // - - append an image to article
    // - - append types and damage relations to article


}