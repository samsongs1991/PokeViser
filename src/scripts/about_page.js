// ====================================================
// ================= I M P O R T S ====================
// ====================================================

import { POKEMON_NAMES } from './store'

// ====================================================
// ===================== M A I N ======================
// =================== E X P O R T ====================
// ====================================================

export function loadAboutPage() {
    const main = document.querySelector("main");
    main.setAttribute("id", "about_page");
    main.innerHTML = "";

    const section = document.createElement("section");
    const h1 = document.createElement("h1");
    const article = document.createElement("article");
    const img = document.createElement("img");
    const p1 = document.createElement("p");
    const p2 = document.createElement("p");
    const p3 = document.createElement("p");
    const nephew = document.createElement("span");
    const pokeapi = document.createElement("a");
    const github = document.createElement("a");
    const linkedin = document.createElement("a");
    const angellist = document.createElement("a");
    
    img.setAttribute("src", "resources/jihoon+me.jpg");
    img.setAttribute("id", "photo");
    pokeapi.setAttribute("href", "https://www.pokeapi.co");
    pokeapi.setAttribute("target", "_blank");
    github.setAttribute("href", "https://www.github.com/samsongs1991/pokeviser");
    github.setAttribute("target", "_blank");
    linkedin.setAttribute("href", "https://www.linkedin.com/in/samsongs1991/");
    linkedin.setAttribute("target", "_blank");
    angellist.setAttribute("href", "https://angel.co/u/samsongs");
    angellist.setAttribute("target", "_blank");

    nephew.innerHTML = "nephew";
    pokeapi.innerHTML = "PokeApi";
    github.innerHTML = "Github";
    linkedin.innerHTML = "LinkedIn";
    angellist.innerHTML = "AngelList";
    
    h1.innerHTML = "About Poke Viser";
    p1.innerHTML = "I dedicate Poke Viser to my ";
    p1.appendChild(nephew);
    p1.innerHTML = p1.innerHTML + " who inspires me to be a better person everyday. He has endless curiosity for all things Pokemon and I love connecting with him through the wonderful world that Nintendo has imagined. I want to cherish the time that I have with my loved ones through these little connections. That's all we really have. Please enjoy exploring Pokemon through the Poke Viser.";

    p2.innerHTML = "This web application was built using Vanilla JavaScript and ";
    p2.appendChild(pokeapi);
    p2.innerHTML = p2.innerHTML + ". To learn more about this project go to my ";
    p2.appendChild(github);
    p2.innerHTML = p2.innerHTML + " page. You can connect with me through ";
    p2.appendChild(linkedin);
    p2.innerHTML = p2.innerHTML + " or ";
    p2.appendChild(angellist);
    p2.innerHTML = p2.innerHTML + ".";
    
    p3.innerHTML = "Thank you!";
    
    const limitedParade = limitFn(createParade);
    for(let i = 0; i < 5; i++) {
        limitedParade();
    }

    setTimeout(() => {
        const sprites = document.getElementsByClassName("sprite");
        sprites.forEach(sprite => sprite.classList.toggle("hidden"));
    }, 3000);
    
    h1.addEventListener("click", () => {
        const sprites = document.getElementsByClassName("sprite");
        sprites.forEach(sprite => sprite.classList.toggle("hidden"));
    });
    p1.addEventListener("click", () => img.setAttribute("style", "opacity: 1; z-index: 2;"));
    img.addEventListener("click", () => img.setAttribute("style", "opacity: 0; z-index: -1; transition: all 2s ease;"));
    
    main.appendChild(section);
    main.appendChild(img);
    section.appendChild(h1);
    section.appendChild(article);
    article.appendChild(p1);
    article.appendChild(p2);
    article.appendChild(p3);
}

// ====================================================
// =================== H E L P E R ====================
// ================== M E T H O D S ===================
// ====================================================

function createParade() {
    const marquee = document.createElement("marquee");
    marquee.setAttribute("scrollamount", Math.floor(Math.random() * 12) + 3);
    for(let i = 0; i < 12; i++) {
        let rand = Math.floor((Math.random() * 898) + 1);
        let img = document.createElement("img");
        img.setAttribute("src", POKEMON_NAMES[rand].sprite_url);
        img.setAttribute("class", "sprite hidden");
        marquee.appendChild(img);
    }
    const main = document.querySelector("main");
    main.appendChild(marquee);
}

function limitFn(cb) {
    let limit = 5;
    return function() {
        if(limit !== 0) {
            cb();
            limit--;
        }
    }
}