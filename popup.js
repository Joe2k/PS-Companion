let applyButton = document.getElementById('applyButton');

applyButton.addEventListener('click', async () => {
	let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

	chrome.scripting.executeScript({
		target: { tabId: tab.id },
		files: ['script.js'],
	});
});
