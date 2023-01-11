import { Outlet } from 'react-router-dom';
import './App.css';
import Title from './components/Title';

function App() {
	return (
		<div className='App'>
			<Title />
			<Outlet />
		</div>
	);
}

export default App;
