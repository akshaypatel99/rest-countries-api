import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
	const error = useRouteError();
	console.error(error);

	let errorMessage;
	if (error instanceof Error) {
		errorMessage = (
			<p>
				<i>{error.message}</i>
			</p>
		);
	}

	return (
		<div id='error-page'>
			<h1>Oops!</h1>
			<p>Sorry, an unexpected error has occurred.</p>
			{errorMessage}
		</div>
	);
};

export default ErrorPage;
