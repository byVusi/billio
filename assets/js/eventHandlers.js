function settingsButtonClickHandler(e) {
	const clickedButton = e.target.closest("settings-button");
	if (!clickedButton) return;

	console.log("Settings button clicked");
}
