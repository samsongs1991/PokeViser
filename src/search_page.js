// Helper methods
import { capitalize, size, getRandomEl } from './helpers'

// To load show page
import { loadIndividualStatsPage } from './show_page'

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

// POKEMON_NAMES is an array of all 898 pokemon names in a lowercased string
// [name, array of types --> types.type.name (1 or 2 items)]
export const POKEMON = { "size": 0 }

export function cachePokemon(cache) {
    if(cache[1] === undefined) {
        for(let i = 1; i <= 898; i++) {
            fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`)
            .then(res => res.json())
            .then(data => cache[i] = data);
            cache.size++;
        }
    }
}

const POKEMON_NAMES = []; // instead of making 900 calls, find an API with list of all current pokemon and make 1 call
for(let i = 1; i <= 898; i++) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`)
    .then(res => res.json())
    .then(data => POKEMON_NAMES.push([data.name, data.types]));
}

export function loadMainSearchPage() {
    const body = document.querySelector("body");
    const main = document.createElement("main");

    main.setAttribute("id", "searchpage");
    
    body.appendChild(main);
    
    loadFilterContainer(main);
    loadSearchContainer(main);
}

// =====================================================================================
// =====================================================================================
// =====================================================================================

// Creates html elements for the filter container and appends them to passed html element
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
    const selected_pokemon = { "size": 0 };

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
            loadIndividualStatsPage(selected_pokemon);
        }
    }); 
}


// Handle population of autosuggestion html element for the setInterval fn
function handleAutoSuggestion() {
    const autosuggestion = document.getElementById("autosuggestion");
    const search_input = document.getElementById("search_input");
    if(autosuggestion) {
        autosuggestion.innerHTML = "";
        let filters_to_apply = getUserFilters();
        let partial_name = search_input.value;
        partial_name = partial_name.toLowerCase();
        for(let i = 1; i < POKEMON.size; i++) { // iterate through every pokemon
            // Exit the loop if user hasn't input anything
            if(partial_name.length === 0) {
                break;
            }
    
            let current_pokemon = POKEMON[i];
    
            if(current_pokemon.name.startsWith(partial_name)) {
                if(filters_to_apply.length === 0) {
                    if(isException(partial_name)) {
                        autosuggestion.innerHTML = capitalize(partial_name);
                    } else {
                        autosuggestion.innerHTML = capitalize(current_pokemon.name);
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
                                autosuggestion.innerHTML = capitalize(current_pokemon.name);
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

// Handle adding user input pokemon to selection list
function handleSelectPokemon(selected_pokemon) {
    const search_container = document.getElementById("search_container");
    const autosuggestion = document.getElementById("autosuggestion");
    const search_input = document.getElementById("search_input");
    const selection = document.getElementById("selection");

    if(selected_pokemon.size >= 6) {
        displayErrorListFull(search_container);
    } else {
        const value = autosuggestion.innerHTML;
        if(selected_pokemon[value]) {
            displayErrorAlreadySelected(search_container);
        } else if(value) {
            addToList(search_container, search_input, value, selected_pokemon, selection);
        } else {
            displayErrorInvalidName(search_container);
        }
    }
}

// Handle adding random pokemon to selection list
function handleRandomPokemon(selected_pokemon) {
    if(selected_pokemon.size >= 6) {
        displayErrorListFull(search_container);
    } else {
        let valid_random = false;
        let random_pokemon = getRandomEl(POKEMON); // this doesn't work properly until the POKEMON obj is fully loaded which takes about 15sec
        while(valid_random === false) {
            if(selected_pokemon[capitalize(random_pokemon.name)]) {
                random_pokemon = getRandomEl(POKEMON);
            } else {
                valid_random = true;
            }
        }
        addToList(search_container, search_input, capitalize(random_pokemon.name), selected_pokemon, selection);
    }
}

// checks if there's already an error message on main search page - removes it if true 
function errorAlreadyExists(search_container) {
    if(search_container.children.length === 3) {
        search_container.children.item(2).remove();
    }
}

// displays error message for "can't select more than 6 Pokemon"
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

// displays error message for "Pokemon already selected"
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

// add item to selected Pokemon list
function addToList(search_container, search_input, value, selected_pokemon, selection) {
    errorAlreadyExists(search_container);

    search_input.value = "";

    // fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}/`)
    // .then( res => res.json())
    // .then( data => selected_pokemon[value] = data);

    const item = document.createElement("li");

    item.setAttribute("id", value);
    
    selected_pokemon.size++;
    item.addEventListener("click", (event) => {
        delete selected_pokemon[value];
        selected_pokemon.size--;
        let remove_item = document.getElementById(value);
        selection.removeChild(remove_item);
    });
    
    item.innerHTML = value;
    
    selection.appendChild(item);
}

// displays error message for "User input does match any pokemon name"
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

// creates filter options
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

// returns array of user filter choices
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

// auto suggest has bugs for specific pokemon names like "mew"
// it will suggest "mewtwo" instead of "mew" so there is no way to select "mew"
// checks if user input is an exception to the auto suggest feature
// if so, returns boolean 
function isException(partial_name) {
    const names = ["mew", "pidgeot"];
    let bool = false;
    if(names.includes(partial_name)) {
        bool = true;
    }
    return bool;
}