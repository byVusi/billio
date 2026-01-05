/**
 * Billio Service Worker
 * - GitHub Pages safe
 * - App-shell style
 * - No Workbox
 */

const REPO_NAME = "billio";
const BASE_PATH = `/${REPO_NAME}`;

const CACHE_VERSION = "v1";
const APP_SHELL_CACHE = `billio-app-shell-${CACHE_VERSION}`;
const RUNTIME_CACHE = `billio-runtime-${CACHE_VERSION}`;

/**
 * Core app shell files
 * These MUST exist or install will fail
 */
const APP_SHELL_FILES = [
	`${BASE_PATH}/`,
	`${BASE_PATH}/index.html`,
	`${BASE_PATH}/main.css`,
	`${BASE_PATH}/main.js`,
	`${BASE_PATH}/offline.html`,
];

/* =========================
   INSTALL
========================= */
self.addEventListener("install", (event) => {
	event.waitUntil(
		caches.open(APP_SHELL_CACHE).then((cache) => {
			return cache.addAll(APP_SHELL_FILES);
		})
	);
	self.skipWaiting();
});

/* =========================
   ACTIVATE
========================= */
self.addEventListener("activate", (event) => {
	event.waitUntil(
		caches
			.keys()
			.then((keys) =>
				Promise.all(
					keys
						.filter(
							(key) =>
								key !== APP_SHELL_CACHE && key !== RUNTIME_CACHE
						)
						.map((key) => caches.delete(key))
				)
			)
	);
	self.clients.claim();
});

/* =========================
   FETCH
========================= */
self.addEventListener("fetch", (event) => {
	const { request } = event;

	// Only handle GET requests
	if (request.method !== "GET") return;

	const url = new URL(request.url);

	// Ignore cross-origin requests
	if (url.origin !== self.location.origin) return;

	/* -------------------------
	   1. HTML: Network-first
	-------------------------- */
	if (request.mode === "navigate") {
		event.respondWith(
			fetch(request)
				.then((response) => {
					const copy = response.clone();
					caches
						.open(APP_SHELL_CACHE)
						.then((cache) => cache.put(request, copy));
					return response;
				})
				.catch(() => caches.match(`${BASE_PATH}/offline.html`))
		);
		return;
	}

	/* -------------------------
	   2. Static assets: Cache-first
	   (CSS, JS, fonts)
	-------------------------- */
	if (
		request.destination === "style" ||
		request.destination === "script" ||
		request.destination === "font"
	) {
		event.respondWith(
			caches.match(request).then((cached) => {
				return (
					cached ||
					fetch(request).then((response) => {
						const copy = response.clone();
						caches
							.open(RUNTIME_CACHE)
							.then((cache) => cache.put(request, copy));
						return response;
					})
				);
			})
		);
		return;
	}

	/* -------------------------
	   3. Everything else: Stale-while-revalidate
	-------------------------- */
	event.respondWith(
		caches.match(request).then((cached) => {
			const fetchPromise = fetch(request)
				.then((response) => {
					const copy = response.clone();
					caches
						.open(RUNTIME_CACHE)
						.then((cache) => cache.put(request, copy));
					return response;
				})
				.catch(() => cached);

			return cached || fetchPromise;
		})
	);
});
