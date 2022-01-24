// ====================================================
// ================= I M P O R T S ====================
// ====================================================

// Helper methods
import { capitalize, getRandomEl, convertHeight, convertWeight } from './helpers'

// Cache of pokemon data
import { SELECTED_POKEMON, POKEMON_NAMES, TYPES } from './search_page'

// To show loading screen until sprites and data fully loaded
import { renderLoadingScreen, removeLoadingScreen } from './presentation'

// To render size comparison page
import { loadSizePage } from './size_page'

// To render index page
import { loadIndexPage } from './index_page'

// Chart.js
import {
    Chart,
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip
  } from 'chart.js';
  
  Chart.register(
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip
  );

// ====================================================
// =============== C O N S T A N T S ==================
// ====================================================

// Cache of description and damage data for every searched pokemon
export const SELECTION_DATA = {};

// ====================================================
// ===================== M A I N ======================
// =================== E X P O R T ====================
// ====================================================

export async function loadShowPage() {
    loadShowPageStructure();

    const ids = Object.keys(SELECTED_POKEMON.selection);
    await fetchStats(ids);

    // let current_pokemon = POKEMON[ids[0]];
    // current_pokemon = setupPrevNext(current_pokemon, ids);

    // loadSprites();
    // loadShowContent(current_pokemon);
}

// ====================================================
// =================== H E L P E R ====================
// ================== M E T H O D S ===================
// ====================================================

// Setup html elements for show page
function loadShowPageStructure() {
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
    const index_page_button = document.createElement("button");
    const size_page_button = document.createElement("button");

    // For all these things below, change CSS so that the container dimensions
    // remain fixed, but when the data goes over the container a scroll is added
    // - overflow: scroll
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
    
    prev_button.innerHTML = "PREV";
    next_button.innerHTML = "NEXT";
    index_page_button.innerHTML = "Go to index page";
    size_page_button.innerHTML = "Go to size page";

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
    new_view_container.appendChild(index_page_button);
    new_view_container.appendChild(size_page_button);
    
    index_page_button.addEventListener("click", loadIndexPage);
    size_page_button.addEventListener("click", loadSizePage);
}

// Fetch data for selected pokemon and cache
async function fetchStats(ids) {
    const type_id = {
        normal: 1, fighting: 2, flying: 3, 
        poison: 4, ground: 5, rock: 6, 
        bug: 7, ghost: 8, steel: 9, 
        fire: 10, water: 11, grass: 12, 
        electric: 13, psychic: 14, ice: 15, 
        dragon: 16, dark: 17, fairy: 18,
    }

    renderLoadingScreen();
    for(let i = 0; i < ids.length; i++) {
        if(POKEMON_NAMES[ids[i]].details === undefined) {
            await fetch(POKEMON_NAMES[ids[i]].species_url)
            .then(res => res.json())
            .then(data => POKEMON_NAMES[ids[i]].details = data);
            
            for(let j = 0; j < 2; j++) {
                let type = POKEMON_NAMES[ids[i]].types[j];
                if(type !== undefined) {
                    await fetch(`https://pokeapi.co/api/v2/type/${type_id[type]}/`)
                    .then(res => res.json())
                    .then(data => {
                        console.log(type, data);
                        let dmg_data = data.damage_relations;
                        let double = dmg_data.double_damage_from;
                        let half = dmg_data.half_damage_from;
                        let no = dmg_data.no_damage_from;
                        let string = `${type}:double `;
                        double.forEach(el => {
                            string += `${el.name} `;
                        });
                        string += ":half ";
                        half.forEach(el => {
                            string += `${el.name} `;
                        });
                        string += ":no ";
                        no.forEach(el => {
                            string += `${el.name} `;
                        });
                        console.log(string);
                        // POKEMON_NAMES[ids[i]].damage[j] = data
                    });
                }
            }
        }
    }
    removeLoadingScreen();
}

// Add event listeners to the prev and next buttons
function setupPrevNext(current_pokemon, ids) {
    const prev_button = document.getElementById("prev");
    const next_button = document.getElementById("next");
    prev_button.addEventListener("click", (event) => {
        current_pokemon = handlePrevNext(ids, current_pokemon, event.target.id);
    });
    next_button.addEventListener("click", (event) => {
        current_pokemon = handlePrevNext(ids, current_pokemon, event.target.id);
    });
    document.addEventListener("keydown", (event) => {
        const show_page = document.getElementById("show_page");
        if(show_page) {
            if(event.key === "ArrowLeft") {
                current_pokemon = handlePrevNext(ids, current_pokemon, "prev");
            } else if(event.key === "ArrowRight") {
                current_pokemon = handlePrevNext(ids, current_pokemon, "next");
            }
        }
    });
    return current_pokemon;
}

