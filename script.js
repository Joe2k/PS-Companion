if (checks()) {
	createUI();
}

function createUI() {
	const mainDiv = $('#rptlist');

	const newDiv = document.createElement('div');
	newDiv.style.border = '2px solid';
	newDiv.style.borderColor = '#0275d8';
	newDiv.style.padding = '1%';
	newDiv.classList.add('row');

	const mainHead = document.createElement('h1');
	mainHead.innerText = 'PS Companion';
	mainHead.classList.add('text-primary');
	mainHead.classList.add('col-xs-8');
	newDiv.appendChild(mainHead);

	const textDiv = document.createElement('div');
	// textDiv.innerText =
	// 	'Choose the CSV file you want to upload, select which domains you want on top to rearrange the new PS Stations which are not there in CSV and then click Apply Changes! Button.';
	textDiv.classList.add('col-xs-12');
	const step1 = document.createElement('h5');
	step1.innerText = '1. Choose the CSV file you want to upload.';
	const step2 = document.createElement('h5');
	step2.innerText =
		'2. When a station in the preference list below is not found in the CSV file, then select which all domains stations you want to see on the top. The non selected domains stations will therefore be pushed to the last.';
	const step3 = document.createElement('h5');
	step3.innerText = '3. Click on Apply Changes! button.';
	step1.style.margin = '0px';
	step2.style.margin = '0px';
	step3.style.margin = '0px';
	textDiv.appendChild(step1);
	textDiv.appendChild(document.createElement('br'));
	textDiv.appendChild(step2);
	textDiv.appendChild(document.createElement('br'));
	textDiv.appendChild(step3);
	textDiv.style.marginBottom = '2%';
	newDiv.appendChild(textDiv);

	const input = document.createElement('input');
	input.type = 'file';
	input.accept = '.csv, text/csv';
	input.classList.add('col-xs-4');
	input.style.fontSize = '16px';
	newDiv.appendChild(input);

	const domainDiv = document.createElement('div');
	domainDiv.classList.add('col-xs-4');
	const domainLabel = document.createElement('p');
	domainLabel.innerText = 'Select Domains';
	domainLabel.style.fontSize = '16px';
	const domainSelect = document.createElement('select');
	domainSelect.id = 'domain';
	domainSelect.classList.add('form-select');
	domainSelect.setAttribute('multiple', true);
	const op1 = document.createElement('option');
	op1.innerText = 'Chemical';
	const op2 = document.createElement('option');
	op2.innerHTML = 'Electronics';
	const op3 = document.createElement('option');
	op3.innerText = 'Finance and Mgmt';
	const op4 = document.createElement('option');
	op4.innerText = 'Govt Research Lab';
	const op5 = document.createElement('option');
	op5.innerText = 'IT';
	const op6 = document.createElement('option');
	op6.innerText = 'Infrastructure';
	const op7 = document.createElement('option');
	op7.innerText = 'Mechanical';
	const op8 = document.createElement('option');
	op8.innerText = 'Health Care';
	const op9 = document.createElement('option');
	op9.innerText = 'Others';
	domainSelect.appendChild(op1);
	domainSelect.appendChild(op2);
	domainSelect.appendChild(op3);
	domainSelect.appendChild(op4);
	domainSelect.appendChild(op5);
	domainSelect.appendChild(op6);
	domainSelect.appendChild(op7);
	domainSelect.appendChild(op8);
	domainSelect.appendChild(op9);
	domainSelect.style.height = '160px';
	domainSelect.style.width = '100%';
	domainInfo = document.createElement('p');
	domainInfo.innerText =
		'Hold down the Ctrl (windows) or Command (Mac) button to select multiple domains.';
	domainInfo.classList.add('text-danger');
	domainDiv.appendChild(domainLabel);
	domainDiv.appendChild(domainSelect);
	domainDiv.appendChild(domainInfo);
	domainDiv.style.marginRight = '10%';
	newDiv.appendChild(domainDiv);

	const button = document.createElement('button');
	button.classList.add('btn');
	button.classList.add('col-xs-2');
	button.classList.add('btn-primary');
	button.innerText = 'Apply Changes!';
	button.style.fontSize = '16px';
	button.addEventListener('click', function (e) {
		e.preventDefault();
		handleClick(input, newDiv);
	});
	newDiv.appendChild(button);

	const textDiv2 = document.createElement('a');
	textDiv2.href = 'https://psitseasy.ml/projectBank';
	textDiv2.innerText =
		'Click here to download the latest Station Details in CSV from Project Bank at psitseasy.ml';
	textDiv2.classList.add('col-xs-12');
	textDiv2.target = '_blank';
	textDiv2.style.fontSize = '18px';
	textDiv2.style.marginTop = '2%';
	newDiv.appendChild(textDiv2);

	newDiv.style.margin = '20px';
	mainDiv.insertBefore(newDiv, mainDiv.firstChild);
	window.__PSZYSET__ = true;
}

function handleClick(input, newDiv) {
	if (
		input.files.length === 0 ||
		input.files[0].name.split('.')[
			input.files[0].name.split('.').length - 1
		] !== 'csv'
	) {
		console.log(input.files);
		handleError(newDiv);
	} else {
		let reader = new FileReader();

		reader.readAsText(input.files[0]);

		reader.onload = function () {
			colorAllRed();

			let result = CSVToArray(reader.result);

			rearrange(result, newDiv);
			correctRanks();
			handleSuccess(newDiv);
		};

		reader.onerror = function () {
			console.log(reader.error);
			handleError(newDiv);
		};
	}
}

