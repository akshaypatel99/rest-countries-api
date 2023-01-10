import { Country } from '../../utils';
import styles from './Card.module.css';

interface Props {
	country: Country;
	key: string;
}

const Card = (props: Props) => {
	const { country } = props;

	let population = new Intl.NumberFormat('en-GB').format(country.population);

	let capital;
	if (typeof country.capital === 'object') {
		capital = country.capital.map((city, index) => (
			<span key={index}>{city}</span>
		));
	} else {
		capital = <span>country.capital</span>;
	}

	return (
		<article className={styles.card}>
			<img
				src={country.flags.svg}
				alt={`Flag of ${country.name.common}`}
				className={styles.card_image}
			/>
			<div className={styles.card_content}>
				<h2 className={styles.card_title}>{country.name.common}</h2>
				<div className={styles.card_facts}>
					<p>
						Population: <span>{population}</span>
					</p>
					<p>
						Region: <span>{country.region}</span>
					</p>
					<p>Capital: {capital}</p>
				</div>
			</div>
		</article>
	);
};

export default Card;
