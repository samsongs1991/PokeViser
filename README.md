# Poke Viser
## Web Application

* Live Site
    - https://samsongs1991.github.io/PokeViser/

* Core functionality
    - Display stats of selected Pokemon.
    - Select up to 6 Pokemon at a time to view on a single page.

* Description
    - Poke Viser is a sleek, beautiful and fun way to visualize the stats of up to 6 Pokemon at a time. The inspiration for this app came after I recently began playing Pokemon GO in March of 2021. It is a low-stakes casual mobile app game where users try to collect pocket monsters, Pokemon, and battle other users with their collected Pokemon. A common issue I was having was having to look up the weaknesses of my opponent's Pokemon one at a time on Google which quickly became annoying to do. The only times I would resort to Googling Pokemon weaknesses are when I ran out of revives and couldn't afford to continue losing battles. However, instead of having to look up strengths and weaknesses one Pokemon at a time and sifting through Google searches, why not have a single, easy-to-use search site to look up several Pokemons' stats and have them visible on the same page. Poke Viser will allow users to do just that.
    - Poke Viser will also have options to visualize the relative sizes of each of the selected Pokemon (up to 6) on the same page as well as filters to more effectively search for a specific Pokemon.

* In Poke Viser, users will be able to:
    - Search for Pokemon using ...
        - Direct input (with automated suggestions feature)
        - Drop down menu
        - Filters
    - Select up to 6 Pokemon to be displayed on the page at one time.
    - See a picture of the selected Pokemon. 
    - See stats for the selected Pokemon.
    - See relative sizes of the selected Pokemon on the same page.

* In addition, this project will include:
    - Instructions for how to use the application.
    - A README file.

* Technologies, Libraries, APIs
    - d3 library for chart rendering of Pokemon stats
        - https://d3js.org/
    - PokeAPI for fetching Pokemon data
        - https://pokeapi.co/
    - PogoAssets for 3d images of Pokemon
        - https://github.com/ZeChrales/PogoAssets
    - Pokeres for 2d images of Pokemon
        - https://pokeres.bastionbot.org/images/pokemon/1.png
    - Pokemonaaah for Hex Codes of Pokemon type colors
        - http://www.pokemonaaah.net/artsyfartsy/colordex/
    - Webpack to bundle JavaScript code
    

* Implementation Timeline
    - Friday Afternoon & Weekend
        - Setup project and file structure.
        - Outline key methods, functionalities and interactions in pseudo code.
        - Get title page rendered with clickable button to enter main site.
        - Get main page rendered with header and footer complete
    - Monday
        - Code the search page ...
            - Search Bar to fetch correct info from API.
            - Dropdown Menu with options for Pokemon changing depending on filters.
            - Filters with buttons that correctly filter the Search Bar and Dropdown Menu results. 
            - Clickable button to view selected Pokemon and change HTML structure live.
        - Code the "individual "view page ...
            - Basic HTML structure
        - Code the "group" view page ...
            - Basic HTML structure
    - Tuesday
        - Finish coding "individual" view page ...
            - Section for all selected Pokemon with icons.
            - Section for current Pokemon image and stats
            - Prev and Next buttons
        - Finish coding "group" view page ...
            - Section for each of 6 Pokemon with image and select stats
            - Logic for how to adjust the placement of each Pokemon on page depending on number of Pokemon selected
    - Wednesday
        - CSS for all previous pages.
        - Code relative size comparison page ...
            - Logic for how to manipulate the original images and display them
    - Thursday Morning
        - Deploy to GitHub.
        - Finish final touches of CSS.

* Bonus Features
    - N/A
