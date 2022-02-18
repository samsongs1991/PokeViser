// ====================================================
// =============== C O N S T A N T S ==================
// ====================================================

// POKEMON_NAMES is the storage for all pokemon data
export const POKEMON_NAMES = { size: 0 };


// TYPES contains all Pokemon types and their hex color codes
export const TYPES = {
    "normal": "rgba(170, 176, 159, 0.6)",
    "fire": "rgba(234, 122, 60, 0.6)",
    "water": "rgba(83, 154, 226, 0.6)",
    "electric": "rgba(229, 197, 49, 0.6)",
    "grass": "rgba(113, 197, 88, 0.6)",
    "ice": "rgba(112, 203, 212, 0.6)",
    "fighting": "rgba(203, 95, 72, 0.6)",
    "poison": "rgba(180, 104, 183, 0.6)",
    "ground": "rgba(204, 159, 79, 0.6)",
    "flying": "rgba(125, 166, 222, 0.6)",
    "psychic": "rgba(229, 112, 155, 0.6)",
    "bug": "rgba(148, 188, 74, 0.6)",
    "rock": "rgba(178, 160, 97, 0.6)",
    "ghost": "rgba(132, 106, 182, 0.6)",
    "dragon": "rgba(106, 123, 175, 0.6)",
    "dark": "rgba(115, 108, 117, 0.6)",
    "steel": "rgba(137, 161, 176, 0.6)",
    "fairy": "rgba(227, 151, 209, 0.6)",
};

// SELECTED_POKEMON contains user selected pokemon - up to 6
export const SELECTED_POKEMON = { size: 0, selection: {} };