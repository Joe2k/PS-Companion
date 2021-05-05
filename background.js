try {
	chrome.action.onClicked.addListener((activeTab) => {
		chrome.scripting.executeScript(
			{
				target: { tabId: activeTab.id },
				files: ['script.js'],
			},
			() => {
				console.log('done');
			}
		);
	});
} catch (e) {
	console.log(e);
}
