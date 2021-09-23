// Helper methods
import { capitalize, size, getRandomEl } from './helpers'

export function loadIndividualStatsPage(list_of_pokemon_objects) {
    const main = document.querySelector("main");
    main.setAttribute("id", "individual_stats_page");

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
    document.addEventListener("keydown", (event) => {
        if(event.key === "ArrowRight") {
            let idx = name_arr.indexOf(current_pokemon);
            if(idx === name_arr.length - 1) {
                current_pokemon = name_arr[0];
            } else {
                current_pokemon = name_arr[idx + 1];
            }
            loadIndividualStats(list_of_pokemon_objects[current_pokemon]);
        } else if(event.key === "ArrowLeft") {
            let idx = name_arr.indexOf(current_pokemon);
            if(idx === 0) {
                current_pokemon = name_arr[name_arr.length - 1];
            } else {
                current_pokemon = name_arr[idx - 1];
            }
            loadIndividualStats(list_of_pokemon_objects[current_pokemon]);
        }
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

// -------------------------------------------------------------------------


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
        stats_container.setAttribute("id", "stats_container");
    const sprites = document.createElement("section"); // for scrolling view of selected Pokemon
        sprites.setAttribute("id", "sprites");
    const image = document.createElement("img"); // for nice image of pokemon
        image.setAttribute("id", "image")
        image.setAttribute("height", "400px");
    const stats_1 = document.createElement("section"); // for stats - strengths/weaknesses
        stats_1.setAttribute("id", "stats_1");
    const stats_2 = document.createElement("section"); // for stats - atk, def, etc
        stats_2.setAttribute("id", "stats_2");
    const main_stats_container = document.createElement("div") // for containing center row of stats1 - img - stats2 
        main_stats_container.setAttribute("id", "main_stats_container");       
    const stats_3 = document.createElement("section"); // for stats - description
        stats_3.setAttribute("id", "stats_3");

    const new_view_container = document.createElement("div");
        new_view_container.setAttribute("id", "new_view_container");
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
    new_view_container.appendChild(view_all_button);
    new_view_container.appendChild(view_size_button);
    stats_container.appendChild(new_view_container);

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
        const name = document.createElement("li");
            stats_1_info.appendChild(name);
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
        const stats_3_info_2 = document.createElement("ul");
        const type_2 = document.createElement("li");
            stats_3.appendChild(stats_3_info_2);
        if(data.types[1] !== undefined) {
            stats_3_info_2.appendChild(type_2);
            let type_2_name = data.types[1].type.name;
            type_2.innerHTML = `Secondary Type:  ${type_2_name[0].toUpperCase() + type_2_name.slice(1)}`;
        }

    fetch(data.species.url) // set the contents of all stats fields
    .then(res => res.json())
    .then(data => {
        name.innerHTML = `Name: ${capitalize(data.name)}`;
        let flavor_data = data.flavor_text_entries;
        let flavor_texts = [];
        for(let i = 0; i < flavor_data.length; i++) {
            let flavor = flavor_data[i];
            if(flavor.language.name === "en") {
                flavor_texts.push(flavor.flavor_text);
            }
        }
        let random_text = getRandomEl(flavor_texts);
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