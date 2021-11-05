export function loadFooter() {
    const body = document.querySelector("body");
    const footer = document.createElement("footer");
    const footer_list = document.createElement("div");
    const IP = document.createElement("p");
    const email_link = document.createElement("a");
    const email = document.createElement("p");
    const github_link = document.createElement("a");
    const github = document.createElement("p");

    body.appendChild(footer);
    footer.appendChild(footer_list);
    footer_list.appendChild(IP);
    footer_list.appendChild(email_link);
    footer_list.appendChild(github_link);
    email_link.appendChild(email);
    github_link.appendChild(github);

    footer_list.setAttribute("id", "footer_list");
    github_link.setAttribute("href", "https://www.github.com/samsongs1991/PokeViser");
    
    IP.innerHTML = "Pokemon belongs to Nintendo";
    email.innerHTML = "samsongs1991@gmail.com";
    github.innerHTML = "My GitHub";
}

// Add linkedIn, AngelList, Portfolio site, etc...