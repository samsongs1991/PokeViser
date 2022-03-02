// ====================================================
// ================= I M P O R T S ====================
// ====================================================

// Helper methods
import { capitalize } from './helpers'

// Cache of pokemon data
import { POKEMON_NAMES, SELECTED_POKEMON } from './store.js'

// ====================================================
// ===================== M A I N ======================
// ================== E X P O R T S ===================
// ====================================================

export function loadIndexPage() {
    loadIndexPageStructure();
    loadArticles();
    loadDmgMultipliers();
}

// ====================================================
// =================== H E L P E R ====================
// ================== M E T H O D S ===================
// ====================================================

// Setup html elements for index page
function loadIndexPageStructure() {
    const main = document.querySelector("main");
    main.innerHTML = "";
    main.setAttribute("id", "index_page");

    const instructions = document.createElement("div");
    const text = document.createElement("p");
    const index_container = document.createElement("div");
    const row1 = document.createElement("section");
    const row2 = document.createElement("section");

    instructions.setAttribute("id", "instructions");

    text.innerHTML = "Each card shows how much damage the Pokemon receives from which attack types. If an attack type is not shown, that Pokemon receives x1 damage from that attack type.";

    main.appendChild(instructions);
    main.appendChild(index_container);
    instructions.appendChild(text);
    index_container.appendChild(row1);
    index_container.appendChild(row2);

    let count = 0
    for(let id in SELECTED_POKEMON.selection) {
        let article = document.createElement("article");
        article.setAttribute("id", id);
        if(count < 3) {
            row1.appendChild(article);
        } else {
            row2.appendChild(article);
        }
        count++;
    }

}

// Setup html elements for articles
function loadArticles() {
    const articles = document.getElementsByTagName("article");
    articles.forEach(article => {
        let name = document.createElement("p");
        let img = document.createElement("img");
        let dmg_multiplier = document.createElement("div");
        
        name.innerHTML = capitalize(POKEMON_NAMES[article.id].name);
        img.setAttribute("src", POKEMON_NAMES[article.id].sprite_url);
        img.setAttribute("alt", `Image of ${POKEMON_NAMES[article.id].name}`);
        
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

    const damage = POKEMON_NAMES[id].dmg_relations;
    for(let type in damage) {
        updateMultipliers(sorted_multipliers, damage[type].double, 2);
        updateMultipliers(sorted_multipliers, damage[type].half, 0.5);
        updateMultipliers(sorted_multipliers, damage[type].no, 0);
    }

    return sorted_multipliers;
}

// Update sorted_multipliers appropriately
function updateMultipliers(sorted_multipliers, types, multiplier) {
    let new_multiplier = null;
    types.forEach(type => {
        let key = findKey(sorted_multipliers, type);
        if(key === -1) {
            sorted_multipliers[multiplier].push(type);
        } else {
            sorted_multipliers[key] = sorted_multipliers[key].filter(item => item !== type);
            new_multiplier = key * multiplier;
            sorted_multipliers[new_multiplier].push(type);
        }
    });
}

// Returns key from object(1st param) where the value of the key is an array and contains the el(2nd param)
function findKey(obj, el) {
    for(let k in obj) {
        if(obj[k].includes(el)) {
            return k;
        }
    }
    return -1;
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
