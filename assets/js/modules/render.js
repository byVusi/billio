import { BUILDER } from "./build.js";
import { EVENT_HANDLERS } from "./eventHandlers.js";

function renderModal(theme, theme_palette) {
	document.body.append(BUILDER.MODAL(theme, theme_palette));
	const MODAL = document.querySelector(".modal");

	if (!MODAL) return;

	MODAL.removeEventListener("click", EVENT_HANDLERS.CLICK.MODAL.CLOSE);
	MODAL.addEventListener("click", (e) => {
		EVENT_HANDLERS.CLICK.MODAL.CLOSE(e);
	});

	const MODAL_BODY = MODAL.querySelector(".modal-body");
	if (!MODAL_BODY) return;

	MODAL_BODY.removeEventListener("click", EVENT_HANDLERS.CLICK.MODAL.THEME);
	MODAL_BODY.addEventListener("click", (e) => {
		EVENT_HANDLERS.CLICK.MODAL.THEME(e);
	});

	MODAL_BODY.removeEventListener("click", EVENT_HANDLERS.CLICK.MODAL.PALETTE);
	MODAL_BODY.addEventListener("click", (e) => {
		EVENT_HANDLERS.CLICK.MODAL.PALETTE(e);
	});
}

function renderSettingsButton() {
	document.querySelector("nav")?.append(BUILDER.SETTINGS_BUTTON());
	const SETTINGS_ELEMENT = document.querySelector("nav button");

	if (!SETTINGS_ELEMENT) return;

	SETTINGS_ELEMENT.removeEventListener(
		"click",
		EVENT_HANDLERS.CLICK.SETTINGS
	);
	SETTINGS_ELEMENT.addEventListener("click", (e) => {
		EVENT_HANDLERS.CLICK.SETTINGS(e);
	});
}

export const RENDERER = {
	MODAL: renderModal,
	SETTINGS_BUTTON: renderSettingsButton,
};
