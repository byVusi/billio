import { EVENT_HANDLERS } from "./assets/js/eventHandlers.js";

const BUTTONS = EVENT_HANDLERS.CLICK.BUTTONS;
const NAV = document.querySelector("nav");
const DATA_CONTAINER = document.getElementById("data-container");
const SPLIT_CONTAINER = document.getElementById("split-container");
const SPLIT_BY_VALUE = document.getElementById("split-by-value");
const NUMPAD = document.getElementById("numpad");

// Add initial event listeners to clickable items
NAV.addEventListener("click", (e) => {
	BUTTONS.SETTINGS(e);
});

SPLIT_CONTAINER.addEventListener("click", (e) => {
	BUTTONS.COUNTER(e, SPLIT_BY_VALUE);
});

NUMPAD.addEventListener("click", (e) => {
	BUTTONS.NUMPAD_KEYS(e);
});

DATA_CONTAINER.addEventListener("click", (e) => {
	EVENT_HANDLERS.CLICK.DATA(e, DATA_CONTAINER);
});
