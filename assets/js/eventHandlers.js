import { UTILITIES } from "./modules/utilities.js";

function settingsButtonClickHandler(e) {
	const clickedItem = e.target.closest("#settings-button");
	if (!clickedItem) return;

	console.log("Settings button clicked");
}

function dataValueClickHandler(e, container) {
	const clickedItem = e.target.closest(".value");
	if (!clickedItem) return;

	// Remove .active from all data values
	container.querySelectorAll(".value")?.forEach((element) => {
		element.classList.remove("active");
	});

	clickedItem.classList.add("active");
}

function counterClickHandler(e, splitByValue) {
	const clickedItem = e.target.closest(".counter-control");
	if (!clickedItem) return;

	let count = splitByValue.textContent;

	if (clickedItem?.id === "decrease" && Number(count) > 1)
		splitByValue.textContent = --count;

	if (clickedItem?.id === "increase") splitByValue.textContent = ++count;
}

function numpadKeyClickHandler(e) {
	const clickedItem = e.target.closest(".numpad-key");
	if (!clickedItem) return;

	const value = clickedItem.textContent;

	if (value.length > 1) return; // return when backspace button is clicked

	// Which data value is active?
	const data = document.querySelector(".data > .active");
	if (!data) return;

	const currentVal = data.textContent;

	// Show change in display
	UTILITIES.DISPLAY.SET(data, currentVal, value);
}

export const EVENT_HANDLERS = {
	CLICK: {
		BUTTONS: {
			SETTINGS: settingsButtonClickHandler,
			COUNTER: counterClickHandler,
			NUMPAD_KEYS: numpadKeyClickHandler,
		},
		DATA: dataValueClickHandler,
	},
};
