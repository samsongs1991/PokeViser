// ====================================================
// ================= I M P O R T S ====================
// ====================================================

// Helper methods
import { capitalize } from './helpers'

// POKEMON: Cache of pokemon data
// TYPES: Pokemon types and their hex color codes
import { POKEMON, TYPES } from './search_page'
 
// Cache of description and damage data for every searched pokemon
import { SELECTION_DATA } from './show_page'

// To render size comparison page
import { loadSizePage } from './size_page'

// To render show page
import { loadShowPage } from './show_page'

// ====================================================
// =============== C O N S T A N T S ==================
// ====================================================


// ====================================================
// ===================== M A I N ======================
// ================== E X P O R T S ===================
// ====================================================

export function loadIndexPage(selected_pokemon) {
    loadIndexPageStructure(selected_pokemon);
    loadArticles();
    loadDmgMultipliers();
}

// ====================================================
// =================== H E L P E R ====================
// ================== M E T H O D S ===================
// ====================================================

// Setup html elements for index page
function loadIndexPageStructure(selected_pokemon) {
    const main = document.querySelector("main");
    main.innerHTML = "";
    main.setAttribute("id", "index_page");

    const instructions = document.createElement("div");
    const text = document.createElement("p");
    const index_container = document.createElement("div");
    const row1 = document.createElement("section");
    const row2 = document.createElement("section");
    const show_page_button = document.createElement("button");
    const size_page_button = document.createElement("button");

    instructions.setAttribute("id", "instructions");

    text.innerHTML = "Each card shows how much damage the Pokemon receives from which attack types. If an attack type is not shown, that Pokemon receives x1 damage from that attack type.";
    show_page_button.innerHTML = "Go to show page";
    size_page_button.innerHTML = "Go to size page";

    main.appendChild(instructions);
    main.appendChild(index_container);
    main.appendChild(show_page_button);
    main.appendChild(size_page_button);
    instructions.appendChild(text);
    index_container.appendChild(row1);
    index_container.appendChild(row2);

    let count = 0
    for(let id in selected_pokemon.selection) {
        let article = document.createElement("article");
        article.setAttribute("id", id);
        if(count < 3) {
            row1.appendChild(article);
        } else {
            row2.appendChild(article);
        }
        count++;
    }

    show_page_button.addEventListener("click", () => loadShowPage(selected_pokemon));
    size_page_button.addEventListener("click", () => loadSizePage(selected_pokemon));
}

// Setup html elements for articles
function loadArticles() {
    const articles = document.getElementsByTagName("article");
    articles.forEach(article => {
        let name = document.createElement("p");
        let img = document.createElement("img");
        let dmg_multiplier = document.createElement("div");
        
        name.innerHTML = capitalize(POKEMON[article.id].name);
        img.setAttribute("src", POKEMON[article.id].sprites.front_default);
        img.setAttribute("alt", `Image of ${POKEMON[article.id].name}`);
        
        article.appendChild(name);
        article.appendChild(img);
        article.appendChild(dmg_multiplier);
    });
}

// Load damage multiplier data in article
function loadDmgMultipliers() {
    const articles = document.getElementsByTagName("article");
    articles.forEach(article => {
        const dmg_container = article.getElementsByTagName("div")[0];
        let sorted_multipliers = dmgSort(article.id);
        loadDmgContainer(dmg_container, sorted_multipliers);
    });
}

// Sort out damage multipliers
function dmgSort(id) {
    const sorted_multipliers = {
        4: [],
        2: [], 
        1: [],
        0.5: [], 
        0.25: [], 
        0: []
    };

    const damage = SELECTION_DATA[id].damage;
    for(let i = 0; i < 2; i++) {
        if(damage[i]) {
            updateMultipliers(sorted_multipliers, damage[i].damage_relations.double_damage_from, 2);
            updateMultipliers(sorted_multipliers, damage[i].damage_relations.half_damage_from, 0.5);
            updateMultipliers(sorted_multipliers, damage[i].damage_relations.no_damage_from, 0);
        }
    }

    return sorted_multipliers;
}

// Update sorted_multipliers appropriately
function updateMultipliers(sorted_multipliers, damage_from, multiplier) {
    let new_multiplier = null;
    damage_from.forEach(type => {
        if(sorted_multipliers[2].includes(type.name)) {
            sorted_multipliers[2] = sorted_multipliers[2].filter(item => item !== type.name)
            new_multiplier = 2 * multiplier;
            sorted_multipliers[new_multiplier].push(type.name);
        } else if(sorted_multipliers[0.5].includes(type.name)) {
            sorted_multipliers[0.5] = sorted_multipliers[0.5].filter(item => item !== type.name)
            new_multiplier = 0.5 * multiplier;
            sorted_multipliers[new_multiplier].push(type.name);
        } else if(sorted_multipliers[0].includes(type.name)) {
            // do nothing
        } else {
            sorted_multipliers[multiplier].push(type.name);
        }
    });
}

// Load dmg_container inside article with appropriate multiplier categories 
function loadDmgContainer(dmg_container, sorted_multipliers) {
    const categories = [4, 2, 0.5, 0.25, 0];
    categories.forEach(category => {
        let ul = document.createElement("ul");
        ul.innerHTML = `x${category}`;
        sorted_multipliers[category].forEach(type => {
            let li = document.createElement("li");
            li.innerHTML = capitalize(type);
            ul.appendChild(li);
        });        
        dmg_container.appendChild(ul);
    });
}
