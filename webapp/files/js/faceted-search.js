import { FacetedSearch } from '/js/FacetedSearch.js';

function callback(e, data) {

	if(data && data['property'] && data['value']) {
		
		let page;
		switch(data.type) {

			case 'Demo_Clause':
				page = 'clause';	
				break;
			case 'Demo_Datasheet':
				page = 'datasheet';
				break;
			case 'Demo_Deliverable':
				page = 'deliverable';
				break;
			case 'Demo_Drawing':
				page = 'drawing';
				break;
			case 'Demo_Equipment':
				page = 'equipment';
				break;
			case 'Demo_Workpack':
				page = 'workpack';
				break;
			
		}

		location.href = '/' + page + '/' + data.value;

	}
}

document.addEventListener('DOMContentLoaded', function(event) {

	const searchInput = document.getElementById('facetted-search-input');
	
	const facetedSearch = new FacetedSearch(searchInput, '/endpoints/faceted-search', callback, {
		Clauses      : 'clause',
		Datasheets   : 'datasheet',
		Deliverables : 'deliverable',
		Drawings     : 'drawing',
		Equipment    : 'equipment',
		Workpacks    : 'workpack'
	});

});