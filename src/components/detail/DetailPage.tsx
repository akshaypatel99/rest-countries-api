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
		console.log(country);

		const nameObj = country.name.nativeName;

		let capital;
		if (country.capital !== undefined) {
			capital = country.capital.map((city, index) => (
				<span key={index}>{city}</span>
			));
		} else {
			capital = <span>N/A</span>;
		}

		let borderLinks;
		if (country.borders !== undefined) {
			const borders = formatBorderNames(country.borders);
			console.log(borders);
			borderLinks = borders.map((border) => (
				<span key={border[0]}>
					<Link to={`/country/${border[0]}`}>{border[1]}</Link>
				</span>
			));
		} else {
			borderLinks = <span>N/A</span>;
		}

		output = (
			<article>
				<img
					src={country.flags.svg}
					alt={`Flag of ${country.name.common}`}
					// className={styles.card_image}
				/>
				<section>
					<div>
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
					<div>
						<p>
							Top Level Domain: <span>{country.tld[0] ?? 'N/A'}</span>
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
										<span key={index}>{lang}</span>
								  ))
								: 'N/A'}
						</p>
					</div>
					<div>
						<p>Border Countries: {borderLinks}</p>
					</div>
				</section>
			</article>
		);
	}
	return (
		<main>
			<nav>
				<Link to='/'>Back button</Link>
			</nav>
			{output}
		</main>
	);
};

export default DetailPage;