function handleSuccess(newDiv) {
	const successDiv = document.createElement('h5');
	successDiv.innerText = 'Successfully Rearranged!';
	successDiv.style.color = 'green';
	successDiv.classList.add('col-xs-12');
	newDiv.appendChild(successDiv);
	const warningDiv = document.createElement('h5');
	warningDiv.innerText =
		'If you see some of the numbers in red it means that they were not there in your CSV file which you uploaded. That inturn either means they are newly added stations and were not yet added in the project bank or have been removed from the project bank but have not yet been removed from here. So rearrange those choices according to your wish before you click on Save All Preferences.';
	warningDiv.style.color = 'red';
	warningDiv.classList.add('col-xs-12');
	newDiv.appendChild(warningDiv);
}

function rearrange(result, newDiv) {
	for (let i = 1; i < result.length; i++) {
		const curNode = $(`[spn="${result[i][0]}"]`).parentNode;
		if (curNode === undefined) {
			console.log(i, result[i][0]);
			//handleError(newDiv);
		} else {
			curNode.parentNode.appendChild(curNode);
			let li = curNode.childNodes[2];
			li.style.setProperty('background-color', '#428bca', 'important');
			li.style.setProperty('border-color', '#428bca', 'important');
		}
	}

	const list = $('.clearfix');
	const select = $('#domain');
	const domainSelected = new Set(
		Array.from(select.querySelectorAll('option:checked'), (e) =>
			e.value.replace(' ', '')
		)
	);

	for (let i = 0; i < list.length; i++) {
		const item = list[i];
		if (item.childNodes[2].style.backgroundColor === 'red') {
			if (
				!domainSelected.has(
					item.childNodes[0].innerText.split('-')[0].replace(' ', '')
				)
			) {
				item.parentNode.appendChild(item);
			}
		} else {
			break;
		}
	}
}

function colorAllRed() {
	const lis = $('.sortable-number');

	lis.forEach((li) => {
		li.style.setProperty('background-color', 'red', 'important');
		li.style.setProperty('border-color', 'red', 'important');
	});
}

function handleError(newDiv) {
	const errorDiv = document.createElement('h5');
	errorDiv.innerText = 'Please upload a CSV file and click apply button';
	errorDiv.style.color = 'red';
	errorDiv.classList.add('col-xs-8');
	newDiv.appendChild(errorDiv);
}

function checks() {
	if (location.hostname !== 'psd.bits-pilani.ac.in') {
		alert('Only works on http://psd.bits-pilani.ac.in');
		return false;
	}

	if (!location.pathname.includes('StudentStationPreference.aspx')) {
		alert('You need to be on Fill Station Prefrence page');
		return false;
	}

	if (window.__PSZYSET__ === true) {
		alert('Already ran here once. Please refresh');
		return false;
	}

	return true;
}

function $(selector) {
	const elems = document.querySelectorAll(selector);
	return elems.length === 1 ? elems[0] : [...elems];
}

function correctRanks() {
	$('#sortable_nav > li').forEach((li, index) => {
		li.querySelector('.sortable-number span').innerText = index + 1;
	});
}

function CSVToArray(strData, strDelimiter) {
	// Check to see if the delimiter is defined
	strDelimiter = strDelimiter || ',';

	// Create a regular expression to parse the CSV values.
	var objPattern = new RegExp(
		// Delimiters.
		'(\\' +
			strDelimiter +
			'|\\r?\\n|\\r|^)' +
			// Quoted fields.
			'(?:"([^"]*(?:""[^"]*)*)"|' +
			// Standard fields.
			'([^"\\' +
			strDelimiter +
			'\\r\\n]*))',
		'gi'
	);

	// Create an array to hold our data
	var arrData = [[]];

	// Create an array to hold our individual pattern
	// matching groups.
	var arrMatches = null;

	// Keep looping over the regular expression matches
	// until we can no longer find a match.
	while ((arrMatches = objPattern.exec(strData))) {
		// Get the delimiter that was found.
		var strMatchedDelimiter = arrMatches[1];

		// Check to see if the given delimiter has a length
		// (is not the start of string) and if it matches
		// field delimiter. If id does not, then we know
		// that this delimiter is a row delimiter.
		if (
			strMatchedDelimiter.length &&
			strMatchedDelimiter !== strDelimiter
		) {
			// Since we have reached a new row of data,
			// add an empty row to our data array.
			arrData.push([]);
		}

		var strMatchedValue;

		// Now that we have our delimiter out of the way,
		// let's check to see which kind of value we
		// captured (quoted or unquoted).
		if (arrMatches[2]) {
			// We found a quoted value. When we capture
			// this value, unescape any double quotes.
			strMatchedValue = arrMatches[2].replace(new RegExp('""', 'g'), '"');
		} else {
			// We found a non-quoted value.
			strMatchedValue = arrMatches[3];
		}

		// Now that we have our value string, let's add
		// it to the data array.
		arrData[arrData.length - 1].push(strMatchedValue);
	}

	// Return the parsed data.
	return arrData;
}
