if ("serviceWorker" in navigator) {
	navigator.serviceWorker
		.register(`/sw.js`)
		.then(() => console.log("✅ Service Worker registered"))
		.catch((err) => console.error("❌ Service Worker failed:", err));
}

import { APP } from "./assets/js/app.js";

APP.INIT();
