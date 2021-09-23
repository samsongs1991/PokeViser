// To load title page after DOMContentLoaded
import { loadTitlePage } from './title_page'

document.addEventListener("DOMContentLoaded", () => {


// -------------------------------------------------------------------------
// initial webpage setup for user 
    loadTitlePage();
// -------------------------------------------------------------------------

    // function loadTitlePage() {
    //     const body = document.querySelector("body");
    //     const outer_container = document.createElement("div");
    //     const title_container = document.createElement("div");
    //     const title = document.createElement("img");
    //     const instructions_container = document.createElement("div");
    //     const instructions = document.createElement("p");
    //     const instructions_text = document.createElement("p");

    //     body.innerHTML = ""; 
        
    //     outer_container.setAttribute("id", "outer_container");
    //     title_container.setAttribute("id", "title_container");
    //     title.setAttribute("class", "hidden");
    //     title.setAttribute("id", "title");
    //     title.setAttribute("src", "resources/pokeviser_img.png");
    //     title.setAttribute("alt", "Poke Viser logo");
    //     instructions_container.setAttribute("id", "instructions_container");
    //     instructions.setAttribute("id", "instructions");
    //     instructions_text.setAttribute("id", "instructions_text");

    //     window.setTimeout(() => {
    //         title.setAttribute("class", "load");
    //     }, 1000);
        
    //     instructions.innerHTML = "INSTRUCTIONS";
    //     instructions_text.innerHTML = "Click on the Poke Viser logo to start searching for you favorite Pokemon. Use the search bar to input the name of a Pokemon. Use the filters to tell the auto suggestor to only display Pokemon of a type you have selected. You can select up to 6 Pokemon to view and when you are ready click the VIEW STATS button to learn all about the Pokemon you selected.";
        
    //     title.addEventListener("click", goToSearchPage);
        
    //     body.appendChild(outer_container);
    //     outer_container.appendChild(title_container);
    //     outer_container.appendChild(instructions_container);
    //     title_container.appendChild(title);
    //     instructions_container.appendChild(instructions);
    //     instructions_container.appendChild(instructions_text);
        
    //     // background of title page for CSS purposes only
    //     const red_background = document.createElement("div");
    //     const black_background = document.createElement("div");
    //     const white_background = document.createElement("div");
    //     const black_circle = document.createElement("div");
    //     const white_circle = document.createElement("div");

    //     body.appendChild(red_background);
    //     body.appendChild(black_background);
    //     body.appendChild(white_background);
    //     body.appendChild(black_circle);
    //     body.appendChild(white_circle);  

    //     red_background.setAttribute("id", "red");
    //     black_background.setAttribute("id", "black");
    //     white_background.setAttribute("id", "white");
    //     black_circle.setAttribute("id", "b_circle");
    //     white_circle.setAttribute("id", "w_circle");

    //     white_circle.addEventListener("click", goToSearchPage);
    // }

    // function goToSearchPage() {
    //     const body = document.querySelector("body");
    //     body.innerHTML = ""; 
    //     loadBackgroundVid();
    //     loadHeader();
    //     loadMainSearchPage();
    //     loadFooter();
    // }

    // function loadHeader() {
    //     const body = document.querySelector("body");
    //     const header = document.createElement("header");
    //     const title_container = document.createElement("div");
    //     const title = document.createElement("img");
    //     const navbar = document.createElement("nav");
    //     const navlist = document.createElement("ul");
    //     const home = document.createElement("li");
    //     const search = document.createElement("li");
    //     const about = document.createElement("li");
        
    //     body.appendChild(header);
    //     header.appendChild(title_container);
    //     header.appendChild(navbar);
    //     title_container.appendChild(title);
    //     navbar.appendChild(navlist);
    //     navlist.appendChild(home);
    //     navlist.appendChild(search);
    //     navlist.appendChild(about);

    //     title.setAttribute("src", "resources/pokeviser_img.png");
    //     title.setAttribute("id", "logo");
        
    //     title.addEventListener("click", goToSearchPage);
    //     home.addEventListener("click", loadTitlePage);
    //     search.addEventListener("click", goToSearchPage);
            
    //     home.innerHTML = "Home";
    //     search.innerHTML = "Poke Search";
    //     about.innerHTML = "About";
    // }

    // function loadFooter() {
    //     const body = document.querySelector("body");
    //     const footer = document.createElement("footer");
    //     const footer_list = document.createElement("div");
    //     const IP = document.createElement("p");
    //     const email_link = document.createElement("a");
    //     const email = document.createElement("p");
    //     const github_link = document.createElement("a");
    //     const github = document.createElement("p");

    //     body.appendChild(footer);
    //     footer.appendChild(footer_list);
    //     footer_list.appendChild(IP);
    //     footer_list.appendChild(email_link);
    //     footer_list.appendChild(github_link);
    //     email_link.appendChild(email);
    //     github_link.appendChild(github);

    //     footer_list.setAttribute("id", "footer_list");
    //     github_link.setAttribute("href", "https://www.github.com/samsongs1991/PokeViser");
        
    //     IP.innerHTML = "Pokemon belongs to Nintendo";
    //     email.innerHTML = "samsongs1991@gmail.com";
    //     github.innerHTML = "My GitHub";
    // }

    // function loadMainSearchPage() {
    //     const body = document.querySelector("body");

    //     const selected_pokemon = {};

    //     const main = document.createElement("main");
    //         main.setAttribute("id", "searchpage");
    //     const filter_container = document.createElement("section");
    //         filter_container.setAttribute("id", "filter_container");
    //     const filter = document.createElement("form");
    //         const filter_label = document.createElement("label");
    //             filter_label.innerHTML = "Filters: ";
    //             filter.appendChild(filter_label);
    //         createFilterOptions(TYPES, filter);

    //     const searchbar_container = document.createElement("section");
    //         searchbar_container.setAttribute("id", "searchbar_container");
    //     const searchbar = document.createElement("form");
    //         const search_label = document.createElement("label");
    //             search_label.innerHTML = "Search by name: ";
    //             searchbar.appendChild(search_label);
    //         const search_input = document.createElement("input");
    //             search_input.setAttribute("type", "text");
    //             search_input.setAttribute("name", "search_input");
    //             search_input.setAttribute("value", "");
    //             search_input.setAttribute("placeholder", "Name of Pokemon");
    //             searchbar.appendChild(search_input);

    //             // -----------------------------------------------------------
    //             // auto suggestion code for search input
    //             const autosuggestion_container = document.createElement("div");
    //                 autosuggestion_container.setAttribute("id", "autosuggestion_container");
    //             const autosuggestion = document.createElement("p");
    //                 autosuggestion.setAttribute("id", "autosuggestion");
                
    //             setInterval(function() {
    //                 autosuggestion.innerHTML = "";
    //                 let filters_to_apply = getUserFilters();
    //                 let partial_name = search_input.value;
    //                 partial_name = partial_name.toLowerCase();
    //                 for(let i = 0; i < POKEMON_NAMES.length; i++) { // iterate through every pokemon
    //                     if(partial_name.length === 0) {
    //                         break;
    //                     }

    //                     let current_pokemon = POKEMON_NAMES[i];
    //                     let current_pokemon_name = current_pokemon[0];

    //                     if(current_pokemon_name.startsWith(partial_name)) {
    //                         if(filters_to_apply.length === 0) {
    //                             if(isException(partial_name, current_pokemon_name)) {
    //                                 current_pokemon_name = partial_name;
    //                             };
    //                             autosuggestion.innerHTML = capitalize(current_pokemon_name);
    //                             break;
    //                         } else { // filter case
    //                             let exit = false;
                            
    //                             let current_pokemon_types = current_pokemon[1];

    //                             if(partial_name === "mew" && filters_to_apply.includes("psychic")) {
    //                                 autosuggestion.innerHTML = "Mew"; // set auto suggestion
    //                                 exit = true;
    //                             } else if(partial_name === "pidgeot" && filters_to_apply.includes("normal")) {
    //                                 autosuggestion.innerHTML = "Pidgeot"; // set auto suggestion
    //                                 exit = true;
    //                             } else if(partial_name === "pidgeot" && filters_to_apply.includes("flying")) {
    //                                 autosuggestion.innerHTML = "Pidgeot"; // set auto suggestion
    //                                 exit = true;
    //                             } 
                                
    //                             else {
    //                                 current_pokemon_types.forEach(type_obj => {
    //                                     if(filters_to_apply.includes(type_obj.type.name)) { // if the pokemon type exists among the user filters
    //                                         autosuggestion.innerHTML = capitalize(current_pokemon_name);
    //                                         exit = true;
    //                                     }
    //                                 });
    //                             }

    //                             if(exit) {
    //                                 break;
    //                             }
    //                         }
    //                     }
    //                 }
    //             }, 100);
    //             // -----------------------------------------------------------

    //         const button_container = document.createElement("div");
    //             button_container.setAttribute("id", "button_container");
    //         const select_button = document.createElement("input");
    //             select_button.setAttribute("type", "submit");
    //             select_button.setAttribute("value", "Add to list");
    //             button_container.appendChild(select_button);
    //             select_button.addEventListener("click", (event) => {
    //                     event.preventDefault();
    //                     if(size(selected_pokemon) >= 6) {
    //                         displayErrorListFull(searchbar_container);
    //                     } else {
    //                         const value = autosuggestion.innerHTML;
    //                         if(selected_pokemon[value]) {
    //                             displayErrorAlreadySelected(searchbar_container);
    //                         } else if(value) {
    //                             addToList(searchbar_container, search_input, value, selected_pokemon, selection);
    //                         } else {
    //                             displayErrorInvalidName(searchbar_container);
    //                         }
    //                     }
    //                 }
    //             );

    //         const random_button = document.createElement("input");
    //             random_button.setAttribute("type", "submit");
    //             random_button.setAttribute("value", "Random");
    //             button_container.appendChild(random_button);
    //             random_button.addEventListener("click", (event) => {
    //                 event.preventDefault();

    //                 // --------------------------------------------------------------------
    //                 // it works but able to exceed 6 for a short time
    //                 if(size(selected_pokemon) >= 6) {
    //                     displayErrorListFull(searchbar_container);
    //                 } else {
    //                     let valid_random = false;
    //                     let random_pokemon = getRandomEl(POKEMON_NAMES);
    //                     while(valid_random === false) {
    //                         if(selected_pokemon[capitalize(random_pokemon[0])]) {
    //                             random_pokemon = getRandomEl(POKEMON_NAMES);
    //                         } else {
    //                             valid_random = true;
    //                         }
    //                     }
    //                     addToList(searchbar_container, search_input, capitalize(random_pokemon[0]), selected_pokemon, selection);
    //                 }
    //                 // --------------------------------------------------------------------

    //             });

    //         const search_button = document.createElement("input");
    //             search_button.setAttribute("type", "submit");
    //             search_button.setAttribute("value", "View stats");
    //             button_container.appendChild(search_button);
    //             search_button.addEventListener(
    //                 "click", (event) => {
    //                     event.preventDefault();
    //                     if(size(selected_pokemon) > 0) {
    //                         loadIndividualStatsPage(selected_pokemon);
    //                     }
    //             }); 

    //     const selection_container = document.createElement("section");
    //         selection_container.setAttribute("id", "selection_container");
    //     const selection = document.createElement("ol");
            

    //         body.appendChild(main);
    //         filter_container.appendChild(filter);
    //         searchbar.appendChild(button_container)
    //         searchbar_container.appendChild(searchbar);
    //         selection_container.appendChild(selection);
    //         main.appendChild(filter_container);
    //         main.appendChild(searchbar_container);
    //         main.appendChild(selection_container);
    //         autosuggestion_container.appendChild(autosuggestion);
    //         searchbar_container.appendChild(autosuggestion_container);
    // }

    // function loadIndividualStatsPage(list_of_pokemon_objects) {
    //     const main = document.querySelector("main");
    //     main.setAttribute("id", "individual_stats_page");

    //     loadIndividualStatsPage_structure();
        
    //     // create current_pokemon variable to keep track of what's currently being viewed
    //     // prev/next button will cycle through list of pokemon and change what is current_pokemon
    //     const sprites = document.getElementById("sprites");
    //     for(let pokemon_name in list_of_pokemon_objects) { // load sprites
    //         let pokemon = list_of_pokemon_objects[pokemon_name];
    //         let img_url = pokemon.sprites.front_default;
    //         let sprite_img = document.createElement("img");
    //         sprite_img.setAttribute("src", img_url);
    //         sprites.appendChild(sprite_img);
    //     }

    //     const name_arr = Object.keys(list_of_pokemon_objects);
    //     let current_pokemon = name_arr[0];

    //     loadIndividualStats(list_of_pokemon_objects[current_pokemon]);
    //     const view_all_button = document.getElementById("view_all");
    //     view_all_button.addEventListener("click", (event) => {
    //         loadGroupStatsPage(list_of_pokemon_objects);
    //     });

        
    //     const prev_button = document.getElementById("prev");
    //         prev_button.addEventListener("click", (event) => {
    //             let idx = name_arr.indexOf(current_pokemon);
    //             if(idx === 0) {
    //                 current_pokemon = name_arr[name_arr.length - 1];
    //             } else {
    //                 current_pokemon = name_arr[idx - 1];
    //             }
    //             loadIndividualStats(list_of_pokemon_objects[current_pokemon]);
    //         });
    //     const next_button = document.getElementById("next");
    //         next_button.addEventListener("click", (event) => {
    //             let idx = name_arr.indexOf(current_pokemon);
    //             if(idx === name_arr.length - 1) {
    //                 current_pokemon = name_arr[0];
    //             } else {
    //                 current_pokemon = name_arr[idx + 1];
    //             }
    //             loadIndividualStats(list_of_pokemon_objects[current_pokemon]);
    //         });
    //     document.addEventListener("keydown", (event) => {
    //         if(event.key === "ArrowRight") {
    //             let idx = name_arr.indexOf(current_pokemon);
    //             if(idx === name_arr.length - 1) {
    //                 current_pokemon = name_arr[0];
    //             } else {
    //                 current_pokemon = name_arr[idx + 1];
    //             }
    //             loadIndividualStats(list_of_pokemon_objects[current_pokemon]);
    //         } else if(event.key === "ArrowLeft") {
    //             let idx = name_arr.indexOf(current_pokemon);
    //             if(idx === 0) {
    //                 current_pokemon = name_arr[name_arr.length - 1];
    //             } else {
    //                 current_pokemon = name_arr[idx - 1];
    //             }
    //             loadIndividualStats(list_of_pokemon_objects[current_pokemon]);
    //         }
    //     });
    // }

    // function loadGroupStatsPage(list_of_pokemon_objects) {
    //     const main = document.querySelector("main");
    //         main.innerHTML ="";

    //     console.log(list_of_pokemon_objects);

    //     // iterate through pokemon
    //     // - create a new article element
    //     // - append it to main
    //     // - - append an image to article
    //     // - - append types and damage relations to article


    // }

    // function loadSizeComparisonPage() {

    // }

    // function loadBackgroundVid() {
    //     const body = document.querySelector("body");
    //     const video = document.createElement("video");
    //     const source = document.createElement("source");
        
    //     body.appendChild(video);
    //     video.appendChild(source);
        
    //     video.setAttribute("autoplay", "");
    //     video.setAttribute("muted", "");
    //     video.setAttribute("loop", "");
    //     video.setAttribute("id", "background_video");
    //     source.setAttribute("src", "resources/pokeviser_background.mp4");
    //     source.setAttribute("type", "video/mp4");
    // }
    
// // -------------------------------------------------------------------------
//     // function to get number of keys in the obj --> length of obj
//     function size(object) {
//         let count = 0;
//         for(let k in object) { 
//             count++;
//         }
//         return count;
//     }

//     // function to load html structure of individual stats page
//     function loadIndividualStatsPage_structure() {
//         const main = document.querySelector("main");
//         main.innerHTML = "";

//         const prev_button = document.createElement("button"); // will perform action within page to view prev pokemon
//             prev_button.setAttribute("id", "prev");
//             prev_button.innerHTML = "PREV";
//         const next_button = document.createElement("button"); // will perform action within page to view next pokemon
//             next_button.setAttribute("id", "next");
//             next_button.innerHTML = "NEXT";

//         const stats_container = document.createElement("div"); // container for all stats and images
//             stats_container.setAttribute("id", "stats_container");
//         const sprites = document.createElement("section"); // for scrolling view of selected Pokemon
//             sprites.setAttribute("id", "sprites");
//         const image = document.createElement("img"); // for nice image of pokemon
//             image.setAttribute("id", "image")
//             image.setAttribute("height", "400px");
//         const stats_1 = document.createElement("section"); // for stats - strengths/weaknesses
//             stats_1.setAttribute("id", "stats_1");
//         const stats_2 = document.createElement("section"); // for stats - atk, def, etc
//             stats_2.setAttribute("id", "stats_2");
//         const main_stats_container = document.createElement("div") // for containing center row of stats1 - img - stats2 
//             main_stats_container.setAttribute("id", "main_stats_container");       
//         const stats_3 = document.createElement("section"); // for stats - description
//             stats_3.setAttribute("id", "stats_3");

//         const new_view_container = document.createElement("div");
//             new_view_container.setAttribute("id", "new_view_container");
//         const view_all_button = document.createElement("button"); // will invoke loadGroupStatsPage
//             view_all_button.innerHTML = "View all selections";
//             view_all_button.setAttribute("id", "view_all");
//         const view_size_button = document.createElement("button"); // will invoke loadSizeComparisonPage
//             view_size_button.innerHTML = "View size comparisons";
//             // view_size_button.addEventListener();

//         main.appendChild(prev_button);        
//         main.appendChild(stats_container);
//         main.appendChild(next_button);        

//         stats_container.appendChild(sprites);
//         stats_container.appendChild(main_stats_container);
//         stats_container.appendChild(stats_3);
//         new_view_container.appendChild(view_all_button);
//         new_view_container.appendChild(view_size_button);
//         stats_container.appendChild(new_view_container);

//         main_stats_container.appendChild(stats_1);
//         main_stats_container.appendChild(image);
//         main_stats_container.appendChild(stats_2);
//     }

//     // update individual pokemon stats being viewed
//     function loadIndividualStats(data) {
//         const stats_1 = document.getElementById("stats_1");
//             stats_1.innerHTML = "";
//             const stats_1_info = document.createElement("ul");
//                 stats_1.appendChild(stats_1_info);
//             const name = document.createElement("li");
//                 stats_1_info.appendChild(name);
//             const flavor_text = document.createElement("li");
//                 stats_1_info.appendChild(flavor_text);
//             const is_baby = document.createElement("li");
//                 stats_1_info.appendChild(is_baby);
//             const is_legendary = document.createElement("li");
//                 stats_1_info.appendChild(is_legendary);
//             const is_mythical = document.createElement("li");
//                 stats_1_info.appendChild(is_mythical);
//             const height = document.createElement("li");
//                 stats_1_info.appendChild(height);
//                 height.innerHTML = `Height:  ${Math.floor((data.height / 3.048) * 100) / 100} feet`; // height in decimeters
//             const weight = document.createElement("li");
//                 stats_1_info.appendChild(weight);
//                 weight.innerHTML = `Weight:  ${Math.floor((data.weight / 4.536) * 100) / 100} lbs`; // weight in hectograms

//         const image = document.getElementById("image");
//             image.setAttribute("src", `https://pokeres.bastionbot.org/images/pokemon/${data.id}.png`);
//             image.setAttribute("alt", `Image of ${data.name}`);
//             image.onerror = () => {
//                 image.setAttribute("src", data.sprites.front_default);
//             }

//         const stats_2 = document.getElementById("stats_2");
//             stats_2.innerHTML = "";
//             const stats_2_info = document.createElement("ul");
//                 stats_2.appendChild(stats_2_info);
//             const hp = document.createElement("li");
//                 stats_2_info.appendChild(hp);
//                 hp.innerHTML = `HP:  ${data.stats[0].base_stat}`;
//             const attack = document.createElement("li");
//                 stats_2_info.appendChild(attack);
//                 attack.innerHTML = `Attack:  ${data.stats[1].base_stat}`;
//             const defense = document.createElement("li");
//                 stats_2_info.appendChild(defense);
//                 defense.innerHTML = `Defense:  ${data.stats[2].base_stat}`;
//             const special_attack = document.createElement("li");
//                 stats_2_info.appendChild(special_attack);
//                 special_attack.innerHTML = `Special Attack: ${data.stats[3].base_stat}`;
//             const special_defense = document.createElement("li");
//                 stats_2_info.appendChild(special_defense);
//                 special_defense.innerHTML = `Special Defense:  ${data.stats[4].base_stat}`;
//             const speed = document.createElement("li");
//                 stats_2_info.appendChild(speed);
//                 speed.innerHTML = `Speed:  ${data.stats[5].base_stat}`;

//         const stats_3 = document.getElementById("stats_3");
//             stats_3.innerHTML = ""; 
//             const stats_3_info = document.createElement("ul");
//                 stats_3.appendChild(stats_3_info);
//             const type_1 = document.createElement("li");
//                 stats_3_info.appendChild(type_1);
//                 let type_1_name = data.types[0].type.name;
//                 type_1.innerHTML = `Primary Type:  ${type_1_name[0].toUpperCase() + type_1_name.slice(1)}`;
//             const stats_3_info_2 = document.createElement("ul");
//             const type_2 = document.createElement("li");
//                 stats_3.appendChild(stats_3_info_2);
//             if(data.types[1] !== undefined) {
//                 stats_3_info_2.appendChild(type_2);
//                 let type_2_name = data.types[1].type.name;
//                 type_2.innerHTML = `Secondary Type:  ${type_2_name[0].toUpperCase() + type_2_name.slice(1)}`;
//             }

//         fetch(data.species.url) // set the contents of all stats fields
//         .then(res => res.json())
//         .then(data => {
//             name.innerHTML = `Name: ${capitalize(data.name)}`;
//             let flavor_data = data.flavor_text_entries;
//             let flavor_texts = [];
//             for(let i = 0; i < flavor_data.length; i++) {
//                 let flavor = flavor_data[i];
//                 if(flavor.language.name === "en") {
//                     flavor_texts.push(flavor.flavor_text);
//                 }
//             }
//             let random_text = getRandomEl(flavor_texts);
//             flavor_text.innerHTML = `Description: ${random_text}`; // SET flavor_text
//             if(data.is_baby) {
//                 is_baby.innerHTML = "Baby: Yes"; // SET baby?
//             } else {
//                 is_baby.innerHTML = "Baby: No"; 
//             }

//             if(data.is_legendary) {
//                 is_legendary.innerHTML = "Legendary: Yes"; // SET legendary?
//             } else {
//                 is_legendary.innerHTML = "Legendary: No";
//             }

//             if(data.is_mythical) {
//                 is_mythical.innerHTML = "Mythical: Yes"; // SET mythical?
//             } else {
//                 is_mythical.innerHTML = "Mythical: No";
//             }
//         });

//         for(let i = 0; i < 2; i++) {
//             if(data.types[i] !== undefined) {
//                 fetch(data.types[i].type.url)
//                 .then(res => res.json())
//                 .then(data => {
//                     let double_damage_data = data.damage_relations.double_damage_from;
//                     if(double_damage_data.length > 0) {
//                         const weakness = document.createElement("li");
//                             weakness.innerHTML = "Receives double damage from ";
//                             for(let i = 0; i < double_damage_data.length; i++) {
//                                 let damage_type = double_damage_data[i].name;
//                                 if(i === double_damage_data.length - 1) {
//                                     weakness.innerHTML += damage_type + ".";
//                                 } else {
//                                     weakness.innerHTML += damage_type + ", ";
//                                 }
//                             }
//                             if(i === 0) {
//                                 type_1.appendChild(weakness);
//                             } else {
//                                 type_2.appendChild(weakness);
//                             }
//                     }
//                     let half_damage_data = data.damage_relations.half_damage_from;
//                     if(half_damage_data.length > 0) {
//                         const strength = document.createElement("li");
//                             strength.innerHTML = "Receives half damage from ";
//                             for(let i = 0; i < half_damage_data.length; i++) {
//                                 let damage_type = half_damage_data[i].name;
//                                 if(i === half_damage_data.length - 1) {
//                                     strength.innerHTML += damage_type + ".";
//                                 } else {
//                                     strength.innerHTML += damage_type + ", ";
//                                 }
//                             }
//                             if(i === 0) {
//                                 type_1.appendChild(strength);
//                             } else {
//                                 type_2.appendChild(strength);
//                             }                    
//                     }
//                     let no_damage_data = data.damage_relations.no_damage_from;
//                     if(no_damage_data.length > 0) {
//                         const immunity = document.createElement("li");
//                             immunity.innerHTML = "Receives zero damage from ";
//                             for(let i = 0; i < no_damage_data.length; i++) {
//                                 let damage_type = no_damage_data[i].name;
//                                 if(i === no_damage_data.length -1) {
//                                     immunity.innerHTML += damage_type + ".";
//                                 } else {
//                                     immunity.innerHTML += damage_type + ", ";
//                                 }
//                             }
//                             if(i === 0) {
//                                 type_1.appendChild(immunity);
//                             } else {
//                                 type_2.appendChild(immunity);
//                             }                    
//                     }
//                 });
//             }
//         }
//     }

//     // get random el from the array
//     function getRandomEl(array) {
//         let random_index = Math.floor(Math.random() * array.length);
//         return array[random_index];
//     }

//     // checks if there's already an error message on main search page - removes it if true 
//     function errorAlreadyExists(searchbar_container) {
//         if(searchbar_container.children.length === 3) {
//             searchbar_container.children.item(2).remove();
//         }
//     }

//     // displays error message for "can't select more than 6 Pokemon"
//     function displayErrorListFull(searchbar_container) {
//         errorAlreadyExists(searchbar_container);
//         const error = document.createElement("p");
//         error.setAttribute("name", "error");
//         error.innerHTML = "Cannot select more than 6 Pokemon";
//         searchbar_container.appendChild(error);
//         setTimeout(() => {
//             error.remove();
//         }, 5000);  
//     }

//     // displays error message for "Pokemon already selected"
//     function displayErrorAlreadySelected(searchbar_container) {
//         errorAlreadyExists(searchbar_container);
//         const error = document.createElement("p");
//         error.setAttribute("name", "error");
//         error.innerHTML = "Pokemon already selected";
//         searchbar_container.appendChild(error);
//         setTimeout(() => {
//             error.remove();
//         }, 5000);
//     }

//     // add item to selected Pokemon list
//     function addToList(searchbar_container, search_input, value, selected_pokemon, selection) {
//         errorAlreadyExists(searchbar_container);
//         search_input.value = "";
//         fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}/`)
//         .then( res => res.json())
//         .then( data => selected_pokemon[value] = data);
//         const item = document.createElement("li");
//             item.setAttribute("id", value);
//             item.addEventListener("click", (event) => {
//                 delete selected_pokemon[value];
//                 let remove_item = document.getElementById(value);
//                 selection.removeChild(remove_item);
//             });
//         item.innerHTML = value;
//         selection.appendChild(item);
//     }

//     // displays error message for "User input does match any pokemon name"
//     function displayErrorInvalidName(searchbar_container) {
//         errorAlreadyExists(searchbar_container);
//         const error = document.createElement("p");
//         error.setAttribute("name", "error");
//         error.innerHTML = "Invalid Pokemon name";
//         searchbar_container.appendChild(error);
//         setTimeout(() => {
//             error.remove();
//         }, 5000);
//     }

//     // creates filter options
//     function createFilterOptions(TYPES, filter) {
//         for(let type in TYPES) {
//             let filter_option = document.createElement("input");
//                 filter_option.setAttribute("type", "checkbox");
//                 filter_option.setAttribute("value", type);

//             let filter_option_label = document.createElement("label");
//                 filter_option_label.innerHTML = capitalize(type);
    
//             filter.appendChild(filter_option);
//             filter.appendChild(filter_option_label);
//         };
//     }

//     // returns array of user filter choices
//     function getUserFilters() {
//         let filters_to_apply = [];
//         let boxes = document.querySelectorAll("input[type='checkbox']");
//         boxes.forEach(box => {
//             if(box.checked) {
//                 filters_to_apply.push(box.value);
//             }
//         });
        
//         return filters_to_apply;
//     }

//     // auto suggest has bugs for specific pokemon names like "mew"
//     // it will suggest "mewtwo" instead of "mew" so there is no way to select "mew"
//     // checks if user input is an exception to the auto suggest feature
//     // if so, returns boolean 
//     function isException(partial_name, current_pokemon_name) {
//         const names = ["mew", "pidgeot"];
//         let bool = false;
//         if(names.includes(partial_name)) {
//             bool = true;
//         }
//         return bool;
//     }

//     // capitalizes: pokemon --> Pokemon
//     function capitalize(word) {
//         return word[0].toUpperCase() + word.slice(1).toLowerCase();
//     }

// // -------------------------------------------------------------------------

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
// add evolution chain to stats_2
// data.species.url --> .evolution_chain.url
//
// add random pokemon button on search page
//
// adding different language options