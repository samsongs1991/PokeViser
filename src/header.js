import { loadTitlePage, goToSearchPage } from './title_page'

export function loadHeader() {
    // Create html elements
    const body = document.querySelector("body");
    const header = document.createElement("header");
    const title_container = document.createElement("div");
    const title = document.createElement("img");
    const navbar = document.createElement("nav");
    const navlist = document.createElement("ul");
    const home = document.createElement("li");
    const search = document.createElement("li");
    const about = document.createElement("li");
    
    // Set up html structure
    body.appendChild(header);
    header.appendChild(title_container);
    header.appendChild(navbar);
    title_container.appendChild(title);
    navbar.appendChild(navlist);
    navlist.appendChild(home);
    navlist.appendChild(search);
    navlist.appendChild(about);

    // Set title attributes to display logo
    title.setAttribute("src", "resources/pokeviser_img.png");
    title.setAttribute("id", "logo");
    
    // Set ability for navbar elements to be clickable
    title.addEventListener("click", goToSearchPage);
    home.addEventListener("click", loadTitlePage);
    search.addEventListener("click", goToSearchPage);
        
    // Set text of navbar elements
    home.innerHTML = "Home";
    search.innerHTML = "Poke Search";
    about.innerHTML = "About";
}