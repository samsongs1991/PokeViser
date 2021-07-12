document.addEventListener("DOMContentLoaded", () => {

    // For the title page to enter main search site
    const outer_container = document.createElement("div");
        const title_container = document.createElement("div");
            outer_container.appendChild(title_container);
            const title = document.createElement("h1");
                title.innerText = "Poke Viser";
                title_container.appendChild(title);
        const logo_container = document.createElement("div");
            outer_container.appendChild(logo_container);
            const logo = document.createElement("img");
                logo_container.appendChild(logo);
                logo.setAttribute("src" = "");
                logo.setAttribute("alt" = "Poke Viser logo");
        const instructions_container = document.createElement("div");
            outer_container.appendChild(instructions_container);
            const instructions = document.createElement("p");
                instructions.innerText = "Instructions: ";
                instructions_container.appendChild(instructions);



})