import { STORAGE } from "./modules/storage.js";

const html = document.querySelector("html");

export async function setTheme() {
	const data = await STORAGE.FETCH();

	html.dataset.theme = data.theme === "auto" ? isAuto() : data.theme;
	html.dataset.themePalette = data.theme_palette;

	const theme = data.theme;
	const theme_palette = data.theme_palette;

	return [theme, theme_palette];
}

function isAuto() {
	const now = new Date();
	const hours = now.getHours();

	if (hours >= 6 && hours <= 17) {
		return "light";
	} else {
		return "dark";
	}
}
