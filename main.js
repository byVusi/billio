const REPO_NAME = "billio";
const BASE_PATH = `/${REPO_NAME}`;

if ("serviceWorker" in navigator) {
	navigator.serviceWorker
		.register(`${BASE_PATH}/sw.js`)
		.then(() => console.log("✅ Service Worker registered"))
		.catch((err) => console.error("❌ Service Worker failed:", err));
}

import { APP } from "./assets/js/app.js";

APP.INIT();
