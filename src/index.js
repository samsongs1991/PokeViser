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
    // [name, array of types --> types.type.name (1 or 2 items)]
    const POKEMON_NAMES = []; // instead of making 900 calls, find an API with list of all current pokemon and make 1 call
    for(let i = 1; i <= 898; i++) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`)
        .then(res => res.json())
        .then(data => POKEMON_NAMES.push([data.name, data.types]));
    }

// -------------------------------------------------------------------------
// initial webpage setup for user 
    const body = document.querySelector("body");

    loadTitlePage();
// -------------------------------------------------------------------------

    function loadTitlePage() {
        const body = document.querySelector("body");
            body.innerHTML = ""; 

        const outer_container = document.createElement("div");
            outer_container.setAttribute("id", "outer_container");
            body.appendChild(outer_container);
    
        const title_container = document.createElement("div");
        const title = document.createElement("img");
            title.setAttribute("class", "hidden");
            title.setAttribute("id", "title");
            // title.setAttribute("src", "https://fontmeme.com/permalink/210714/3c01a9f777551e18a4bf186dcdb73c4a.png");
            title.setAttribute("src", "resources/pokeviser_img.png");
            title.setAttribute("alt", "Poke Viser logo");
            window.addEventListener("load", (event) => {
                title.setAttribute("class", "load");
            });
            
            title.addEventListener("click", goToSearchPage);
            title_container.appendChild(title);
            outer_container.appendChild(title_container);
    
        const instructions_container = document.createElement("div");
            instructions_container.setAttribute("id", "instructions_container");
        const instructions = document.createElement("p");
            instructions.setAttribute("id", "instructions");
            instructions.innerHTML = "INSTRUCTIONS";
            const instructions_text = document.createElement("p");
                instructions_text.setAttribute("id", "instructions_text");
                instructions_text.innerHTML = "Click on the Poke Viser logo to start searching for you favorite Pokemon. Use the search bar to input the name of a Pokemon. Use the filters to tell the auto suggestor to only display Pokemon of a type you have selected. You can select up to 6 Pokemon to view and when you are ready click the VIEW STATS button to learn all about the Pokemon you selected.";
            instructions_container.appendChild(instructions);
            instructions_container.appendChild(instructions_text);
            outer_container.appendChild(instructions_container);


        const red_background = document.createElement("div");
            red_background.setAttribute("id", "red");
        const black_background = document.createElement("div");
            black_background.setAttribute("id", "black");
        const white_background = document.createElement("div");
            white_background.setAttribute("id", "white");
        const black_circle = document.createElement("div");
            black_circle.setAttribute("id", "b_circle");
        const white_circle = document.createElement("div");
            white_circle.setAttribute("id", "w_circle");
            white_circle.addEventListener("click", goToSearchPage);

        body.appendChild(red_background);
        body.appendChild(black_background);
        body.appendChild(white_background);
        body.appendChild(black_circle);
        body.appendChild(white_circle);        
    }

    function goToSearchPage() {
        body.innerHTML = ""; 
        loadBackgroundVid();
        loadHeader();
        loadMainSearchPage();
        loadFooter();
    }

    function loadHeader() {
        const header = document.createElement("header");
            body.appendChild(header);

        const title_container = document.createElement("div");
        const title = document.createElement("img");
            // title.setAttribute("src", "https://fontmeme.com/permalink/210714/3c01a9f777551e18a4bf186dcdb73c4a.png");
            title.setAttribute("src", "resources/pokeviser_img.png");
            title.setAttribute("id", "logo");
            title.addEventListener("click", goToSearchPage);
            title_container.appendChild(title);
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
        const footer_list = document.createElement("div");
            footer_list.setAttribute("id", "footer_list");
        const contact_link = document.createElement("a");
        const contact = document.createElement("p");
            contact.innerHTML = "samsongs1991@gmail.com";
        const github = document.createElement("p");
            github.innerHTML = "My GitHub";
        const github_link = document.createElement("a");
            github_link.setAttribute("href", "https://www.github.com/samsongs1991/PokeViser");
            github_link.appendChild(github);
        const IP = document.createElement("p");
            IP.innerHTML = "Pokemon belongs to Nintendo";

            body.appendChild(footer);
            footer.appendChild(footer_list);
            contact_link.appendChild(contact);
            footer_list.appendChild(IP);
            footer_list.appendChild(contact_link);
            footer_list.appendChild(github_link);
    }

    function loadMainSearchPage() {
        const selected_pokemon = {};

        const main = document.createElement("main");
            main.setAttribute("id", "searchpage");
        const filter_container = document.createElement("section");
            filter_container.setAttribute("id", "filter_container");
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
                    autosuggestion.innerHTML = ""; // since the function runs on interval, empty auto suggestion to be filled if there's a match

                    let filters_to_apply = [];
                    let boxes = document.querySelectorAll("input[type='checkbox']");
                    boxes.forEach(box => {
                        if(box.checked) {
                            filters_to_apply.push(box.value);
                        }
                    });

                    let partial_name = search_input.value;
                    partial_name = partial_name.toLowerCase();

                    for(let i = 0; i < POKEMON_NAMES.length; i++) { // iterate through every pokemon
                        if(partial_name.length === 0) {
                            break;
                        }

                        let current_pokemon = POKEMON_NAMES[i];
                        let current_pokemon_name = current_pokemon[0];

                        if(current_pokemon_name.startsWith(partial_name)) { // if user input matches the current pokemon
                            if(filters_to_apply.length === 0) { // no filter case
                                if(partial_name === "mew") {
                                    current_pokemon_name = "Mew";
                                }
                                autosuggestion.innerHTML = current_pokemon_name[0].toUpperCase() + current_pokemon_name.slice(1); // set auto suggestion
                                break;
                            } else { // filter case
                                let exit = false;
                            
                                let current_pokemon_types = current_pokemon[1];

                                if(partial_name === "mew" && filters_to_apply.includes("psychic")) {
                                    autosuggestion.innerHTML = "Mew"; // set auto suggestion
                                    exit = true;
                                } else {
                                    current_pokemon_types.forEach(type_obj => {
                                        if(filters_to_apply.includes(type_obj.type.name)) { // if the pokemon type exists among the user filters
                                            autosuggestion.innerHTML = current_pokemon_name[0].toUpperCase() + current_pokemon_name.slice(1); // set auto suggestion
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
                            const value = autosuggestion.innerHTML
                            if(selected_pokemon[value]) {
                                if(main.children.length === 4)  main.children.item(3).remove();
                                const error = document.createElement("p");
                                error.setAttribute("name", "error");
                                error.innerHTML = "Pokemon already selected";
                                main.appendChild(error);
                                setTimeout(() => {
                                    error.remove();
                                }, 5000);
                            } else if(value) {
                                if(main.children.length === 4)  main.children.item(3).remove();
                                search_input.value = "";
                                fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}/`)
                                .then( res => res.json())
                                .then( data => selected_pokemon[value] = data);
                                const item = document.createElement("li");
                                item.innerHTML = value[0].toUpperCase() + value.slice(1);
                                selection.appendChild(item);
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
                    search_button.setAttribute("value", "View Stats");
                    searchbar.appendChild(search_button);
                    search_button.addEventListener(
                        "click", function(event) {
                            event.preventDefault();

                            // load new page with selected pokemon stats
                            loadIndividualStatsPage(selected_pokemon);
                    });

        const selection_container = document.createElement("section");
            selection_container.setAttribute("id", "selection_container");
        const selection = document.createElement("ol");
            

            body.appendChild(main);
            filter_container.appendChild(filter);
            searchbar_container.appendChild(searchbar);
            selection_container.appendChild(selection);
            main.appendChild(filter_container);
            main.appendChild(searchbar_container);
            main.appendChild(selection_container);
            autosuggestion_container.appendChild(autosuggestion);
            searchbar_container.appendChild(autosuggestion_container);
    }

    function loadIndividualStatsPage(list_of_pokemon_objects) {
        loadIndividualStatsPage_structure();
        
        // create current_pokemon variable to keep track of what's currently being viewed
        // prev/next button will cycle through list of pokemon and change what is current_pokemon
        const sprites = document.getElementById("sprites");
        for(let pokemon_name in list_of_pokemon_objects) { // load sprites
            let pokemon = list_of_pokemon_objects[pokemon_name];
            let img_url = pokemon.sprites.front_default;
            let sprite_img = document.createElement("img");
            sprite_img.setAttribute("src", img_url);
            sprites.appendChild(sprite_img);
        }

        const name_arr = Object.keys(list_of_pokemon_objects);
        let current_pokemon = name_arr[0];

        loadIndividualStats(list_of_pokemon_objects[current_pokemon]);
        const view_all_button = document.getElementById("view_all");
        view_all_button.addEventListener("click", (event) => {
            loadGroupStatsPage(list_of_pokemon_objects);
        });

        
        const prev_button = document.getElementById("prev");
            prev_button.addEventListener("click", (event) => {
                let idx = name_arr.indexOf(current_pokemon);
                if(idx === 0) {
                    current_pokemon = name_arr[name_arr.length - 1];
                } else {
                    current_pokemon = name_arr[idx - 1];
                }
                loadIndividualStats(list_of_pokemon_objects[current_pokemon]);
            });
        const next_button = document.getElementById("next");
            next_button.addEventListener("click", (event) => {
                let idx = name_arr.indexOf(current_pokemon);
                if(idx === name_arr.length - 1) {
                    current_pokemon = name_arr[0];
                } else {
                    current_pokemon = name_arr[idx + 1];
                }
                loadIndividualStats(list_of_pokemon_objects[current_pokemon]);
            });

    }

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

    function loadSizeComparisonPage() {

    }

    function loadBackgroundVid() {
        const body = document.querySelector("body");
        const video = document.createElement("video");
            video.setAttribute("autoplay", "");
            video.setAttribute("muted", "");
            video.setAttribute("loop", "");
            video.setAttribute("id", "background_video");
        const source = document.createElement("source");
            source.setAttribute("src", "resources/pokeviser_background.mp4");
            source.setAttribute("type", "video/mp4");

        body.appendChild(video);
        video.appendChild(source);
    }
    
