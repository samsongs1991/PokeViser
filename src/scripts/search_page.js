// ====================================================
// ================= I M P O R T S ====================
// ====================================================

// Helper methods
import { capitalize, getRandomEl, convertNameToId } from './helpers'

// To load show page
import { loadShowPage } from './show_page'

// To show loading screen until POKEMON is loaded with all 898 pokemon
import { renderLoadingScreen, removeLoadingScreen } from './presentation'

// ====================================================
// =============== C O N S T A N T S ==================
// ====================================================

// TYPES contains all Pokemon types and their hex color codes
export const TYPES = {
    // "normal": "#AAB09F",
    "normal": "rgba(170, 176, 159, 0.6)",
    // "fire": "#EA7A3C",
    "fire": "rgba(234, 122, 60, 0.6)",
    // "water": "#539AE2",
    "water": "rgba(83, 154, 226, 0.6)",
    // "electric": "#E5C531",
    "electric": "rgba(229, 197, 49, 0.6)",
    // "grass": "#71C558",
    "grass": "rgba(113, 197, 88, 0.6)",
    // "ice": "#70CBD4",
    "ice": "rgba(112, 203, 212, 0.6)",
    // "fighting": "#CB5F48",
    "fighting": "rgba(203, 95, 72, 0.6)",
    // "poison": "#B468B7",
    "poison": "rgba(180, 104, 183, 0.6)",
    // "ground": "#CC9F4F",
    "ground": "rgba(204, 159, 79, 0.6)",
    // "flying": "#7DA6DE",
    "flying": "rgba(125, 166, 222, 0.6)",
    // "psychic": "#E5709B",
    "psychic": "rgba(229, 112, 155, 0.6)",
    // "bug": "#94BC4A",
    "bug": "rgba(148, 188, 74, 0.6)",
    // "rock": "#B2A061",
    "rock": "rgba(178, 160, 97, 0.6)",
    // "ghost": "#846AB6",
    "ghost": "rgba(132, 106, 182, 0.6)",
    // "dragon": "#6A7BAF ",
    "dragon": "rgba(106, 123, 175, 0.6)",
    // "dark": "#736C75 ",
    "dark": "rgba(115, 108, 117, 0.6)",
    // "steel": "#89A1B0",
    "steel": "rgba(137, 161, 176, 0.6)",
    // "fairy": "#E397D1",
    "fairy": "rgba(227, 151, 209, 0.6)",
};

// POKEMON contains it's own "size" as well as pokemon ids for 
// keys with all data for that pokemon as an object for the values
export const POKEMON = { "size": 0 }

// SELECTED_POKEMON contains user selected pokemon - up to 6
const SELECTED_POKEMON = { "size": 0, "selection": {} };

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

    filter_container.setAttribute("id", "filter_container");
    filter_container.setAttribute("title", "Choose a type of Pokemon to search for");
    title.innerHTML = "Filters";

    searchpage.appendChild(filter_container);
    filter_container.appendChild(title);
    filter_container.appendChild(filter);

    createFilterOptions(TYPES, filter);
}

// Setup html elements for the search containers
function loadSearchContainer() {
    const searchpage = document.getElementById("searchpage");
    const search_container = document.createElement("section");
    const search_title = document.createElement("h3");
    const search_form = document.createElement("form");
    const search_input = document.createElement("input");
    
    search_container.setAttribute("id", "search_container");
    search_form.setAttribute("id", "search_form");
    search_input.setAttribute("id", "search_input");
    search_input.setAttribute("type", "text");
    search_input.setAttribute("name", "search_input");
    search_input.setAttribute("value", "");
    search_input.setAttribute("placeholder", "Name of Pokemon");
    
    search_title.innerHTML = "Search";
    
    searchpage.appendChild(search_container);
    search_container.appendChild(search_title);
    search_container.appendChild(search_form);
    search_form.appendChild(search_input);

    loadSearchButtons();
    loadAutosuggestion();
    loadErrors();
}

// Setup html buttons in the search container
function loadSearchButtons() {
    const search_form = document.getElementById("search_form");
    const button_container = document.createElement("div");
    const add_button = document.createElement("input");
    const random_button = document.createElement("input");
    const view_button = document.createElement("input");

    button_container.setAttribute("id", "button_container");
    add_button.setAttribute("type", "submit");
    add_button.setAttribute("value", "Add");
    random_button.setAttribute("type", "submit");
    random_button.setAttribute("value", "Random");
    view_button.setAttribute("type", "submit");
    view_button.setAttribute("value", "View");
    
    button_container.appendChild(add_button);
    button_container.appendChild(random_button);
    button_container.appendChild(view_button);
    search_form.appendChild(button_container)
    
    add_button.addEventListener("click", e => handleBtn(e));
    random_button.addEventListener("click", e => handleBtn(e));
    view_button.addEventListener("click", e => handleBtn(e)); 
}

