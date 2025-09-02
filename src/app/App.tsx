import '../shared/styles/App.css';

import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AuthProvider } from '../shared/hooks/AuthContext';
import AuthCallback from '../shared/ui/AuthCallback';
import SilentCallback from '../shared/ui/SilentCallback';

import LoadingSpinner from '../shared/ui/LoadingSpinner';
import PrivateRoute from '../shared/ui/PrivateRoute';

const HomePage = lazy(() => import('../pages/HomePage'));
const ChatPage = lazy(() => import('../pages/ChatPage'));
const ProfilePage = lazy(() => import('../pages/ProfilePage'));
const PropertyDetailsPage = lazy(() => import('../pages/PropertyDetailsPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

function App() {
	return (
		<AuthProvider>
			<Router>
				<Suspense fallback={<LoadingSpinner />}>
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/callback" element={<AuthCallback />} />
						<Route
							path="/silent-callback"
							element={<SilentCallback />}
						/>
						<Route
							path="/chat"
							element={
								<PrivateRoute>
									<ChatPage />
								</PrivateRoute>
							}
						/>
						<Route
							path="/profile/"
							element={
								<PrivateRoute>
									<ProfilePage />
								</PrivateRoute>
							}
						/>
						<Route
							path="/property/:id"
							element={<PropertyDetailsPage />}
						/>

						<Route path="*" element={<NotFoundPage />} />
					</Routes>
				</Suspense>
			</Router>
		</AuthProvider>
	);
}

export default App;
