declare module 'propertyService/PropertyApp' {
	interface PropertyAppProps {
		properties: Property[];
	}

	const PropertyApp: React.ComponentType<PropertyAppProps>;
	export default PropertyApp;
}

declare module 'searchService/SearchApp' {
	const SearchApp: React.ComponentType;
	export default SearchApp;
}
