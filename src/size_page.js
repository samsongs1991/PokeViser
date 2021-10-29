// ====================================================
// ================= I M P O R T S ====================
// ====================================================

// To show loading screen until POKEMON is loaded with all 898 pokemon
import { renderLoadingScreen, removeLoadingScreen } from './presentation'

// Cache of pokemon data
import { POKEMON } from './search_page'

// Cache of description and damage data for every searched pokemon
import { SELECTION_DATA } from './show_page'

// ====================================================
// =============== C O N S T A N T S ==================
// ====================================================



// ====================================================
// ===================== M A I N ======================
// ================== E X P O R T S ===================
// ====================================================

export function loadSizePage(selected_pokemon) {
    console.log(selected_pokemon);
    console.log(SELECTION_DATA);

    // load size page structure
    // load images
    //  - set img src
    //  - set img dimensions for scale
    // 
}