import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import LogIn from './components/Login';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Error from './components/Error';
import { useState } from 'react';
import YogaSlot from './components/YogaSlot';
function App() {
	const [tel, setTel] = useState('');
	return (
		<div className='App'>
			<div style={{ width: '80%', margin: 'auto' }}>
				<Router>
					{/* <Layout> */}
					<Routes>
						<Route
							exact
							path='/'
							element={<LogIn tel={tel} setTel={setTel} />}
						/>
						<Route
							exact
							path='/yogaSlot'
							element={<YogaSlot tel={tel} setTel={setTel} />}
						/>
						<Route path='*' element={<Error tel={tel} setTel={setTel} />} />
					</Routes>
					{/* </Layout> */}
				</Router>
			</div>
		</div>
	);
}

export default App;
