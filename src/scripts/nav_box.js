// ====================================================
// ================= I M P O R T S ====================
// ====================================================

// To render show page
import { loadShowPage } from './show_page'

// To render index page
import { loadIndexPage } from './index_page'

// To render size comparison page
import { loadSizePage } from './size_page'

// ====================================================
// ===================== M A I N ======================
// =================== E X P O R T ====================
// ====================================================

export function loadNavBox() {
    const main = document.querySelector("main");
    const nav_box = document.createElement("div");
    nav_box.setAttribute("id", "nav_box");
    const ul = document.createElement("ul");
    main.appendChild(nav_box);
    nav_box.appendChild(ul);

    const store = items();
    for(let i = 1; i < 8; i++) {
        let item = store[i];
        let li = document.createElement("li");

        // * Add event listener for being able to drag the navbox around
        // * Perhaps add a "draggable" icon in navbox
        // * Refactor loadIndexPage
        // * Refactor loadSizePage
        // * BUG - Slow load time when clicking on "Poke Search"
        // * BUG - "Selections" box disappears after clicking "Home" then going to searchpage
        // * Add mediaqueries to css in searchpage, showpage, navbox

        li.addEventListener("click", () => {
            i < 4 ? item.url() : window.open(item.url, '_blank');
        });

        li.innerHTML = `${item.text}   `;

        let img = document.createElement("img");
        img.setAttribute("src", item.src);
        img.setAttribute("height", "20px");
        li.appendChild(img);

        ul.appendChild(li);
    }
}

// ====================================================
// =================== H E L P E R ====================
// ================== M E T H O D S ===================
// ====================================================

function items() {
    return {
        1: {
            "type": "show",
            "src": "./resources/graph.png", 
            "url": loadShowPage,
            "text": "Individual Stats", 
        }, 
        2: {
            "type": "index",
            "src": "./resources/sword.png", 
            "url": loadIndexPage,
            "text": "Damage Relations", 
        }, 
        3: {
            "type": "size",
            "src": "./resources/human.png", 
            "url": loadSizePage,
            "text": "Size Comparison", 
        }, 
        4: {
            "type": "portfolio",
            "src": "./resources/portfolio.png", 
            "url": "",
            "text": "Sam's Portfolio", 
        }, 
        5: {
            "type": "github",
            "src": "./resources/github.png", 
            "url": "https://github.com/samsongs1991/PokeViser",
            "text": "Github", 
        }, 
        6: {
            "type": "linkedin",
            "src": "./resources/linkedin.png", 
            "url": "https://www.linkedin.com/in/samsongs1991/",
            "text": "LinkedIn", 
        }, 
        7: {
            "type": "angellist",
            "src": "./resources/angellist.png", 
            "url": "https://angel.co/u/samsongs",
            "text": "AngelList", 
        }, 
    }
}