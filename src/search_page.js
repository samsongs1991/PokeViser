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
const TYPES = {
    "normal": "AAB09F",
    "fire": "EA7A3C",
    "water": "539AE2",
    "electric": "E5C531",
    "grass": "71C558",
    "ice": "70CBD4",
    "fighting": "CB5F48",
    "poison": "B468B7",
    "ground": "CC9F4F",
    "flying": "7DA6DE",
    "psychic": "E5709B",
    "bug": "94BC4A",
    "rock": "B2A061",
    "ghost": "846AB6",
    "dragon": "6A7BAF ",
    "dark": "736C75 ",
    "steel": "89A1B0",
    "fairy": "E397D1"
};

// POKEMON contains it's own "size" as well as pokemon ids for 
// keys with all data for that pokemon as an object for the values
export const POKEMON = { "size": 0 }

// Loads all pokemon into POKEMON storage
export function cachePokemon(cache) {
    if(cache[1] === undefined) {
        for(let i = 1; i <= 898; i++) {
            fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`)
            .then(res => res.json())
            .then(data => {
                cache[i] = data;
                cache.size++;
                if(cache.size === 1) {
                    renderLoadingScreen();
                } else if(cache.size === 898) {
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
    const body = document.querySelector("body");
    const main = document.createElement("main");

    main.setAttribute("id", "searchpage");
    
    body.appendChild(main);
    
    loadFilterContainer(main);
    loadSearchContainer(main);
}

// ====================================================
// =================== H E L P E R ====================
// ================== M E T H O D S ===================
// ====================================================

// Setup html elements for the filter container
function loadFilterContainer(main) {
    const filter_container = document.createElement("section");
    const filter = document.createElement("form");
    const filter_label = document.createElement("label");

    filter_container.setAttribute("id", "filter_container");
    filter_label.innerHTML = "Filters: ";

    main.appendChild(filter_container);
    filter_container.appendChild(filter);
    filter.appendChild(filter_label);

    createFilterOptions(TYPES, filter);
}

// Setup html elements for the search containers
function loadSearchContainer(main) {
    const search_container = document.createElement("section");
    const search_form = document.createElement("form");
    const search_label = document.createElement("label");
    const search_input = document.createElement("input");
    const selection_container = document.createElement("section");
    const selection = document.createElement("ol");
    
    search_container.setAttribute("id", "search_container");
    selection.setAttribute("id", "selection");
    search_input.setAttribute("id", "search_input");
    search_input.setAttribute("type", "text");
    search_input.setAttribute("name", "search_input");
    search_input.setAttribute("value", "");
    search_input.setAttribute("placeholder", "Name of Pokemon");
    selection_container.setAttribute("id", "selection_container");
    
    search_label.innerHTML = "Search by name: ";
    
    main.appendChild(search_container);
    main.appendChild(selection_container);
    search_container.appendChild(search_form);
    search_form.appendChild(search_input);
    search_form.appendChild(search_label);
    selection_container.appendChild(selection);

    //================================================================== 
    // =================== AUTO SUGGESTION FEATURE =====================
    //==================================================================
    const selected_pokemon = { "size": 0, "selection": {} };

    const autosuggestion_container = document.createElement("div");
    const autosuggestion = document.createElement("p");

    autosuggestion_container.setAttribute("id", "autosuggestion_container");
    autosuggestion.setAttribute("id", "autosuggestion");

    search_container.appendChild(autosuggestion_container);
    autosuggestion_container.appendChild(autosuggestion);

    setInterval(handleAutoSuggestion, 100);

    //================================================================== 
    // ======================= SEARCH BUTTONS ==========================
    //==================================================================
    const button_container = document.createElement("div");
    const select_button = document.createElement("input");
    const random_button = document.createElement("input");
    const search_button = document.createElement("input");

    button_container.setAttribute("id", "button_container");
    select_button.setAttribute("type", "submit");
    select_button.setAttribute("value", "Add to list");
    random_button.setAttribute("type", "submit");
    random_button.setAttribute("value", "Random");
    search_button.setAttribute("type", "submit");
    search_button.setAttribute("value", "View stats");
    
    button_container.appendChild(select_button);
    button_container.appendChild(random_button);
    button_container.appendChild(search_button);
    search_form.appendChild(button_container)
    
    select_button.addEventListener("click", (event) => {
        event.preventDefault();
        handleSelectPokemon(selected_pokemon);
    });
    random_button.addEventListener("click", (event) => {
        event.preventDefault();
        handleRandomPokemon(selected_pokemon);
    });
    search_button.addEventListener("click", (event) => {
        event.preventDefault();
        if(selected_pokemon.size > 0) {
            loadShowPage(selected_pokemon);
        }
    }); 
}

// Handle population of autosuggestion html element in the setInterval fn
function handleAutoSuggestion() {
    const autosuggestion = document.getElementById("autosuggestion");
    const search_input = document.getElementById("search_input");
    if(autosuggestion) {
        autosuggestion.innerHTML = "";
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
                        autosuggestion.innerHTML = `#${convertNameToId(partial_name)}. ${capitalize(partial_name)}`;
                    } else {
                        autosuggestion.innerHTML = `#${current_pokemon.id}. ${capitalize(current_pokemon.name)}`;
                    }
                    break;
                } else { // filter case
                    let exit = false;
                
                    // Edge cases of pokemon names that another pokemon has within their own name => "Mew" and "Mewtwo" or "Pidgeot" and "Pidgeoto"
                    if(partial_name === "mew" && filters_to_apply.includes("psychic")) {
                        autosuggestion.innerHTML = "Mew"; // set auto suggestion
                        exit = true;
                    } else if(partial_name === "pidgeot" && filters_to_apply.includes("normal")) {
                        autosuggestion.innerHTML = "Pidgeot"; // set auto suggestion
                        exit = true;
                    } else if(partial_name === "pidgeot" && filters_to_apply.includes("flying")) {
                        autosuggestion.innerHTML = "Pidgeot"; // set auto suggestion
                        exit = true;
                    } 
    
                    else {
                        current_pokemon.types.forEach(type_obj => {
                            if(filters_to_apply.includes(type_obj.type.name)) { // if the pokemon type exists among the user filters
                                autosuggestion.innerHTML = `#${current_pokemon.id}. ${capitalize(current_pokemon.name)}`;
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

// Add user input pokemon to selection list
function handleSelectPokemon(selected_pokemon) {
    const search_container = document.getElementById("search_container");
    const autosuggestion = document.getElementById("autosuggestion");

    if(selected_pokemon.size >= 6) {
        displayErrorListFull(search_container);
    } else {
        const value = autosuggestion.innerHTML.split(" ");
        value[0] = value[0].slice(1, value[0].length - 1);
        if(selected_pokemon[value[0]]) {
            displayErrorAlreadySelected(search_container);
        } else if(value[1]) {
            addToList(value, selected_pokemon);
        } else {
            displayErrorInvalidName(search_container);
        }
    }
}

// Add random pokemon to selection list
function handleRandomPokemon(selected_pokemon) {
    if(selected_pokemon.size >= 6) {
        displayErrorListFull(search_container);
    } else {
        let random_pokemon = getValidRandomPokemon(selected_pokemon);
        const value = [random_pokemon.id, capitalize(random_pokemon.name)]
        addToList(value, selected_pokemon);
    }
}

// Return a valid random pokemon
function getValidRandomPokemon(selected_pokemon) {
    const filters = getUserFilters();
    let valid_random = false;
    let random_pokemon = getRandomEl(POKEMON); // this doesn't work properly until the POKEMON obj is fully loaded which takes about 15sec

    while(valid_random === false) {
        if(selected_pokemon[capitalize(random_pokemon.name)]) {
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

// Add { id: name } to selected_pokemon.selection
function addToList(value, selected_pokemon) {
    const search_container = document.getElementById("search_container");
    const search_input = document.getElementById("search_input");
    const selection = document.getElementById("selection");

    errorAlreadyExists(search_container);
    search_input.value = "";
    selected_pokemon.size++;

    let id = value[0];
    let name = value[1];
    selected_pokemon.selection[id] = name;
    
    const item = document.createElement("li");
    item.setAttribute("id", name);
    item.addEventListener("click", () => {
        delete selected_pokemon.selection[id];
        selected_pokemon.size--;
        let remove_item = document.getElementById(name);
        selection.removeChild(remove_item);
    });
    item.innerHTML = name;
    selection.appendChild(item);
}

// Remove error message for user if one already exists 
function errorAlreadyExists(search_container) {
    if(search_container.children.length === 3) {
        search_container.children.item(2).remove();
    }
}

// Display error "Can't select more than 6 Pokemon"
function displayErrorListFull(search_container) {
    errorAlreadyExists(search_container);
    const error = document.createElement("p");
    error.setAttribute("name", "error");
    error.innerHTML = "Cannot select more than 6 Pokemon";
    search_container.appendChild(error);
    setTimeout(() => {
        error.remove();
    }, 5000);  
}

// Display error "Pokemon already selected"
function displayErrorAlreadySelected(search_container) {
    errorAlreadyExists(search_container);
    const error = document.createElement("p");
    error.setAttribute("name", "error");
    error.innerHTML = "Pokemon already selected";
    search_container.appendChild(error);
    setTimeout(() => {
        error.remove();
    }, 5000);
}

// Display error "User input does not match any pokemon name"
function displayErrorInvalidName(search_container) {
    errorAlreadyExists(search_container);
    const error = document.createElement("p");
    error.setAttribute("name", "error");
    error.innerHTML = "Invalid Pokemon name";
    search_container.appendChild(error);
    setTimeout(() => {
        error.remove();
    }, 5000);
}

// Setup filter options in filter_container
function createFilterOptions(TYPES, filter) {
    for(let type in TYPES) {
        let filter_option = document.createElement("input");
            filter_option.setAttribute("type", "checkbox");
            filter_option.setAttribute("value", type);

        let filter_option_label = document.createElement("label");
            filter_option_label.innerHTML = capitalize(type);

        filter.appendChild(filter_option);
        filter.appendChild(filter_option_label);
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