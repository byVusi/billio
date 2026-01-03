import { EVENT_HANDLERS } from "./assets/js/modules/eventHandlers.js";

const BUTTONS = EVENT_HANDLERS.CLICK.BUTTONS;
const NAV = document.querySelector("nav");
const DATA_CONTAINER = document.getElementById("data-container");
const SPLIT_CONTAINER = document.getElementById("split-container");
const NUMPAD = document.getElementById("numpad");

// Add initial event listeners to clickable items
NAV.addEventListener("click", (e) => {
	BUTTONS.SETTINGS(e);
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
