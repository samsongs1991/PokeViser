// ====================================================
// ================= I M P O R T S ====================
// ====================================================

import { goToSearchPage } from './title_page'

// ====================================================
// ===================== M A I N ======================
// ================== E X P O R T S ===================
// ====================================================

export function createPokeball() {
    // Create elements used solely for web page presentation / styling
    const red_background = document.createElement("div");
    const black_background = document.createElement("div");
    const white_background = document.createElement("div");
    const black_circle = document.createElement("div");
    const white_circle = document.createElement("div");

    // Nest above css elements inside the body element
    const body = document.querySelector("body");
    body.appendChild(red_background);
    body.appendChild(black_background);
    body.appendChild(white_background);
    body.appendChild(black_circle);
    body.appendChild(white_circle);  

    // Set ids for css elements
    red_background.setAttribute("id", "red");
    black_background.setAttribute("id", "black");
    white_background.setAttribute("id", "white");
    black_circle.setAttribute("id", "b_circle");
    white_circle.setAttribute("id", "w_circle");

    // Set ability to click on white_circle --> leads to search page
    white_circle.addEventListener("click", goToSearchPage);
}

export function loadBackgroundVid() {
    // Create html elements
    const body = document.querySelector("body");
    const video = document.createElement("video");
    const source = document.createElement("source");
    
    // Set up html structure
    body.appendChild(video);
    video.appendChild(source);
    
    // Set attributes to play the mp4 file
    video.setAttribute("autoplay", "");
    video.setAttribute("muted", "");
    video.setAttribute("loop", "");
    video.setAttribute("id", "background_video");
    source.setAttribute("src", "resources/pokeviser_background.mp4");
    source.setAttribute("type", "video/mp4");
}

export function renderLoadingScreen() {
    const body = document.querySelector("body")
    const loadingScreen = document.createElement("div");
    const textContainer = document.createElement("div");
    const text = document.createElement("div");

    loadingScreen.setAttribute("id", "loadingScreen");
    textContainer.setAttribute("class", "text-container");
    text.setAttribute("id", "load-text");

    text.innerHTML = "LOADING"

    body.appendChild(loadingScreen);
    loadingScreen.appendChild(textContainer);
    textContainer.appendChild(text);
}

export function removeLoadingScreen() {
    const loadingScreen = document.getElementById("loadingScreen");
    loadingScreen.remove();
}