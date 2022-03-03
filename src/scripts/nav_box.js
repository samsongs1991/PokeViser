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
    for(let i = 1; i < 4; i++) {
        let item = store[i];
        let li = document.createElement("li");

        li.addEventListener("click", () => item.url());

        li.innerHTML = item.text;

        let img = document.createElement("img");
        img.setAttribute("src", item.src);
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
            "src": "resources/graph.png", 
            "url": loadShowPage,
            "text": "Individual Stats", 
        }, 
        2: {
            "type": "index",
            "src": "resources/sword.png", 
            "url": loadIndexPage,
            "text": "Damage Relations", 
        }, 
        3: {
            "type": "size",
            "src": "resources/human.png", 
            "url": loadSizePage,
            "text": "Size Comparison", 
        }
    }
}