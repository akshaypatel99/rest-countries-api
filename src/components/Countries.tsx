import { Country } from '../utils';
import { useCountries } from '../hooks/useCountries';
import SearchOptions from './home/SearchOptions';
import Card from './home/Card';
import styles from './Countries.module.css';

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
			{isLoading && <p>Loading...</p>}
			<article className={styles.countries_grid}>
				{state.countries.map((country: Country) => (
					<Card country={country} key={country.name.common} />
				))}
			</article>
		</main>
	);
};

export default Countries;
