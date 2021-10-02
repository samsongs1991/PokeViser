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
export let POKEMON = {}

export function cachePokemon(cache) {
    if(cache[1] === undefined) {
        for(let i = 1; i <= 898; i++) {
            fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`)
            .then(res => res.json())
            .then(data => cache[i] = data);
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
    const selected_pokemon = {};
    
    const body = document.querySelector("body");
    
    // Create html elements and set attributes
    const main = document.createElement("main");
        main.setAttribute("id", "searchpage");

    // Create html elements and set attributes - Container for filter options
    const filter_container = document.createElement("section");
        filter_container.setAttribute("id", "filter_container");
    const filter = document.createElement("form");
        const filter_label = document.createElement("label");
            filter_label.innerHTML = "Filters: ";
            filter.appendChild(filter_label);
        createFilterOptions(TYPES, filter);

    // Create html elements and set attributes - Container for search bar
    const searchbar_container = document.createElement("section");
        searchbar_container.setAttribute("id", "searchbar_container");
    const searchbar = document.createElement("form");
        const search_label = document.createElement("label");
            search_label.innerHTML = "Search by name: ";
            searchbar.appendChild(search_label);
        const search_input = document.createElement("input");
            search_input.setAttribute("type", "text");
            search_input.setAttribute("name", "search_input");
            search_input.setAttribute("value", "");
            search_input.setAttribute("placeholder", "Name of Pokemon");
            searchbar.appendChild(search_input);

            // -----------------------------------------------------------
            // auto suggestion code for search input
            const autosuggestion_container = document.createElement("div");
                autosuggestion_container.setAttribute("id", "autosuggestion_container");
            const autosuggestion = document.createElement("p");
                autosuggestion.setAttribute("id", "autosuggestion");
            
            setInterval(function() {
                autosuggestion.innerHTML = "";
                let filters_to_apply = getUserFilters();
                let partial_name = search_input.value;
                partial_name = partial_name.toLowerCase();
                for(let i = 0; i < POKEMON_NAMES.length; i++) { // iterate through every pokemon
                    if(partial_name.length === 0) {
                        break;
                    }

                    let current_pokemon = POKEMON_NAMES[i];
                    let current_pokemon_name = current_pokemon[0];

                    if(current_pokemon_name.startsWith(partial_name)) {
                        if(filters_to_apply.length === 0) {
                            if(isException(partial_name, current_pokemon_name)) {
                                current_pokemon_name = partial_name;
                            };
                            autosuggestion.innerHTML = capitalize(current_pokemon_name);
                            break;
                        } else { // filter case
                            let exit = false;
                        
                            let current_pokemon_types = current_pokemon[1];

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
                                current_pokemon_types.forEach(type_obj => {
                                    if(filters_to_apply.includes(type_obj.type.name)) { // if the pokemon type exists among the user filters
                                        autosuggestion.innerHTML = capitalize(current_pokemon_name);
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
            }, 100);
            // -----------------------------------------------------------

        const button_container = document.createElement("div");
            button_container.setAttribute("id", "button_container");
        const select_button = document.createElement("input");
            select_button.setAttribute("type", "submit");
            select_button.setAttribute("value", "Add to list");
            button_container.appendChild(select_button);
            select_button.addEventListener("click", (event) => {
                    event.preventDefault();
                    if(size(selected_pokemon) >= 6) {
                        displayErrorListFull(searchbar_container);
                    } else {
                        const value = autosuggestion.innerHTML;
                        if(selected_pokemon[value]) {
                            displayErrorAlreadySelected(searchbar_container);
                        } else if(value) {
                            addToList(searchbar_container, search_input, value, selected_pokemon, selection);
                        } else {
                            displayErrorInvalidName(searchbar_container);
                        }
                    }
                }
            );

        const random_button = document.createElement("input");
            random_button.setAttribute("type", "submit");
            random_button.setAttribute("value", "Random");
            button_container.appendChild(random_button);
            random_button.addEventListener("click", (event) => {
                event.preventDefault();

                // --------------------------------------------------------------------
                // it works but able to exceed 6 for a short time
                if(size(selected_pokemon) >= 6) {
                    displayErrorListFull(searchbar_container);
                } else {
                    let valid_random = false;
                    let random_pokemon = getRandomEl(POKEMON_NAMES);
                    while(valid_random === false) {
                        if(selected_pokemon[capitalize(random_pokemon[0])]) {
                            random_pokemon = getRandomEl(POKEMON_NAMES);
                        } else {
                            valid_random = true;
                        }
                    }
                    addToList(searchbar_container, search_input, capitalize(random_pokemon[0]), selected_pokemon, selection);
                }
                // --------------------------------------------------------------------

            });

        const search_button = document.createElement("input");
            search_button.setAttribute("type", "submit");
            search_button.setAttribute("value", "View stats");
            button_container.appendChild(search_button);
            search_button.addEventListener(
                "click", (event) => {
                    event.preventDefault();
                    if(size(selected_pokemon) > 0) {
                        loadIndividualStatsPage(selected_pokemon);
                    }
            }); 

    // Create html elements and set attributes - Container for user Pokemon selections
    const selection_container = document.createElement("section");
        selection_container.setAttribute("id", "selection_container");
    const selection = document.createElement("ol");
        
    // Setup html relationships to create skeleton
    body.appendChild(main);
    filter_container.appendChild(filter);
    searchbar.appendChild(button_container)
    searchbar_container.appendChild(searchbar);
    selection_container.appendChild(selection);
    main.appendChild(filter_container);
    main.appendChild(searchbar_container);
    main.appendChild(selection_container);
    autosuggestion_container.appendChild(autosuggestion);
    searchbar_container.appendChild(autosuggestion_container);
}







// checks if there's already an error message on main search page - removes it if true 
function errorAlreadyExists(searchbar_container) {
    if(searchbar_container.children.length === 3) {
        searchbar_container.children.item(2).remove();
    }
}

// displays error message for "can't select more than 6 Pokemon"
function displayErrorListFull(searchbar_container) {
    errorAlreadyExists(searchbar_container);
    const error = document.createElement("p");
    error.setAttribute("name", "error");
    error.innerHTML = "Cannot select more than 6 Pokemon";
    searchbar_container.appendChild(error);
    setTimeout(() => {
        error.remove();
    }, 5000);  
}

// displays error message for "Pokemon already selected"
function displayErrorAlreadySelected(searchbar_container) {
    errorAlreadyExists(searchbar_container);
    const error = document.createElement("p");
    error.setAttribute("name", "error");
    error.innerHTML = "Pokemon already selected";
    searchbar_container.appendChild(error);
    setTimeout(() => {
        error.remove();
    }, 5000);
}

// add item to selected Pokemon list
function addToList(searchbar_container, search_input, value, selected_pokemon, selection) {
    errorAlreadyExists(searchbar_container);
    search_input.value = "";
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}/`)
    .then( res => res.json())
    .then( data => selected_pokemon[value] = data);
    const item = document.createElement("li");
        item.setAttribute("id", value);
        item.addEventListener("click", (event) => {
            delete selected_pokemon[value];
            let remove_item = document.getElementById(value);
            selection.removeChild(remove_item);
        });
    item.innerHTML = value;
    selection.appendChild(item);
}

// displays error message for "User input does match any pokemon name"
function displayErrorInvalidName(searchbar_container) {
    errorAlreadyExists(searchbar_container);
    const error = document.createElement("p");
    error.setAttribute("name", "error");
    error.innerHTML = "Invalid Pokemon name";
    searchbar_container.appendChild(error);
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
function isException(partial_name, current_pokemon_name) {
    const names = ["mew", "pidgeot"];
    let bool = false;
    if(names.includes(partial_name)) {
        bool = true;
    }
    return bool;
}   



// -------------------------------------------------------------------------