import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../shared/styles/index.css';
import App from './App.tsx';

import { ApolloProvider } from '@apollo/client/react';
import { apolloClient } from '../shared/graphql/client';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ApolloProvider client={apolloClient}>
			<App />
		</ApolloProvider>
	</StrictMode>
);
