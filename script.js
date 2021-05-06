if (checks()) {
	createUI();
}

function createUI() {
	const mainDiv = $('#rptlist');

	const newDiv = document.createElement('div');
	newDiv.classList.add('row');

	const textDiv = document.createElement('h5');
	textDiv.innerText =
		'Choose the CSV file you wanna upload and click Aplly Changes Button.';
	textDiv.classList.add('col-xs-8');
	newDiv.appendChild(textDiv);

	const input = document.createElement('input');
	input.type = 'file';
	input.accept = '.csv, text/csv';
	input.classList.add('col-xs-2');
	newDiv.appendChild(input);

	const button = document.createElement('button');
	button.classList.add('btn');
	button.classList.add('col-xs-2');
	button.classList.add('btn-primary');
	button.innerText = 'Apply Changes!';
	button.addEventListener('click', function (e) {
		e.preventDefault();
		handleClick(input, newDiv);
	});

	newDiv.appendChild(button);
	newDiv.style.margin = '20px';
	mainDiv.insertBefore(newDiv, mainDiv.firstChild);
	window.__PSZYSET__ = true;
}

function handleClick(input, newDiv) {
	if (input.files.length === 0 || input.files[0].type !== 'text/csv') {
		handleError(newDiv);
	} else {
		let reader = new FileReader();

		reader.readAsText(input.files[0]);

		reader.onload = function () {
			const lis = $('.sortable-number');

			lis.forEach((li) => {
				li.style.setProperty('background-color', 'red', 'important');
				li.style.setProperty('border-color', 'red', 'important');
			});
			let result = CSVToArray(reader.result);

			for (let i = 1; i < result.length; i++) {
				const curNode = $(`[spn="${result[i][0]}"]`).parentNode;
				if (curNode === undefined) {
					console.log(station['Station ID']);
					handleError(newDiv);
				} else {
					curNode.parentNode.appendChild(curNode);
					let li = curNode.childNodes[2];
					li.style.setProperty(
						'background-color',
						'#428bca',
						'important'
					);
					li.style.setProperty(
						'border-color',
						'#428bca',
						'important'
					);
				}
			}
			correctRanks();
			const errorDiv = document.createElement('h5');
			errorDiv.innerText = 'Successfully Rearranged!';
			errorDiv.style.color = 'green';
			errorDiv.classList.add('col-xs-8');
			newDiv.appendChild(errorDiv);
		};

		reader.onerror = function () {
			console.log(reader.error);
			handleError(newDiv);
		};
	}
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
