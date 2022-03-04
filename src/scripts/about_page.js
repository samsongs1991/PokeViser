// ====================================================
// ================= I M P O R T S ====================
// ====================================================



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
    const pokeapi = document.createElement("a");
    const github = document.createElement("a");
    const linkedin = document.createElement("a");
    const angellist = document.createElement("a");

    img.setAttribute("src", "resources/jihoon+me.jpg");
    pokeapi.setAttribute("href", "https://www.pokeapi.co");
    pokeapi.innerHTML = "PokeApi";
    github.setAttribute("href", "https://www.github.com/samsongs1991/pokeviser");
    github.innerHTML = "Github";
    linkedin.setAttribute("href", "https://www.linkedin.com/in/samsongs1991/");
    linkedin.innerHTML = "LinkedIn";
    angellist.setAttribute("href", "https://angel.co/u/samsongs");
    angellist.innerHTML = "AngelList";
    
    h1.innerHTML = "About Poke Viser";
    p1.innerHTML = "I dedicate Poke Viser to my nephew who inspires me to be a better person everyday. He has endless curiosity for all things Pokemon and I love connecting with him through the wonderful world that Nintendo has imagined. I want to cherish what little time I have with my loved ones through these little connections. That's all we really have. Please enjoy exploring Pokemon through the Poke Viser.";

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

    main.appendChild(section);
    section.appendChild(h1);
    section.appendChild(article);
    article.appendChild(p1);
    article.appendChild(p2);
    article.appendChild(p3);
    article.appendChild(img);
}

// ====================================================
// =================== H E L P E R ====================
// ================== M E T H O D S ===================
// ====================================================


