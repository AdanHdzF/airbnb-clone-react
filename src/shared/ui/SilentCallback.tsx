import { useAuth } from 'react-oidc-context';
import { useEffect } from 'react';

const SilentCallback = () => {
	const auth = useAuth();

	useEffect(() => {
		console.log('SilentCallback: ', auth);
		if (auth.isAuthenticated) {
			localStorage.setItem(
				'access_token',
				String(auth.user?.access_token) || ''
			);
		}
	}, [auth]);

	return (
		<div>
			<h1>SilentCallback...</h1>
		</div>
	);
};

export default SilentCallback;
