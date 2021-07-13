document.addEventListener("DOMContentLoaded", () => {

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
    const POKEMON_NAMES = [];
    for(let i = 1; i <= 898; i++) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`)
        .then( res => res.json())
        .then( data => POKEMON_NAMES.push(data.species.name));
    }

// -------------------------------------------------------------------------
// initial webpage setup for user 
    const body = document.querySelector("body");

    loadTitlePage();
// -------------------------------------------------------------------------

    function loadTitlePage() {
        body.innerHTML = ""; 

        const outer_container = document.createElement("div");
            body.appendChild(outer_container);
    
        const title_container = document.createElement("div");
        const title = document.createElement("p");
            title.innerHTML = "Poke Viser";
            title_container.appendChild(title);
            outer_container.appendChild(title_container);
    
        const logo_container = document.createElement("div");
        const logo = document.createElement("img");
            logo.addEventListener("click", goToSearchPage);
            logo.setAttribute("src", "");
            logo.setAttribute("alt", "Poke Viser logo");
            logo_container.appendChild(logo);
            outer_container.appendChild(logo_container);
    
        const instructions_container = document.createElement("div");
        const instructions = document.createElement("p");
            instructions.innerHTML = "Instructions: ";
            instructions_container.appendChild(instructions);
            outer_container.appendChild(instructions_container);
    }

    function goToSearchPage() {
        body.innerHTML = ""; 

        loadHeader();
        loadMainSearchPage();
        loadFooter();
    }

    function loadHeader() {
        const header = document.createElement("header");
            body.appendChild(header);

        const title_container = document.createElement("div");
        const title = document.createElement("p");
            title.innerHTML = "Poke Viser";
            title.addEventListener("click", goToSearchPage);
            title_container.appendChild(title);
        const logo = document.createElement("img");
            logo.addEventListener("click", goToSearchPage);
            logo.setAttribute("src", "");
            logo.setAttribute("alt", "Poke Viser logo");
            title_container.appendChild(logo);
        const navbar = document.createElement("nav");
        const navlist = document.createElement("ul");
        const home = document.createElement("li");
            home.innerHTML = "Home";
            home.addEventListener("click", loadTitlePage);
        const search = document.createElement("li");
            search.innerHTML = "Poke Search";
            search.addEventListener("click", goToSearchPage);
        const about = document.createElement("li");
            about.innerHTML = "About";
            // Need to link the About to a separate page loading new 
            // content with descriptions about stuff

            navlist.appendChild(home);
            navlist.appendChild(search);
            navlist.appendChild(about);
            navbar.appendChild(navlist);
            header.appendChild(title_container);
            header.appendChild(navbar);
    }

    function loadFooter() {
        const footer = document.createElement("footer");
        const footer_list = document.createElement("ul");
        const contact_link = document.createElement("a");
        const contact = document.createElement("li");
            contact.innerHTML = "Contact";
        const disclaimer = document.createElement("li");
            disclaimer.innerHTML = "Info may not be accurate depending on the particular Pokemon game";
        const IP = document.createElement("li");
            IP.innerHTML = "All Pokemon IP and rights belong to Nintendo";

            body.appendChild(footer);
            footer.appendChild(footer_list);
            contact_link.appendChild(contact);
            footer_list.appendChild(contact_link);
            footer_list.appendChild(disclaimer);
            footer_list.appendChild(IP);
    }

    function loadMainSearchPage() {
        const selected_pokemon = {};

        const main = document.createElement("main");

        const filter_container = document.createElement("section");
        const filter = document.createElement("form");
            const filter_label = document.createElement("label");
                filter_label.innerHTML = "Filters: ";
                filter.appendChild(filter_label);
            for(let type in TYPES) {
                let filter_option = document.createElement("input");
                    filter_option.setAttribute("type", "checkbox");
                    filter_option.setAttribute("name", type);
                    filter_option.setAttribute("value", type);
                let filter_option_label = document.createElement("label");
                    filter_option_label.innerHTML = type[0].toUpperCase() + type.slice(1);

                    filter.appendChild(filter_option);
                    filter.appendChild(filter_option_label);
            };

        const searchbar_container = document.createElement("section");
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
                const autosuggestion = document.createElement("p");
                setInterval(function() {
                    if(search_input.value.length === 0) {
                        autosuggestion.innerHTML = "";
                    } else if(search_input.value.length !== 0) {
                        let partial_name = search_input.value;
                        for(let i = 0; i < POKEMON_NAMES.length; i++) {
                            let name = POKEMON_NAMES[i];
                            if(name.startsWith(partial_name)) {
                                autosuggestion.innerHTML = name;
                                break;
                            }
                        }
                    }
                }, 100);
                autosuggestion_container.appendChild(autosuggestion);
                searchbar_container.appendChild(autosuggestion_container);
                // -----------------------------------------------------------

            const select_button = document.createElement("input");
                select_button.setAttribute("type", "submit");
                select_button.setAttribute("value", "Add to list");
                searchbar.appendChild(select_button);
                select_button.addEventListener(
                    "click", function(event) {
                        event.preventDefault();
                        if(size(selected_pokemon) >= 6) {
                            if(main.children.length === 4)  main.children.item(3).remove();
                            const error = document.createElement("p");
                            error.setAttribute("name", "error");
                            error.innerHTML = "Cannot select more than 6 Pokemon";
                            main.appendChild(error);
                            setTimeout(() => {
                                error.remove();
                            }, 5000);                        
                        } else {
                            const value = search_input.value.toLowerCase();
                            if(selected_pokemon[value]) {
                                if(main.children.length === 4)  main.children.item(3).remove();
                                const error = document.createElement("p");
                                error.setAttribute("name", "error");
                                error.innerHTML = "Pokemon already selected";
                                main.appendChild(error);
                                setTimeout(() => {
                                    error.remove();
                                }, 5000);
                            } else if(POKEMON_NAMES.includes(value)) {
                                if(main.children.length === 4)  main.children.item(3).remove();
                                search_input.value = "";
                                fetch(`https://pokeapi.co/api/v2/pokemon/${value}/`)
                                .then( res => res.json())
                                .then( data => selected_pokemon[value] = data);
                                const item = document.createElement("li");
                                item.innerHTML = value;
                                selection.appendChild(item);
                                console.log(selected_pokemon);
                            } else {
                                if(main.children.length === 4)  main.children.item(3).remove();
                                const error = document.createElement("p");
                                error.setAttribute("name", "error");
                                error.innerHTML = "Invalid Pokemon name";
                                main.appendChild(error);
                                setTimeout(() => {
                                    error.remove();
                                }, 5000);
                            }
                        }
                    }
                );
            const search_button = document.createElement("input");
                    search_button.setAttribute("type", "submit");
                    search_button.setAttribute("value", "Search");
                    searchbar.appendChild(search_button);
                    search_button.addEventListener(
                        "click", function(event) {
                            event.preventDefault();

                            // load new page with selected pokemon stats
                    });

        const selection_container = document.createElement("section");
        const selection = document.createElement("ul");
            
            body.appendChild(main);
            filter_container.appendChild(filter);
            searchbar_container.appendChild(searchbar);
            selection_container.appendChild(selection);
            main.appendChild(filter_container);
            main.appendChild(searchbar_container);
            main.appendChild(selection_container);
            
    }

// -------------------------------------------------------------------------
// Object.prototype custom functions
    function size(object) {
        let count = 0;
        for(let k in object) { 
            count++;
        }
        return count;
    }
// -------------------------------------------------------------------------

})

// apply filter to auto suggestions

// collect values of all checked boxes in an array
const filters_to_apply = [];
let boxes = document.querySelectorAll("input[type='checkbox']");
boxes.forEach(box => {
    filters_to_apply.push(box.value);
});
console.log(filters_to_apply);