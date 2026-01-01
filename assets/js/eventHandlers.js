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

	const number = clickedItem.textContent;

	if (number.length > 1) return; // return when backspace button is clicked

	console.log(number);
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
