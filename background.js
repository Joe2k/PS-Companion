try {
	chrome.browserAction.onClicked.addListener((activeTab) => {
		chrome.tabs.executeScript(null, {
			file: 'script.js',
		});
	});
	// var fileChooser = document.createElement('input');
	// fileChooser.type = 'file';
	// fileChooser.accept = '.csv, text/csv';
	// fileChooser.addEventListener('change', function () {
	// 	console.log('yee');
	// });

	// chrome.runtime.onMessage.addListener(function (msg) {
	// 	if (msg.action === 'browseAndUpload') {
	// 		fileChooser.click();
	// 		console.log(msg);
	// 	}
	// });
} catch (e) {
	console.log(e);
}
