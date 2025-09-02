import { useState, useEffect } from 'react';
import { useAuthContext } from '../shared/hooks/AuthContext';

function ProfilePage() {
	const { user, logout } = useAuthContext();

	useEffect(() => {
		console.log(user);
	}, [user]);

	if (!user) {
		return <div>No user information available</div>;
	}

	const formatClaim = (value: unknown) => {
		if (typeof value === 'object' && value !== null) {
			return JSON.stringify(value);
		}

		if (typeof value === 'boolean') {
			return value ? 'true' : 'false';
		}

		if (typeof value === 'number') {
			return value.toString;
		}

		return value;
	};

	const checkUsername = () => {
		if (formatClaim(user?.profile?.name) == 'admin') {
			return 'admin';
		}
		return 'user';
	};

	return (
		<>
			<div>Your Profile Information</div>
			<button onClick={logout}>Logout</button>
		</>
	);
}

export default ProfilePage;