// Handle Add/Random/View button clicks
function handleBtn(e) {
    e.preventDefault();
    if(e.target.value === "Add") {
        handleAdd();
    } else if(e.target.value === "Random") {
        handleRandom();
    } else if(e.target.value === "View") {
        handleView();
    }
}

// Setup html for autosuggestion
function loadAutosuggestion() {
    const search_container = document.getElementById("search_container");
    const autosuggestion_container = document.createElement("div");
    autosuggestion_container.setAttribute("id", "autosuggestion_container");
    search_container.appendChild(autosuggestion_container);
    setInterval(handleAutoSuggestion, 100);
}

// Handle population of autosuggestion html element in the setInterval fn
function handleAutoSuggestion() {
    const autosuggestion_container = document.getElementById("autosuggestion_container");
    const search_input = document.getElementById("search_input");
    if(autosuggestion_container) {
        autosuggestion_container.innerHTML = "";
        let filters_to_apply = getUserFilters();
        let partial_name = search_input.value;
        partial_name = partial_name.toLowerCase();
        for(let i = 1; i < POKEMON.size; i++) {
            if(partial_name.length === 0) {
                break;
            }
    
            let current_pokemon = POKEMON[i];
    
            if(current_pokemon.name.startsWith(partial_name)) {
                if(filters_to_apply.length === 0) {
                    if(isException(partial_name)) {
                        autosuggestion_container.innerHTML = `#${convertNameToId(partial_name)}. ${capitalize(partial_name)}`;
                    } else {
                        autosuggestion_container.innerHTML = `#${current_pokemon.id}. ${capitalize(current_pokemon.name)}`;
                    }
                    break;
                } else { // filter case
                    let exit = false;
                
                    // Edge cases of pokemon names that another pokemon has within their own name => "Mew" and "Mewtwo" or "Pidgeot" and "Pidgeoto"
                    if(partial_name === "mew" && filters_to_apply.includes("psychic")) {
                        autosuggestion_container.innerHTML = "Mew"; // set auto suggestion
                        exit = true;
                    } else if(partial_name === "pidgeot" && filters_to_apply.includes("normal")) {
                        autosuggestion_container.innerHTML = "Pidgeot"; // set auto suggestion
                        exit = true;
                    } else if(partial_name === "pidgeot" && filters_to_apply.includes("flying")) {
                        autosuggestion_container.innerHTML = "Pidgeot"; // set auto suggestion
                        exit = true;
                    } 
    
                    else {
                        current_pokemon.types.forEach(type_obj => {
                            if(filters_to_apply.includes(type_obj.type.name)) { // if the pokemon type exists among the user filters
                                autosuggestion_container.innerHTML = `#${current_pokemon.id}. ${capitalize(current_pokemon.name)}`;
                                exit = true;
                            }
                        });
                    }
    
                    if(exit) {
                        break;
                    }
                }
            }
        }
    }
}

// Setup html for selection_container
function loadSelectionContainer() {
    const searchpage = document.getElementById("searchpage");
    const selection_container = document.createElement("section");
    const selection = document.createElement("ol");

    selection_container.setAttribute("id", "selection_container");
    selection_container.setAttribute("title", "Click on Pokemon name to remove it from the list");
    selection.setAttribute("id", "selection");

    searchpage.appendChild(selection_container);
    selection_container.appendChild(selection);
}

// Add user input pokemon to selection list
function handleAdd() {
    const autosuggestion_container = document.getElementById("autosuggestion_container");

    if(SELECTED_POKEMON.size >= 6) {
        displayError("Cannot select more than 6 Pokemon");
    } else {
        const value = autosuggestion_container.innerHTML.split(" ");
        value[0] = parseInt(value[0].slice(1, value[0].length - 1));
        
        if(SELECTED_POKEMON.selection[value[0]]) {
            displayError("Pokemon already selected");
        } else if(value[1]) {
            addToList(value);
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
    let random_pokemon = getRandomEl(POKEMON);

    while(valid_random === false) {
        if(SELECTED_POKEMON[capitalize(random_pokemon.name)]) {
            random_pokemon = getRandomEl(POKEMON);
        } else if(filters.length > 0) {
            if(typeMatchCheck(random_pokemon, filters)) {
                valid_random = true;
            } else {
                random_pokemon = getRandomEl(POKEMON);
            }
        } else {
            valid_random = true;
        }
    }

    return random_pokemon;
}

// Return true if the pokemon type exists in the filters
function typeMatchCheck(pokemon, filters) {
    if(filters.includes(pokemon.types[0].type.name)) {
        return true;
    } else if(pokemon.types[1] && filters.includes(pokemon.types[1].type.name)) {
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
        let remove_item = document.getElementById(name);
        selection.removeChild(remove_item);
    });
    item.innerHTML = name;
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

// Auto suggest has bugs for specific pokemon names like "mew".
// It will suggest "mewtwo" instead of "mew" so there is no way to select "mew".
// If user input is an exception, returns true.
function isException(partial_name) {
    const names = ["mew", "pidgeot"];
    let bool = false;
    if(names.includes(partial_name)) {
        bool = true;
    }
    return bool;
}