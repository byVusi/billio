import { UTILITIES } from "./modules/utilities.js";

const bill = document.querySelector(".bill .value");
const tip = document.querySelector(".tip .value");
const rate = document.querySelector(".rate .value");
const total = document.querySelector(".total .value");
const split = document.querySelector(".split .value");
const splitByValue = document.getElementById("split-by-value");

function settingsButtonClickHandler(e) {
	const clickedItem = e.target.closest("#settings-button");
	if (!clickedItem) return;

	console.log("Settings button clicked");
}

function dataValueClickHandler(e, container) {
	const clickedItem = e.target.closest(".value");
	if (!clickedItem) return;

	container.querySelectorAll(".value")?.forEach((element) => {
		element.classList.remove("active");
	});
	clickedItem.classList.add("active");

	if (clickedItem.parentElement.classList.contains("total")) {
		clearData(); // resets the tip rate, tip amount and total amount values
	}

	if (clickedItem.parentElement.classList.contains("tip")) {
		clearData();
	}
}

function clearData() {
	rate.textContent = "0";
	tip.textContent = "0";
	total.textContent = "0";
}

function counterClickHandler(e) {
	const clickedItem = e.target.closest(".counter-control");
	if (!clickedItem) return;

	let count = splitByValue.textContent;

	if (clickedItem?.id === "decrease" && Number(count) > 1)
		splitByValue.textContent = --count;

	if (clickedItem?.id === "increase") splitByValue.textContent = ++count;

	let calcResult = UTILITIES.CALCULATE.SPLIT(
		total.textContent,
		splitByValue.textContent
	);

	split.textContent = UTILITIES.DISPLAY.FORMAT(calcResult);
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

	const list = Array.from(data.parentElement.classList);

	let tipVal, totalVal;
	if (list.includes("bill")) {
		tipVal = UTILITIES.CALCULATE.TIP.FROM_RATE(
			data.textContent,
			rate.textContent
		);
		totalVal = UTILITIES.CALCULATE.FINAL(data.textContent, tipVal);
		tip.textContent = UTILITIES.DISPLAY.FORMAT(tipVal);
		total.textContent = UTILITIES.DISPLAY.FORMAT(totalVal);
	}
	if (list.includes("tip")) {
		totalVal = UTILITIES.CALCULATE.FINAL(
			bill.textContent,
			data.textContent
		);
		total.textContent = UTILITIES.DISPLAY.FORMAT(totalVal);
	}
	if (list.includes("rate")) {
		tipVal = UTILITIES.CALCULATE.TIP.FROM_RATE(
			bill.textContent,
			data.textContent
		);
		totalVal = UTILITIES.CALCULATE.FINAL(bill.textContent, tipVal);
		tip.textContent = UTILITIES.DISPLAY.FORMAT(tipVal);
		total.textContent = UTILITIES.DISPLAY.FORMAT(totalVal);
	}
	if (list.includes("total")) {
		tipVal = UTILITIES.CALCULATE.TIP.FROM_FINAL(
			bill.textContent,
			data.textContent
		);
		tip.textContent = UTILITIES.DISPLAY.FORMAT(tipVal);
	}

	let splitVal = UTILITIES.CALCULATE.SPLIT(
		total.textContent,
		splitByValue.textContent
	);
	split.textContent = UTILITIES.DISPLAY.FORMAT(splitVal);
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
