const html = document.querySelector("html");
const theme = html.dataset.theme;
const palette = html.dataset.themePalette;

const storedTheme = STORAGE.FETCH() || "light";
const storedPalette = STORAGE.FETCH() || "aether";