// Handle prev/next button clicks => Return new current pokemon
function handlePrevNext(ids, current_pokemon, type) {
    let idx = ids.indexOf(current_pokemon.id.toString());

    const sprites = document.getElementById('sprites').children;
    for(let i = 0; i < sprites.length; i++) {
        sprites[i].classList.remove('selected');
    }

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

    loadShowContent(current_pokemon);
    return current_pokemon;
}

// Load sprites
function loadSprites() {
    const sprites = document.getElementById("sprites");
    for(let id in SELECTED_POKEMON.selection) {
        let pokemon = POKEMON[id];
        let img_url = pokemon.sprites.front_default;
        let sprite_img = document.createElement("img");
        sprite_img.setAttribute("src", img_url);
        sprite_img.setAttribute("id", id);
        sprite_img.addEventListener("click", handleSpriteClick);
        sprites.appendChild(sprite_img);
    }
}

// Handle sprite img click => 
function handleSpriteClick(e) {
    const sprites = document.getElementById('sprites').children;
    for(let i = 0; i < sprites.length; i++) {
        sprites[i].classList.remove('selected');
    }
    const clicked_sprite = document.getElementById(e.target.id);
    clicked_sprite.classList.add('selected');
    const current_pokemon = POKEMON[e.target.id];
    loadShowContent(current_pokemon);
}

// Load current pokemon's data
function loadShowContent(current_pokemon) {
    const sprite = document.getElementById(current_pokemon.id);
    sprite.classList.add('selected');
    loadDescription(current_pokemon);
    loadImage(current_pokemon);
    loadStats(current_pokemon);
    loadDamageMultipliers(current_pokemon);
}

// Setup html elements for description
function loadDescription(current_pokemon) {
    const details = SELECTION_DATA[current_pokemon.id].details;
    
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

// Load central image of current pokemon
function loadImage(data) {
    const image = document.getElementById("image");
    image.setAttribute("src", data.sprites.front_default);
    image.setAttribute("alt", `Image of ${data.name}`);
}

// Setup chart in stats
function loadStats(current_pokemon) {
    const stats = document.getElementById("stats");
    stats.innerHTML = "";
    const types = extractTypes(current_pokemon.types);
    const ctx = document.createElement("canvas");
    ctx.setAttribute("id", "chart");
    ctx.setAttribute("width", 100);
    ctx.setAttribute("height", 100);
    stats.appendChild(ctx);
    const myChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ["HP", "DEF", "SP DEF", "SPEED", "SP ATK", "ATK"],
            datasets: [
                {
                    label: capitalize(current_pokemon.name),
                    data: [
                        current_pokemon.stats[0].base_stat,
                        current_pokemon.stats[2].base_stat,
                        current_pokemon.stats[4].base_stat,
                        current_pokemon.stats[5].base_stat,
                        current_pokemon.stats[3].base_stat,
                        current_pokemon.stats[1].base_stat,
                    ],
                    fill: true, 
                    backgroundColor: TYPES[types[0]],
                    borderColor: TYPES[types[1]] || TYPES[types[0]],

                    pointBackgroundColor: TYPES[types[1]] || TYPES[types[0]],
                    pointBorderColor: 'white',
                    pointBorderWidth: 2, 
                    pointHitRadius: 10, 
                    pointRadius: 3,
                    pointHoverBackgroundColor: 'white',
                    pointHoverBorderColor: TYPES[types[1]] || TYPES[types[0]], 
                    pointHoverBorderWidth: 4,
                    pointHoverRadius: 8,
                }
            ]
        }, 
        options: {
            scale: {
                r: {
                    beginAtZero: true, 
                    max: 160, 
                    min: 0
                }, 
            }
        }
    });
}

// Setup html elements for damage_multiplier
function loadDamageMultipliers(current_pokemon) {
    const damage = SELECTION_DATA[current_pokemon.id].damage;

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
        return `Receives ${multiplier} damage from ${extractDmgTypes(data).join(", ")}.`
    }
    return "";
}

// Return array of extracted types for dmg multiplier data
function extractDmgTypes(data) {
    const type_list = [];
    for(let i = 0; i < data.length; i++) {
        let type = data[i].name;
        type_list.push(type);
    }
    return type_list;
}

// Return array of extracted types for a pokemon
function extractTypes(data) {
    const type_list = [];
    for(let i = 0; i < data.length; i++) {
        let type = data[i].type.name;
        type_list.push(type);
    }
    return type_list;
}