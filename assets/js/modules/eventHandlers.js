import { UTILITIES } from "./utilities.js";
import { RENDERER } from "./render.js";
import { STORAGE } from "./storage.js";
import { setTheme } from "../theme.js";

const bill = document.querySelector(".bill .value");
const tip = document.querySelector(".tip .value");
const rate = document.querySelector(".rate .value");
const total = document.querySelector(".total .value");
const split = document.querySelector(".split .value");
const splitByValue = document.getElementById("split-by-value");

function settingsButtonClickHandler(e, theme, theme_palette) {
	const clickedItem = e.target.closest("#settings-button");
	if (!clickedItem) return;

	RENDERER.MODAL(theme, theme_palette);
}

function dataValueClickHandler(e, container) {
	const clickedItem = e.target.closest(".value");
	if (!clickedItem) return;

	container.querySelectorAll(".value")?.forEach((element) => {
		element.classList.remove("active");
	});
	clickedItem.classList.add("active");

	const classList = clickedItem.parentElement.classList;

	if (classList.contains("tip")) {
		tip.textContent = "0";
		rate.textContent = "0";
		total.textContent = "0.00";
	}

	if (classList.contains("total")) {
		tip.textContent = "0.00";
		rate.textContent = "0";
		total.textContent = "0";
	}

	if (classList.contains("rate")) {
		rate.textContent = "0";
		tip.textContent = "0.00";
		total.textContent = "0.00";
	}
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

	// Which data value is active?
	const data = document.querySelector(".data > .active");
	if (!data) return;

	const list = Array.from(data.parentElement.classList);

	if (clickedItem.id === "backspace") {
		let numArray = data.textContent.split("");
		numArray.splice(-1);
		data.textContent = numArray.join("");

		if (data.textContent === "") {
			data.textContent = "0";
		}
		updateDisplayedNumbers(data, list);
		return;
	}

	const currentVal = data.textContent;

	// Show change in display
	UTILITIES.DISPLAY.SET(data, currentVal, value);
	updateDisplayedNumbers(data, list);
}

function updateDisplayedNumbers(data, list) {
	let rateVal, tipVal, totalVal;
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
		rateVal = UTILITIES.CALCULATE.RATE.FROM_TIP(
			bill.textContent,
			data.textContent
		);
		rate.textContent = UTILITIES.DISPLAY.FORMAT(rateVal);
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

function modalCloseButtonClickHandler(e) {
	const clickedItem = e.target.closest(".btn-close");
	if (!clickedItem) return;

	document.querySelector(".modal")?.remove();
}

async function themeClickHandler(e) {
	const clickedItem = e.target.closest("[name='theme']");
	if (!clickedItem) return;

	const data = await STORAGE.FETCH();

	data.theme = clickedItem.value;

	STORAGE.SAVE(data);

	setTheme();
}

async function paletteClickHandler(e) {
	const clickedItem = e.target.closest("[name='palette']");
	if (!clickedItem) return;

	const data = await STORAGE.FETCH();

	data.theme_palette = clickedItem.value;

	STORAGE.SAVE(data);

	setTheme();
}

function resetButtonClickHandler(e) {
	const clickedItem = e.target.closest("#reset-btn");
	if (!clickedItem) return;

	bill.textContent = 0;
	tip.textContent = 0.0;
	rate.textContent = 10.0;
	total.textContent = 0.0;
	split.textContent = 0.0;
	splitByValue.textContent = 1;

	const elements = document.querySelectorAll(".value");
	for (const element of elements) {
		element.classList.remove("active");
	}
	bill.classList.add("active");
}

export const EVENT_HANDLERS = {
	CLICK: {
		BUTTONS: {
			SETTINGS: settingsButtonClickHandler,
			COUNTER: counterClickHandler,
			NUMPAD_KEYS: numpadKeyClickHandler,
			CLEAR: resetButtonClickHandler,
		},
		DATA: dataValueClickHandler,
		MODAL: {
			CLOSE: modalCloseButtonClickHandler,
			THEME: themeClickHandler,
			PALETTE: paletteClickHandler,
		},
	},
};
