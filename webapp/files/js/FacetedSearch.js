'use strict';

export class FacetedSearch {
	
	constructor(inputElement, endpoint, callback, facets) {

		this.inputElement    = inputElement;
		this.typeaheadSearch = $(inputElement);
		this.endpoint = endpoint;
		
		this.initialize(callback, facets);
		
	}
	
	initialize(callback, facets) {

		const typeaheadConfiguration = [
			{
				highlight : true,
				hint      : true
			},
			{
				name   : 'shortcuts',
				source : new Bloodhound({
					datumTokenizer : Bloodhound.tokenizers.obj.whitespace('name'),
					queryTokenizer : Bloodhound.tokenizers.whitespace
				}),
				templates : {
					header     : '<h5 style="margin: 0 5px; color: #000;">Taskbase-Menü</h5>',
					suggestion : item => '<div>' + displayName(item) + '</div>',
				},
				display : this.displayName
			},
		];
		
		for(let facetName in facets) {
		
			let facet = facets[facetName];
			typeaheadConfiguration.push(this.setup(facetName, facet));
		
		}
		
		this.typeaheadSearch.typeahead.apply(this.typeaheadSearch, typeaheadConfiguration);
		this.typeaheadSearch.on('typeahead:select', callback.bind(this));

	}

	setup(title, property) {

		return {
			name   : title,
			source : new Bloodhound({
				datumTokenizer : Bloodhound.tokenizers.obj.whitespace('name'),
				queryTokenizer : Bloodhound.tokenizers.whitespace,
				identify       : item => item.id,
				remote         : {
					url      : this.endpoint + '?property=' + property + '&value=%QUERY',
					wildcard : '%QUERY',
					cache    : false,
				},
			}),
			templates : {
				header     : '<h5 style="margin: 0 5px; color: #000;">' + title + '</h5>',
				suggestion : item => '<div>' + this.displayName(item) + '</div>',
			},
			display : this.displayName,
			limit   : Infinity
		};

	}
	
	displayName(item) {
				
		return item.key;

	}
		
};