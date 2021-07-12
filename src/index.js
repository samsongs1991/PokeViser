

document.addEventListener("DOMContentLoaded", () => {

    // TYPES contains all Pokemon types and their hex color codes
    const TYPES = {
        "Normal": "AAB09F",
        "Fire": "EA7A3C",
        "Water": "539AE2",
        "Electric": "E5C531",
        "Grass": "71C558",
        "Ice": "70CBD4",
        "Fighting": "CB5F48",
        "Poison": "B468B7",
        "Ground": "CC9F4F",
        "Flying": "7DA6DE",
        "Psychic": "E5709B",
        "Bug": "94BC4A",
        "Rock": "B2A061",
        "Ghost": "846AB6",
        "Dragon": "6A7BAF ",
        "Dark": "736C75 ",
        "Steel": "89A1B0",
        "Fairy": "E397D1"
    };

    // POKEMON_NAMES is an array of all 898 pokemon names in a lowercased string
    const POKEMON_NAMES = [];
    for(let i = 1; i <= 898; i++) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`)
        .then( res => res.json())
        .then( data => POKEMON_NAMES.push(data.species.name));
    }

// -------------------------------------------------------------------------
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
        // clear the title page
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
                let filter_option_label = document.createElement("label");
                    filter_option_label.innerHTML = type;

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
            const submit_button = document.createElement("input");
                submit_button.setAttribute("type", "submit");
                submit_button.setAttribute("value", "Search");
                searchbar.appendChild(submit_button);
                submit_button.addEventListener(
                    "click", function(event) {
                        event.preventDefault();
                    }
                );

            body.appendChild(main);
            filter_container.appendChild(filter);
            searchbar_container.appendChild(searchbar);
            main.appendChild(filter_container);
            main.appendChild(searchbar_container);
    }
// -------------------------------------------------------------------------

})