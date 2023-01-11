import { Link, useRouteError } from 'react-router-dom';
import styles from './ErrorPage.module.css';
import { IoArrowBackSharp } from 'react-icons/io5';

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
		<div id='error-page' className={styles.error_page}>
			<h1>Oops!</h1>
			<p>Sorry, an unexpected error has occurred.</p>
			{errorMessage}
			<Link to='/' className={styles.back_button}>
				<IoArrowBackSharp /> Back
			</Link>
		</div>
	);
};

export default ErrorPage;
