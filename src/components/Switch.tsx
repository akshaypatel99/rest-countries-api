import { useTheme } from '../hooks/useTheme';
import { IoMoonOutline, IoSunnyOutline } from 'react-icons/io5';
import styles from './Switch.module.css';

const Switch = () => {
	const [theme, handleChange] = useTheme('dark');

	return (
		<div className='switch-container'>
			<label className={styles.switch}>
				<input
					type='checkbox'
					name='dark-mode'
					id='dark-mode-switch'
					onChange={handleChange}
					checked={theme === 'dark'}
				/>
				{theme === 'light' ? <IoMoonOutline /> : <IoSunnyOutline />}
				<span className={styles.switch_span}>
					{theme === 'light' ? 'Dark Mode' : 'Light Mode'}
				</span>
			</label>
		</div>
	);
};

export default Switch;
