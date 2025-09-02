import { lazy, Suspense } from 'react';

import { ErrorBoundary } from 'react-error-boundary';

const SearchApp = lazy(() => import('searchService/SearchApp'));

const RemoteSearchApp = () => {
	return (
		<ErrorBoundary fallback={<div>Error loading SearchApp</div>}>
			<Suspense fallback={<div>Loading...</div>}>
				<SearchApp />
			</Suspense>
		</ErrorBoundary>
	);
};

export default RemoteSearchApp;