// -------------------------------------------------------------------------
    // function to get number of keys in the obj --> length of obj
    function size(object) {
        let count = 0;
        for(let k in object) { 
            count++;
        }
        return count;
    }

    // function to load html structure of individual stats page
    function loadIndividualStatsPage_structure() {
        const main = document.querySelector("main");
        main.innerHTML = "";

        const prev_button = document.createElement("button"); // will perform action within page to view prev pokemon
            prev_button.setAttribute("id", "prev");
            prev_button.innerHTML = "PREV";
        const next_button = document.createElement("button"); // will perform action within page to view next pokemon
            next_button.setAttribute("id", "next");
            next_button.innerHTML = "NEXT";

        const stats_container = document.createElement("div"); // container for all stats and images
        const sprites = document.createElement("section"); // for scrolling view of selected Pokemon
            sprites.setAttribute("id", "sprites");
        const image = document.createElement("img"); // for nice image of pokemon
            image.setAttribute("id", "image")
            image.setAttribute("height", "500px");
        const stats_1 = document.createElement("section"); // for stats - strengths/weaknesses
            stats_1.setAttribute("id", "stats_1");
        const stats_2 = document.createElement("section"); // for stats - atk, def, etc
            stats_2.setAttribute("id", "stats_2");
        const main_stats_container = document.createElement("div") // for containing center row of stats1 - img - stats2        
        const stats_3 = document.createElement("section"); // for stats - description
            stats_3.setAttribute("id", "stats_3");

        const view_all_button = document.createElement("button"); // will invoke loadGroupStatsPage
            view_all_button.innerHTML = "View all selections";
            view_all_button.setAttribute("id", "view_all");
        const view_size_button = document.createElement("button"); // will invoke loadSizeComparisonPage
            view_size_button.innerHTML = "View size comparisons";
            // view_size_button.addEventListener();

        main.appendChild(prev_button);        
        main.appendChild(stats_container);
        main.appendChild(next_button);        

        stats_container.appendChild(sprites);
        stats_container.appendChild(main_stats_container);
        stats_container.appendChild(stats_3);
        stats_container.appendChild(view_all_button);
        stats_container.appendChild(view_size_button);

        main_stats_container.appendChild(stats_1);
        main_stats_container.appendChild(image);
        main_stats_container.appendChild(stats_2);
    }

    // update individual pokemon stats being viewed
    function loadIndividualStats(data) {
        const stats_1 = document.getElementById("stats_1");
            stats_1.innerHTML = "";
            const stats_1_info = document.createElement("ul");
                stats_1.appendChild(stats_1_info);
            const flavor_text = document.createElement("li");
                stats_1_info.appendChild(flavor_text);
            const is_baby = document.createElement("li");
                stats_1_info.appendChild(is_baby);
            const is_legendary = document.createElement("li");
                stats_1_info.appendChild(is_legendary);
            const is_mythical = document.createElement("li");
                stats_1_info.appendChild(is_mythical);
            const height = document.createElement("li");
                stats_1_info.appendChild(height);
                height.innerHTML = `Height:  ${Math.floor((data.height / 3.048) * 100) / 100} feet`; // height in decimeters
            const weight = document.createElement("li");
                stats_1_info.appendChild(weight);
                weight.innerHTML = `Weight:  ${Math.floor((data.weight / 4.536) * 100) / 100} lbs`; // weight in hectograms

        const image = document.getElementById("image");
            image.setAttribute("src", `https://pokeres.bastionbot.org/images/pokemon/${data.id}.png`);
            image.setAttribute("alt", `Image of ${data.name}`);
            image.onerror = () => {
                image.setAttribute("src", data.sprites.front_default);
            }

        const stats_2 = document.getElementById("stats_2");
            stats_2.innerHTML = "";
            const stats_2_info = document.createElement("ul");
                stats_2.appendChild(stats_2_info);
            const hp = document.createElement("li");
                stats_2_info.appendChild(hp);
                hp.innerHTML = `HP:  ${data.stats[0].base_stat}`;
            const attack = document.createElement("li");
                stats_2_info.appendChild(attack);
                attack.innerHTML = `Attack:  ${data.stats[1].base_stat}`;
            const defense = document.createElement("li");
                stats_2_info.appendChild(defense);
                defense.innerHTML = `Defense:  ${data.stats[2].base_stat}`;
            const special_attack = document.createElement("li");
                stats_2_info.appendChild(special_attack);
                special_attack.innerHTML = `Special Attack: ${data.stats[3].base_stat}`;
            const special_defense = document.createElement("li");
                stats_2_info.appendChild(special_defense);
                special_defense.innerHTML = `Special Defense:  ${data.stats[4].base_stat}`;
            const speed = document.createElement("li");
                stats_2_info.appendChild(speed);
                speed.innerHTML = `Speed:  ${data.stats[5].base_stat}`;

        const stats_3 = document.getElementById("stats_3");
            stats_3.innerHTML = ""; 
            const stats_3_info = document.createElement("ul");
                stats_3.appendChild(stats_3_info);
            const type_1 = document.createElement("li");
                stats_3_info.appendChild(type_1);
                let type_1_name = data.types[0].type.name;
                type_1.innerHTML = `Primary Type:  ${type_1_name[0].toUpperCase() + type_1_name.slice(1)}`;
            const type_2 = document.createElement("li");
            if(data.types[1] !== undefined) {
                stats_3_info.appendChild(type_2);
                let type_2_name = data.types[1].type.name;
                type_2.innerHTML = `Secondary Type:  ${type_2_name[0].toUpperCase() + type_2_name.slice(1)}`;
            }

        fetch(data.species.url) // set the contents of all stats fields
        .then(res => res.json())
        .then(data => {
            let flavor_data = data.flavor_text_entries;
            let flavor_texts = [];
            for(let i = 0; i < flavor_data.length; i++) {
                let flavor = flavor_data[i];
                if(flavor.language.name === "en") {
                    flavor_texts.push(flavor.flavor_text);
                }
            }
            let random_text = getRandom(flavor_texts);
            flavor_text.innerHTML = `Description: ${random_text}`; // SET flavor_text
            if(data.is_baby) {
                is_baby.innerHTML = "Baby: Yes"; // SET baby?
            } else {
                is_baby.innerHTML = "Baby: No"; 
            }

            if(data.is_legendary) {
                is_legendary.innerHTML = "Legendary: Yes"; // SET legendary?
            } else {
                is_legendary.innerHTML = "Legendary: No";
            }

            if(data.is_mythical) {
                is_mythical.innerHTML = "Mythical: Yes"; // SET mythical?
            } else {
                is_mythical.innerHTML = "Mythical: No";
            }
        });

        for(let i = 0; i < 2; i++) {
            if(data.types[i] !== undefined) {
                fetch(data.types[i].type.url)
                .then(res => res.json())
                .then(data => {
                    let double_damage_data = data.damage_relations.double_damage_from;
                    if(double_damage_data.length > 0) {
                        const weakness = document.createElement("li");
                            weakness.innerHTML = "Receives double damage from ";
                            for(let i = 0; i < double_damage_data.length; i++) {
                                let damage_type = double_damage_data[i].name;
                                if(i === double_damage_data.length - 1) {
                                    weakness.innerHTML += damage_type + ".";
                                } else {
                                    weakness.innerHTML += damage_type + ", ";
                                }
                            }
                            if(i === 0) {
                                type_1.appendChild(weakness);
                            } else {
                                type_2.appendChild(weakness);
                            }
                    }
                    let half_damage_data = data.damage_relations.half_damage_from;
                    if(half_damage_data.length > 0) {
                        const strength = document.createElement("li");
                            strength.innerHTML = "Receives half damage from ";
                            for(let i = 0; i < half_damage_data.length; i++) {
                                let damage_type = half_damage_data[i].name;
                                if(i === half_damage_data.length - 1) {
                                    strength.innerHTML += damage_type + ".";
                                } else {
                                    strength.innerHTML += damage_type + ", ";
                                }
                            }
                            if(i === 0) {
                                type_1.appendChild(strength);
                            } else {
                                type_2.appendChild(strength);
                            }                    
                    }
                    let no_damage_data = data.damage_relations.no_damage_from;
                    if(no_damage_data.length > 0) {
                        const immunity = document.createElement("li");
                            immunity.innerHTML = "Receives zero damage from ";
                            for(let i = 0; i < no_damage_data.length; i++) {
                                let damage_type = no_damage_data[i].name;
                                if(i === no_damage_data.length -1) {
                                    immunity.innerHTML += damage_type + ".";
                                } else {
                                    immunity.innerHTML += damage_type + ", ";
                                }
                            }
                            if(i === 0) {
                                type_1.appendChild(immunity);
                            } else {
                                type_2.appendChild(immunity);
                            }                    
                    }
                });
            }
        }
    }

    // get random el from the array
    function getRandom(array) {
        let random_index = Math.floor(Math.random() * array.length);
        return array[random_index];
    }

// -------------------------------------------------------------------------

})







// -------------------------------------------------------------------------
// TO WORK ON LATER - BONUS
//
// instead of auto suggest just being a single suggestion, 
//  - make it an entire selection of auto suggestions
//
// refactor all code
// - especially loadMainSearchPage
//
// add button to remove from selected pokemon list
//
// check if selected pokemon list has at least 1 pokemon
//
// add evolution chain to stats_2
// data.species.url --> .evolution_chain.url
//
// add random pokemon button on search page
//
// adding different language options