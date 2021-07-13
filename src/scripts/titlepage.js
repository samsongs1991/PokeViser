

    const loadTitlePage = function loadTitlePage() {
        body.innerHTML = ""; 

        const outer_container = document.createElement("div");
            body.appendChild(outer_container);
    
        const title_container = document.createElement("div");
        const title = document.createElement("p");
            title.innerHTML = "Poke Viser";
            title_container.appendChild(title);
            outer_container.appendChild(title_container);
    
        const logo_container = document.createElement("div");
        const logo = document.createElement("img");
            logo.addEventListener("click", goToSearchPage);
            logo.setAttribute("src", "");
            logo.setAttribute("alt", "Poke Viser logo");
            logo_container.appendChild(logo);
            outer_container.appendChild(logo_container);
    
        const instructions_container = document.createElement("div");
        const instructions = document.createElement("p");
            instructions.innerHTML = "Instructions: ";
            instructions_container.appendChild(instructions);
            outer_container.appendChild(instructions_container);
    }

    export {loadTitlePage}