// ====================================================
// ===================== M A I N ======================
// ================== E X P O R T S ===================
// ====================================================

export function loadFooter() {
    const body = document.querySelector("body");
    const footer = document.createElement("footer");
    const ul = document.createElement("ul");

    const store = items();
    for(let i = 1; i < 5; i++) {
        let item = store[i];
        let li = document.createElement("li");

        li.addEventListener("click", () => window.open(item.url, '_blank'));

        let img = document.createElement("img");
        img.setAttribute("src", item.src);
        img.setAttribute("title", item.text);
        li.appendChild(img);

        ul.appendChild(li);
    }

    body.appendChild(footer);
    footer.appendChild(ul);
}

// ====================================================
// =================== H E L P E R ====================
// ================== M E T H O D S ===================
// ====================================================

function items() {
    return {
        1: {
            "type": "portfolio",
            "src": "https://www.iamsamsong.com",
            "url": "",
            "text": "Sam's Portfolio",
        },
        2: {
            "type": "github",
            "src": "resources/github.png",
            "url": "https://github.com/samsongs1991/PokeViser",
            "text": "Github",
        },
        3: {
            "type": "linkedin",
            "src": "resources/linkedin.png",
            "url": "https://www.linkedin.com/in/samsongs1991/",
            "text": "LinkedIn",
        },
        4: {
            "type": "angellist",
            "src": "resources/angellist.png",
            "url": "https://angel.co/u/samsongs",
            "text": "AngelList",
        },
    }
}
