import { lazy, Suspense, useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { usePropertiesStore, type Property } from '../../features/properties';
import { PropertiesApi } from '../../features/properties/api/propertiesApi';

const PropertyApp = lazy(() => import('propertyService/PropertyApp'));

// const fakeProperties = [
// 	{
// 		id: 1,
// 		image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
// 		title: 'Property 1',
// 		type: 'Type 1',
// 		location: 'Location 1',
// 		details: 'Details 1',
// 		host: 'Host 1',
// 		price: 100,
// 		rating: 5,
// 	},
// 	{
// 		id: 2,
// 		image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
// 		title: 'Property 2',
// 		type: 'Type 2',
// 		location: 'Location 2',
// 		details: 'Details 2',
// 		host: 'Host 2',
// 		price: 200,
// 		rating: 4,
// 	},
// 	{
// 		id: 3,
// 		image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
// 		title: 'Property 3',
// 		type: 'Type 3',
// 		location: 'Location 3',
// 		details: 'Details 3',
// 		host: 'Host 3',
// 		price: 300,
// 		rating: 3,
// 	},
// ];

const RemotePropertyApp = () => {
	const loadProperties = usePropertiesStore((state) => state.loadProperties);
	const properties = usePropertiesStore((state) => state.properties);
	const loading = usePropertiesStore((state) => state.loading);
	const searchTerm = usePropertiesStore((state) => state.searchTerm);

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

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<ErrorBoundary fallback={<div>Error loading PropertyApp</div>}>
			<Suspense fallback={<div>Loading...</div>}>
				<PropertyApp properties={searchedProperties} />
			</Suspense>
		</ErrorBoundary>
	);
};

export default RemotePropertyApp;
