// To load title page after DOMContentLoaded
import { loadTitlePage } from './title_page'

document.addEventListener("DOMContentLoaded", () => {
    loadTitlePage();
})

// -------------------------------------------------------------------------
// TO WORK ON LATER - BONUS
//
// instead of auto suggest just being a single suggestion, 
//  - make it an entire selection of auto suggestions
//
// add evolution chain to stats_2
// data.species.url --> .evolution_chain.url
//
// adding different language options