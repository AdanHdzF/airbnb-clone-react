import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/AuthContext';
// import { useAuth } from '../../features/properties/hooks/useAuth';

interface PrivateRouteProps {
	children: ReactNode;
	roles?: string[];
	fallback?: ReactNode;
}

function PrivateRoute({ children, roles, fallback }: PrivateRouteProps) {
	const { isAuthenticated, user, isLoading, error, login } = useAuthContext();

	// console.log('user', user);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (!isAuthenticated) {
		return (
			<div>
				<h1>You are not authenticated</h1>
				<button onClick={login}>Login</button>
			</div>
		);
	}

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	// if (roles && !roles.includes(user.role)) {
	// 	return fallback || <Navigate to="/" replace />;
	// }

	return <>{children}</>;
}

export default PrivateRoute;
