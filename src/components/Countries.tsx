import { Country } from '../utils';
import { useCountries } from '../hooks/useCountries';
import SearchOptions from './home/SearchOptions';
import Card from './home/Card';
import styles from './Countries.module.css';
import { Link } from 'react-router-dom';

const Countries = () => {
	const [
		state,
		handleFilterChange,
		handleSearchParamsChange,
		isLoading,
		error,
	] = useCountries();

	return (
		<main className={styles.countries}>
			<SearchOptions
				handleFilterChange={handleFilterChange}
				handleSearchParamsChange={handleSearchParamsChange}
				state={state}
			/>
			{isLoading && <h2>Loading...</h2>}
			<article className={styles.countries_grid}>
				{state.countries.map((country: Country) => (
					<Link key={country.cca3} to={`country/${country.cca3}`}>
						<Card country={country} />
					</Link>
				))}
			</article>
		</main>
	);
};

export default Countries;
