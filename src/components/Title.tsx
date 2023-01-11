import Switch from './Switch';
import styles from './Title.module.css';

const Title = () => {
	return (
		<header className={styles.primary_header}>
			<h1 className={styles.title}>Where in the world?</h1>
			<Switch />
		</header>
	);
};

export default Title;
