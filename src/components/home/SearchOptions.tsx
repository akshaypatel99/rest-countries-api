import { IoSearchSharp } from 'react-icons/io5';
import { StateType } from '../../hooks/useCountries';
import styles from './SearchOptions.module.css';

type SearchOptionProps = {
	state: StateType;
	handleFilterChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	handleSearchParamsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchOptions = ({
	state,
	handleFilterChange,
	handleSearchParamsChange,
}: SearchOptionProps) => {
	return (
		<section className={styles.search_section}>
			<label className={styles.search}>
				<span className='sr-only'>Search for a country</span>
				<input
					type='text'
					name='country'
					placeholder='Search for a country...'
					value={state.searchParams}
					onChange={handleSearchParamsChange}
				/>
				<IoSearchSharp />
			</label>
			<label className={styles.filter}>
				<span className='sr-only'>Filter by Region</span>
				<select value={state.filter} onChange={handleFilterChange}>
					<option value={undefined}>All</option>
					{state.regions.map((item, index) => (
						<option key={index} value={item}>
							{item}
						</option>
					))}
				</select>
			</label>
		</section>
	);
};

export default SearchOptions;
