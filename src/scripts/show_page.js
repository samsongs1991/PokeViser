// ====================================================
// ================= I M P O R T S ====================
// ====================================================

// Cache of pokemon data
import { POKEMON_NAMES, TYPES, SELECTED_POKEMON } from './store.js'

// To render size comparison page
import { loadSizePage } from './size_page'

// To render index page
import { loadIndexPage } from './index_page'

// Helper methods
import { capitalize, getRandomEl, convertHeight, convertWeight } from './helpers'

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
// ===================== M A I N ======================
// =================== E X P O R T ====================
// ====================================================

export function loadShowPage() {
    loadShowPageStructure();

    const ids = Object.keys(SELECTED_POKEMON.selection);

    let current_pokemon = POKEMON_NAMES[ids[0]];
    current_pokemon = setupPrevNext(current_pokemon, ids);

    loadSprites();
    // * NOTE *
    // Working on adjusting html structure of show page.
    // Move flavor text to bottom section.
    // Put center image into the left section.
    // Remove damage multiplier info.
    // Style the font / color palette.
    // Add an event listener for click somewhere that will generate poke img that moves across screen?
    loadShowContent(current_pokemon);
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
    
    const prev_button_container = document.createElement("div");
    const prev_button = document.createElement("button");
    const stats_container = document.createElement("div");
    const next_button_container = document.createElement("div");
    const next_button = document.createElement("button");
    
    const sprites = document.createElement("section");
    const main_content_container = document.createElement("div");
    const img_container = document.createElement("section");
    const stats = document.createElement("section");
    const description = document.createElement("section");
    const new_view_container = document.createElement("div");
    const index_page_button = document.createElement("button");
    const size_page_button = document.createElement("button");

    stats_container.setAttribute("id", "stats_container");
    prev_button_container.setAttribute("class", "button_container");
    next_button_container.setAttribute("class", "button_container");
    prev_button.setAttribute("id", "prev");
    next_button.setAttribute("id", "next");
    sprites.setAttribute("id", "sprites");
    main_content_container.setAttribute("id", "main_content_container");       
    img_container.setAttribute("id", "img_container");
    stats.setAttribute("id", "stats");
    description.setAttribute("id", "description");
    new_view_container.setAttribute("id", "new_view_container");
    
    prev_button.innerHTML = "<";
    next_button.innerHTML = ">";
    index_page_button.innerHTML = "Go to index page";
    size_page_button.innerHTML = "Go to size page";

    main.appendChild(prev_button_container);
    main.appendChild(stats_container);
    main.appendChild(next_button_container);        
    prev_button_container.appendChild(prev_button);
    next_button_container.appendChild(next_button);
    stats_container.appendChild(sprites);
    stats_container.appendChild(main_content_container);
    stats_container.appendChild(description);
    stats_container.appendChild(new_view_container);
    main_content_container.appendChild(stats);
    main_content_container.appendChild(img_container);
    new_view_container.appendChild(index_page_button);
    new_view_container.appendChild(size_page_button);
    
    index_page_button.addEventListener("click", loadIndexPage);
    size_page_button.addEventListener("click", loadSizePage);
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
            current_pokemon = POKEMON_NAMES[ids[0]];
        } else {
            current_pokemon = POKEMON_NAMES[ids[idx + 1]];
        }
    } else if(type === "prev") {
        if(idx === 0) {
            current_pokemon = POKEMON_NAMES[ids[ids.length - 1]];
        } else {
            current_pokemon = POKEMON_NAMES[ids[idx - 1]];
        }
    }

    loadShowContent(current_pokemon);
    return current_pokemon;
}

// Load sprites
function loadSprites() {
    const sprites = document.getElementById("sprites");
    for(let id in SELECTED_POKEMON.selection) {
        let pokemon = POKEMON_NAMES[id];
        let img_url = pokemon.sprite_url;
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
    const current_pokemon = POKEMON_NAMES[e.target.id];
    loadShowContent(current_pokemon);
}

// Load current pokemon's data
function loadShowContent(current_pokemon) {
    const sprite = document.getElementById(current_pokemon.id);
    sprite.classList.add('selected');
    loadStats(current_pokemon);
    loadImage(current_pokemon);
    loadDescription(current_pokemon);
}

// Setup html elements for description
function loadDescription(current_pokemon) {
    const description = document.getElementById("description");
    description.innerHTML = "";
    const flavor_text = document.createElement("p");
    let rand = getRandomEl(current_pokemon.flavor_texts);
    flavor_text.innerHTML = `${rand}`;
    description.appendChild(flavor_text);
}

// Load central image of current pokemon
function loadImage(pokemon) {
    const img_container = document.getElementById("img_container");
    img_container.innerHTML = "";

    const name = document.createElement("div");
    const image = document.createElement("img");

    name.innerHTML = `${capitalize(pokemon.name)}`;
    image.setAttribute("src", pokemon.sprite_url);
    image.setAttribute("alt", `Image of ${pokemon.name}`);

    img_container.appendChild(name);    
    img_container.appendChild(image);
}

// Setup chart in stats
function loadStats(current_pokemon) {
    const stats = document.getElementById("stats");
    stats.innerHTML = "";
    const types = current_pokemon.types;
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
                        current_pokemon.stats.hp,
                        current_pokemon.stats.def,
                        current_pokemon.stats.sp_def,
                        current_pokemon.stats.speed,
                        current_pokemon.stats.sp_atk,
                        current_pokemon.stats.atk,
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