// ====================================================
// ================= I M P O R T S ====================
// ====================================================

// Helper methods
import { capitalize, getRandomEl } from './helpers'

// To load show page
import { loadShowPage } from './show_page'

// To show loading screen until POKEMON is loaded with all 898 pokemon
import { renderLoadingScreen, removeLoadingScreen } from './presentation'

// ====================================================
// =============== C O N S T A N T S ==================
// ====================================================

// TYPES contains all Pokemon types and their hex color codes
export const TYPES = {
    "normal": "rgba(170, 176, 159, 0.6)",
    "fire": "rgba(234, 122, 60, 0.6)",
    "water": "rgba(83, 154, 226, 0.6)",
    "electric": "rgba(229, 197, 49, 0.6)",
    "grass": "rgba(113, 197, 88, 0.6)",
    "ice": "rgba(112, 203, 212, 0.6)",
    "fighting": "rgba(203, 95, 72, 0.6)",
    "poison": "rgba(180, 104, 183, 0.6)",
    "ground": "rgba(204, 159, 79, 0.6)",
    "flying": "rgba(125, 166, 222, 0.6)",
    "psychic": "rgba(229, 112, 155, 0.6)",
    "bug": "rgba(148, 188, 74, 0.6)",
    "rock": "rgba(178, 160, 97, 0.6)",
    "ghost": "rgba(132, 106, 182, 0.6)",
    "dragon": "rgba(106, 123, 175, 0.6)",
    "dark": "rgba(115, 108, 117, 0.6)",
    "steel": "rgba(137, 161, 176, 0.6)",
    "fairy": "rgba(227, 151, 209, 0.6)",
};

// POKEMON_NAMES is an array of all pokemon names lowercased
export const POKEMON_NAMES = { "size": 0 };

// POKEMON contains it's own "size" as well as pokemon ids for 
// keys with all data for that pokemon as an object for the values
export const POKEMON = { "size": 0 };

// SELECTED_POKEMON contains user selected pokemon - up to 6
export const SELECTED_POKEMON = { "size": 0, "selection": {} };

