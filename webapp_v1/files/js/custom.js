function initializeSpecialElements() {

	initializeSelect2();

}

function initializeSelect2() {

	const selectElements = document.getElementsByClassName('select2-input');
	for(let selectElement of selectElements) {
	
		let jQueryElement = $(selectElement)
		jQueryElement.select2();
		
	}
	
}

document.addEventListener('DOMContentLoaded', function(event) {

	initializeSpecialElements();
	
});