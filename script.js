if (checks()) {
	const curNode = $('[spn="5861"]').parentNode;
	curNode.parentNode.appendChild(curNode);
	correctRanks();
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
