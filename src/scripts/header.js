// ====================================================
// ================= I M P O R T S ====================
// ====================================================

import { loadTitlePage, goToSearchPage } from './title_page'

import { loadAboutPage } from './about_page'


// ====================================================
// ===================== M A I N ======================
// ================== E X P O R T S ===================
// ====================================================

export function loadHeader() {
    // Create html elements
    const body = document.querySelector("body");
    const header = document.createElement("header");
    const logo_container = document.createElement("div");
    const logo = document.createElement("img");
    const navbar = document.createElement("nav");
    const navlist = document.createElement("ul");
    const search = document.createElement("li");
    const about = document.createElement("li");
    
    // Set up html structure
    body.appendChild(header);
    header.appendChild(logo_container);
    header.appendChild(navbar);
    logo_container.appendChild(logo);
    navbar.appendChild(navlist);
    navlist.appendChild(search);
    navlist.appendChild(about);

    // Set logo attributes to display logo
    logo.setAttribute("src", "resources/logo.png");
    logo.setAttribute("id", "logo");
    
    // Set ability for navbar elements to be clickable
    logo.addEventListener("click", loadTitlePage);
    search.addEventListener("click", goToSearchPage);
    about.addEventListener("click", loadAboutPage);
        
    // Set text of navbar elements
    search.innerHTML = "Search";
    about.innerHTML = "About";
}