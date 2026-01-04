/**
 * @fileoverview Basic service worker script for offline support.
 * Caches specified assets during installation, removes old caches on activation,
 * and serves cached assets when offline.
 */
const REPO_NAME = "billio";
const BASE_PATH = `/${REPO_NAME}`;
const CACHE_NAME = `${REPO_NAME}-cache-v1.0`;

/**
 * List of static assets to cache during the install event.
 * @constant {string[]}
 */
const FILES_TO_CACHE = [
	`${BASE_PATH}/`,
	`${BASE_PATH}/index.html`,
	`${BASE_PATH}/main.css`,
	`${BASE_PATH}/main.js`,
	`${BASE_PATH}/assets/css/components/modal.css`,
	`${BASE_PATH}/assets/css/colors.css`,
	`${BASE_PATH}/assets/css/interface.css`,
	`${BASE_PATH}/assets/fonts/Nunito-VariableFont_wghtt.ttf`,
	`${BASE_PATH}/assets/js/app.js`,
	`${BASE_PATH}/assets/js/theme.js`,
	`${BASE_PATH}/assets/js/modules/build.js`,
	`${BASE_PATH}/assets/js/modules/eventHandlers.js`,
	`${BASE_PATH}/assets/js/modules/render.js`,
	`${BASE_PATH}/assets/js/modules/storage.js`,
	`${BASE_PATH}/assets/js/modules/utilities.js`,
];

/**
 * Install event handler.
 * Caches all files listed in FILES_TO_CACHE.
 *
 * @param {ExtendableEvent} event - The install event.
 */
self.addEventListener("install", (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
	);
	self.skipWaiting();
});

/**
 * Activate event handler.
 * Removes old caches that don’t match the current CACHE_NAME.
 *
 * @param {ExtendableEvent} event - The activate event.
 */
self.addEventListener("activate", function (event) {
	event.waitUntil(
		caches.keys().then(function (keys) {
			return Promise.all(
				keys
					.filter((key) => key !== CACHE_NAME)
					.map((key) => caches.delete(key))
			);
		})
	);
	self.clients.claim(); // Takes control of uncontrolled clients as soon as it activates.
});

/**
 * Fetch event handler.
 * Responds with cached resources when available, otherwise fetches from the network.
 *
 * @param {FetchEvent} event - The fetch event.
 */
self.addEventListener("fetch", function (event) {
	event.respondWith(
		caches.match(event.request).then(function (response) {
			return response || fetch(event.request);
		})
	);
});
