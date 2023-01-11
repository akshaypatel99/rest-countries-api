import { Link, LoaderFunctionArgs, Params, useParams } from 'react-router-dom';
import {
	Country,
	formatBorderNames,
	formatCurrencies,
	formatLanguages,
	formatPopulation,
	getCountry,
} from '../../utils';
import { QueryClient, useQuery } from '@tanstack/react-query';
import styles from './DetailPage.module.css';
import { IoArrowBackSharp } from 'react-icons/io5';

const countryDetailQuery = (id: string) => ({
	queryKey: ['country', id],
	queryFn: async () => getCountry(id),
});

export const loader =
	(queryClient: QueryClient) =>
	async ({ params }: LoaderFunctionArgs) => {
		const query = countryDetailQuery(params.countryId ?? '');
		return await queryClient.ensureQueryData(query);
	};

const DetailPage = () => {
	const params = useParams();
	const { data, isLoading, error } = useQuery(
		countryDetailQuery(params.countryId ?? '')
	);

	let output;
	if (isLoading) output = <h2>Loading...</h2>;
	if (data) {
		const country: Country = data[0];

		let capital;
		if (country.capital !== undefined) {
			capital = country.capital.map((city, index) => (
				<span key={index} className={styles.list}>
					{city}
				</span>
			));
		} else {
			capital = <span>N/A</span>;
		}

		let borderLinks;
		if (country.borders !== undefined) {
			const borders = formatBorderNames(country.borders);
			borderLinks = borders.map((border) => (
				<span key={border[0]}>
					<Link to={`/country/${border[0]}`} className={styles.link}>
						{border[1]}
					</Link>
				</span>
			));
		} else {
			borderLinks = <span>N/A</span>;
		}

		output = (
			<article className={styles.article}>
				<img
					src={country.flags.svg}
					alt={`Flag of ${country.name.common}`}
					className={styles.image}
				/>
				<section className={styles.section}>
					<h2 className={styles.title}>{country.name.common}</h2>
					<div className={styles.info1}>
						<p>
							Native Name: <span>{country.name.official}</span>
						</p>
						<p>
							Population: <span>{formatPopulation(country.population)}</span>
						</p>
						<p>
							Region: <span>{country.region}</span>
						</p>
						<p>
							Sub Region: <span>{country.subregion ?? 'N/A'}</span>
						</p>
						<p>Capital: {capital}</p>
					</div>
					<div className={styles.info2}>
						<p>
							Top Level Domain: <span>{country.tld?.[0] ?? 'N/A'}</span>
						</p>
						<p>
							Currencies:{' '}
							<span>
								{country.currencies
									? formatCurrencies(country.currencies)
									: 'N/A'}
							</span>
						</p>
						<p>
							Languages:{' '}
							{country.languages
								? formatLanguages(country.languages).map((lang, index) => (
										<span key={index} className={styles.list}>
											{lang}
										</span>
								  ))
								: 'N/A'}
						</p>
					</div>
					<div className={styles.borders}>
						<p>Border Countries: {borderLinks}</p>
					</div>
				</section>
			</article>
		);
	}
	return (
		<main className={styles.container}>
			<nav className={styles.nav}>
				<Link to='/' className={styles.back_button}>
					<IoArrowBackSharp /> Back
				</Link>
			</nav>
			{output}
		</main>
	);
};

export default DetailPage;
