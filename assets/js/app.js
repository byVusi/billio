import { EVENT_HANDLERS } from "./modules/eventHandlers.js";
import { setTheme } from "./theme.js";

async function init() {
	const BUTTONS = EVENT_HANDLERS.CLICK.BUTTONS;
	const NAV = document.querySelector("nav");
	const DATA_CONTAINER = document.getElementById("data-container");
	const SPLIT_CONTAINER = document.getElementById("split-container");
	const NUMPAD = document.getElementById("numpad");

	// Initialise app theme
	await setTheme();

	// Add initial event listeners to clickable items
	NAV.addEventListener("click", async (e) => {
		const [theme, theme_palette] = await setTheme();
		BUTTONS.SETTINGS(e, theme, theme_palette);
		BUTTONS.CLEAR(e);
	});

	SPLIT_CONTAINER.addEventListener("click", (e) => {
		BUTTONS.COUNTER(e);
	});

	NUMPAD.addEventListener("click", (e) => {
		BUTTONS.NUMPAD_KEYS(e);
	});

	DATA_CONTAINER.addEventListener("click", (e) => {
		EVENT_HANDLERS.CLICK.DATA(e, DATA_CONTAINER);
	});

	//Add initial event listeners to pointer items
	NUMPAD.addEventListener("pointerdown", (e) => {
		EVENT_HANDLERS.POINTER.START(e);
	});

	NUMPAD.addEventListener("pointerup", (e) => {
		EVENT_HANDLERS.POINTER.END(e);
	});

	NUMPAD.addEventListener("pointercancel", (e) => {
		EVENT_HANDLERS.POINTER.CANCEL(e);
	});
}

export const APP = {
	INIT: init,
};
