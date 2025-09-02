import { useLocation } from 'react-router-dom';

function NotFoundPage() {
	const location = useLocation();
	console.log(location.pathname);

	return (
		<div>
			<h1>404 - Not Found</h1>
			<p>The page you are looking for does not exist.</p>
		</div>
	);
}

export default NotFoundPage;
