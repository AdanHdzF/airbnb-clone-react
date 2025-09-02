import './PropertyGrid.css';

import { useEffect, useState } from 'react';

import { PropertyCard } from '../PropertyCard';
import usePropertiesStore from '../../model/store';
import type { Property } from '../../model/types';

import { PropertiesApi } from '../../api/propertiesApi';

function PropertyGrid() {
	const loadProperties = usePropertiesStore((state) => state.loadProperties);
	const properties = usePropertiesStore((state) => state.properties);
	// const searchedProperties = usePropertiesStore(
	// 	(state) => state.searchedProperties
	// );
	const loading = usePropertiesStore((state) => state.loading);
	const searchTerm = usePropertiesStore((state) => state.searchTerm);
	// const searchProperties = usePropertiesStore(
	// 	(state) => state.searchProperties
	// );

	const [searchedProperties, setSearchedProperties] = useState<Property[]>(
		[]
	);

	useEffect(() => {
		loadProperties();
	}, [loadProperties]);

	useEffect(() => {
		setSearchedProperties(properties);
	}, [properties]);

	useEffect(() => {
		if (!searchTerm || searchTerm.trim() === '') {
			setSearchedProperties(properties);
			return;
		}

		const abortController = new AbortController();

		const searchProperties = async (location: string) => {
			const properties = await PropertiesApi.searchProperties(
				location,
				abortController.signal
			);
			setSearchedProperties(properties);
		};
		searchProperties(searchTerm);

		return () => {
			console.log('Cleaning up search', searchTerm);
			abortController.abort();
		};
	}, [searchTerm, properties]);

	console.log('Searched properties:', searchedProperties);

	// const sortedProperties = useMemo(() => {
	// 	const filteredProperties = properties.filter((property) =>
	// 		property.location.toLowerCase().includes(searchTerm.toLowerCase())
	// 	);
	// 	return [...filteredProperties].sort((a, b) => a.price - b.price);
	// }, [properties, searchTerm]);

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<div className="property-grid-container">
			<h1>Popular Destinations</h1>
			<div className="property-grid">
				{searchedProperties.map((property: Property) => (
					<PropertyCard key={property.id} {...property} />
				))}
			</div>
		</div>
	);
}

export default PropertyGrid;
