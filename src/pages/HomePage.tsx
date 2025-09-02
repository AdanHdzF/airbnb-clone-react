import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { PropertyGrid, SearchBar } from '../features/properties';
// import { useAuth } from '../features/properties/hooks/useAuth';

import RemotePropertyApp from '../shared/ui/RemotePropertyApp';
import RemoteSearchApp from '../shared/ui/RemoteSearchApp';

import OneSignal from 'react-onesignal';

function HomePage() {
	// const { isAuthenticated, login } = useAuth();
	// const navigate = useNavigate();

	// const handleLogin = () => {
	// 	login();
	// 	navigate('/profile');
	// };

	useEffect(() => {
		OneSignal.init({
			appId: 'bcfb7c34-a628-4597-abaf-718a53706d46',
			allowLocalhostAsSecureOrigin: true,
		});

		// Notification.requestPermission().then((permission) => {
		// 	if (permission === 'granted') {
		// 		console.log('Notification permission granted.');
		// 	} else {
		// 		console.log('Notification permission denied.');
		// 	}
		// });

		// new Notification('Hello!', {
		// 	body: 'This is a notification from your app!',
		// 	icon: 'https://example.com/icon.png',
		// });
	}, []);

	return (
		<>
			{/* {!isAuthenticated && <button onClick={handleLogin}>Login</button>} */}

			<Link to="/profile">Profile</Link>

			<SearchBar />
			<PropertyGrid />
			<RemotePropertyApp />
			{/* <RemoteSearchApp /> */}
		</>
	);
}

export default HomePage;