// Loads all pokemon names into POKEMON _NAMES storage
export function cachePokemonNames(cache) {
    fetch("./src/pokemon.txt")
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

// Loads all pokemon into POKEMON storage
export function cachePokemon(cache) {    
    const first = 1;
    // for testing only "last" is 10. change back to 898 for production
    const last = 10;
    if(cache[1] === undefined) {
        for(let i = first; i <= last; i++) {
            fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`)
            .then(res => res.json())
            .then(data => {
                cache[i] = data;
                cache.size++;
                if(cache.size === first) {
                    renderLoadingScreen();
                } else if(cache.size === last) {
                    removeLoadingScreen();
                }
            })
        }
    }
}

// ====================================================
// ===================== M A I N ======================
// =================== E X P O R T ====================
// ====================================================

export function loadMainSearchPage() {
    SELECTED_POKEMON.size = 0;
    SELECTED_POKEMON.selection = {};
    
    const body = document.querySelector("body");
    const main = document.createElement("main");

    main.setAttribute("id", "searchpage");
    
    body.appendChild(main);
    
    loadFilterContainer();
    loadSearchContainer();
    loadSelectionContainer();
}

// ====================================================
// =================== H E L P E R ====================
// ================== M E T H O D S ===================
// ====================================================

// Setup html elements for the filter container
function loadFilterContainer() {
    const searchpage = document.getElementById("searchpage");
    const filter_container = document.createElement("section");
    const title = document.createElement("h3");
    const filter = document.createElement("form");
    const button = document.createElement("button");

    filter_container.setAttribute("id", "filter_container");
    filter_container.setAttribute("title", "Choose a type of Pokemon to search for");
    title.innerHTML = "Filters";
    button.innerHTML = "Apply";

    button.addEventListener("click", e => handleBtn(e));

    searchpage.appendChild(filter_container);
    filter_container.appendChild(title);
    filter_container.appendChild(filter);
    filter_container.appendChild(button);

    createFilterOptions(TYPES, filter);
}

function handleApplyFilters() {
    const filters_to_apply = getUserFilters();
    updateOptions(filters_to_apply);
    signalUpdate();
}

function updateOptions(filters) {
    const datalist = document.getElementById("dropdown");
    datalist.innerHTML = "";
    for(let i = 1; i <= POKEMON_NAMES.size; i++) {
        let types = POKEMON_NAMES[i].types;
        if(filters.length === 0 ||
            filters.includes(types[0]) || 
            (types[1] && filters.includes(types[1]))) {
            let option = document.createElement("option");
            option.setAttribute("value", `#${i} ${capitalize(POKEMON_NAMES[i].name)}`);
            datalist.appendChild(option);
        }
    }
}

function signalUpdate() {
    const input = document.getElementById("search_input");
    const types = getUserFilters();
    const i = Math.floor(Math.random() * types.length);
    input.classList.add(types[i]);
    window.setTimeout(() => {        
        input.classList.remove(types[i]);
    }, 450);
}

// Setup html elements for the search containers
function loadSearchContainer() {
    const searchpage = document.getElementById("searchpage");
    const search_container = document.createElement("section");
    const search_title = document.createElement("h3");
    const search_form = document.createElement("form");
    
    search_container.setAttribute("id", "search_container");
    search_form.setAttribute("id", "search_form");
    search_form.setAttribute("autocomplete", "off");
    
    search_title.innerHTML = "Search";
    
    searchpage.appendChild(search_container);
    search_container.appendChild(search_title);
    search_container.appendChild(search_form);

    loadDropdown();
    loadSearchButtons();
    loadErrors();
}

// Setup html buttons in the search container
function loadSearchButtons() {
    const search_form = document.getElementById("search_form");
    const button_container = document.createElement("div");
    const add_button = document.createElement("button");
    const random_button = document.createElement("button");
    const view_button = document.createElement("button");

    button_container.setAttribute("id", "button_container");

    add_button.innerHTML = "Add";
    random_button.innerHTML = "Random";
    view_button.innerHTML = "View";
    
    button_container.appendChild(add_button);
    button_container.appendChild(random_button);
    button_container.appendChild(view_button);
    search_form.appendChild(button_container)
    
    add_button.addEventListener("click", e => handleBtn(e));
    random_button.addEventListener("click", e => handleBtn(e));
    view_button.addEventListener("click", e => handleBtn(e)); 
}

// Setup html dropdown in the search container
function loadDropdown() {
    const search_form = document.getElementById("search_form");
    const input = document.createElement("input");
    const datalist = document.createElement("datalist");
    input.setAttribute("id", "search_input");
    input.setAttribute("list", "dropdown");
    input.setAttribute("placeholder", "Name of Pokemon");
    datalist.setAttribute("id", "dropdown");
    search_form.appendChild(input);
    search_form.appendChild(datalist);
    for(let i = 1; i <= POKEMON_NAMES.size; i++) {
        let option = document.createElement("option");
        option.setAttribute("value", `#${i} ${capitalize(POKEMON_NAMES[i].name)}`);
        datalist.appendChild(option);
    }
}

// Handle Add/Random/View button clicks
function handleBtn(e) {
    e.preventDefault();
    if(e.target.innerHTML === "Add") {
        handleAdd();
    } else if(e.target.innerHTML === "Random") {
        handleRandom();
    } else if(e.target.innerHTML === "View") {
        handleView();
    } else if(e.target.innerHTML === "Apply") {
        handleApplyFilters();
    } else if(e.target.innerHTML === "Clear") {
        handleClearSelection();
    }
}

// Setup html for selection_container
function loadSelectionContainer() {
    const searchpage = document.getElementById("searchpage");
    const selection_container = document.createElement("section");
    const selection_title = document.createElement("h3");
    const selection = document.createElement("ol");
    const button = document.createElement("button");

    selection_title.innerHTML = "Selection";
    button.innerHTML = "Clear";

    selection_container.setAttribute("id", "selection_container");
    selection_container.setAttribute("title", "Click on Pokemon name to remove it from the list");
    selection.setAttribute("id", "selection");

    button.addEventListener("click", e => handleBtn(e));

    searchpage.appendChild(selection_container);
    selection_container.appendChild(selection_title);
    selection_container.appendChild(selection);
    selection_container.appendChild(button);
}

function handleClearSelection() {
    const selection = document.getElementById("selection");
    selection.innerHTML = "";
    SELECTED_POKEMON.size = 0;
    SELECTED_POKEMON.selection = {};
}

// Add user input pokemon to selection list
function handleAdd() {
    const search_input = document.getElementById("search_input");
    if(SELECTED_POKEMON.size >= 6) {
        displayError("Cannot select more than 6 Pokemon");
    } else {
        const value = search_input.value.split(" ");
        const id = parseInt(value[0].slice(1, value[0].length));
        const name = value[1] ? value[1].toLowerCase() : null;  
        if(SELECTED_POKEMON.selection[id]) {
            displayError("Pokemon already selected");
        } else if(name && POKEMON_NAMES[id].name === name) {
            addToList([id, name]);
        } else {
            displayError("Invalid Pokemon name");
        }
    }
}

// Add random pokemon to selection list
function handleRandom() {
    if(SELECTED_POKEMON.size >= 6) {
        displayError("Cannot select more than 6 Pokemon");
    } else {
        let random_pokemon = getValidRandomPokemon();
        const value = [random_pokemon.id, capitalize(random_pokemon.name)]

        while(SELECTED_POKEMON.selection[value[0]]) {
            random_pokemon = getValidRandomPokemon(SELECTED_POKEMON);
            value[0] = random_pokemon.id;
            value[1] = capitalize(random_pokemon.name);
        }        
        
        addToList(value);
    }
}

// Go to show_page if user has selected pokemon
function handleView() {
    if(SELECTED_POKEMON.size > 0) {
        loadShowPage(SELECTED_POKEMON);
    } else {
        displayError("Choose at least 1 Pokemon");
    }
}

// Return a valid random pokemon
function getValidRandomPokemon() {
    const filters = getUserFilters();
    let valid_random = false;
    let random_pokemon = getRandomEl(POKEMON_NAMES);

    while(valid_random === false) {
        if(SELECTED_POKEMON.selection[random_pokemon.id]) {
            random_pokemon = getRandomEl(POKEMON_NAMES);
        } else if(filters.length > 0) {
            if(typeMatchCheck(random_pokemon, filters)) {
                valid_random = true;
            } else {
                random_pokemon = getRandomEl(POKEMON_NAMES);
            }
        } else {
            valid_random = true;
        }
    }

    return random_pokemon;
}

// Return true if the pokemon type exists in the filters
function typeMatchCheck(pokemon, filters) {
    if(filters.includes(pokemon.types[0])) {
        return true;
    } else if(pokemon.types[1] && filters.includes(pokemon.types[1])) {
        return true;
    } else {
        return false;
    }
}

// Add { id: name } to SELECTED_POKEMON.selection
function addToList(value) {
    errorAlreadyExists();

    const search_input = document.getElementById("search_input");
    const selection = document.getElementById("selection");

    search_input.value = "";
    SELECTED_POKEMON.size++;

    let id = value[0];
    let name = value[1];
    SELECTED_POKEMON.selection[id] = name;
    
    const item = document.createElement("li");
    item.setAttribute("id", name);
    item.addEventListener("click", () => {
        delete SELECTED_POKEMON.selection[id];
        SELECTED_POKEMON.size--;
        let li = document.getElementById(name);
        selection.removeChild(li);
    });
    item.innerHTML = capitalize(name);
    selection.appendChild(item);
}

// Setup html for errors
function loadErrors() {
    const search_container = document.getElementById("search_container");
    const error_container = document.createElement("div");
    error_container.setAttribute("id", "error_container");
    search_container.appendChild(error_container);
}

// Remove error message for user if one already exists 
function errorAlreadyExists() {
    const error_container = document.getElementById("error_container");
    if(error_container.innerHTML !== "") {
        error_container.innerHTML = "";
    }
}

// Display errors
function displayError(msg) {
    errorAlreadyExists();
    const error_container = document.getElementById("error_container");
    error_container.innerHTML = msg;
    setTimeout(() => {
        error_container.innerHTML = "";
    }, 5000);  
}

// Setup filter options in filter_container
function createFilterOptions(TYPES, form) {
    let list = document.createElement("ul");
    for(let type in TYPES) {
        let li = document.createElement("li");
        let filter_option = document.createElement("input");
        let filter_option_label = document.createElement("label");

        filter_option.setAttribute("type", "checkbox");
        filter_option.setAttribute("value", type);
        filter_option_label.innerHTML = capitalize(type);

        filter_option_label.addEventListener("click", () => {
            filter_option.checked ? 
            filter_option.checked = false :
            filter_option.checked = true;
        })

        li.appendChild(filter_option);
        li.appendChild(filter_option_label);
        list.appendChild(li);
        
        if(list.children.length >= 6) {
            form.appendChild(list);
            list = document.createElement("ul")
        }
    };
}

// Return array of user filter inputs
function getUserFilters() {
    let filters_to_apply = [];
    let boxes = document.querySelectorAll("input[type='checkbox']");
    boxes.forEach(box => {
        if(box.checked) {
            filters_to_apply.push(box.value);
        }
    });
    
    return filters_to_apply;
}