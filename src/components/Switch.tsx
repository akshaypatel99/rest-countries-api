import { useTheme } from '../hooks/useTheme';

const Switch = () => {
	const [theme, handleChange] = useTheme('dark');

	return (
		<div className='switch-container'>
			<label className='switch'>
				<input
					type='checkbox'
					name='dark-mode'
					id='dark-mode-switch'
					onChange={handleChange}
					checked={theme === 'dark'}
				/>
				<div>Icon here</div>
				<span>Dark Mode</span>
			</label>
		</div>
	);
};

export default Switch;
