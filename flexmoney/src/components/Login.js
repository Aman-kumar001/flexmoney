import styles from '../style/Login.module.css';
import img from '../imgs/yoga.jpg';
// import img2 from '../imgs/img2.svg';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const LogIn = ({ tel, setTel }) => {
	let navigate = useNavigate();

	const [newUser, setNewUser] = useState(false);
	const [name, setName] = useState('');
	const [age, setAge] = useState('');
	const [code, setCode] = useState('');
	const [error, setError] = useState('');

	const createUser = (e) => {
		e.preventDefault();
		const payLoad = {
			name: `${name}`,
			age: `${age}`,
			phone: `${tel}`,
			pwd: `${code}`,
			slot: 'none',
			fees: 'none',
		};
		if (18 <= age && age <= 65) {
			console.log(payLoad);

			axios.post('http://localhost:8000/api/user', payLoad).then((res) => {
				console.log(res.message);
				let path = `/yogaSlot`;
				navigate(path);
			});
		} else {
			let path = `/error`;
			navigate(path);
		}
	};

	const loginUser = (e) => {
		e.preventDefault();

		axios
			.get('http://localhost:8000/api/user/getUser', {
				params: {
					phone: `${tel}`,
				},
			})

			.then((res) => {
				// console.log(res.data, code, res.data[0].pwd);
				if (res.data[0].pwd == code) {
					let path = `/yogaSlot`;
					navigate(path);
				} else {
					alert('Wront Passcode or Phone number');
				}
			});
	};

	return (
		<div className={styles.cont}>
			{/* <div className={styles.styleElement}></div> */}
			<div className={styles.left}>
				<div style={{ margin: '1rem' }}>
					<div className={styles.switchButton}>
						<div
							onClick={() => {
								setNewUser(false);
							}}
							style={{
								backgroundColor: `${newUser ? 'white' : '#add08c'}`,
								color: `${newUser ? '#41403e60' : 'white'}`,
							}}
						>
							Log In
						</div>
						<div
							onClick={() => {
								setNewUser(true);
							}}
							style={{
								backgroundColor: `${!newUser ? 'white' : '#add08c'}`,
								color: `${!newUser ? '#41403e60' : 'white'}`,
							}}
						>
							New User
						</div>
					</div>
					{newUser && (
						<div className={styles.formNew}>
							<form action=''>
								<div>
									<label htmlFor='name'>Name</label>
									<input
										type='text'
										name='name'
										id='name'
										onChange={(e) => {
											setName(e.target.value);
										}}
									/>
								</div>

								<div>
									<label htmlFor='tel'>Phone No.</label>
									<input
										type='tel'
										name='name'
										id='name'
										onChange={(e) => {
											setTel(e.target.value);
										}}
									/>
								</div>

								<div>
									<label htmlFor='Age'>Age</label>
									<input
										type='number'
										name='age'
										id='age'
										onChange={(e) => {
											setAge(e.target.value);
										}}
									/>
								</div>

								<div>
									<label htmlFor='pwd'>Passcode {`(4 digit)`}</label>
									<input
										type='password'
										name='pwd'
										id='pwd'
										onChange={(e) => {
											setCode(e.target.value);
										}}
									/>
								</div>

								<button onClick={(e) => createUser(e)}>Submit</button>
							</form>
						</div>
					)}
					{!newUser && (
						<div className={styles.formOld}>
							<form action=''>
								<div>
									<label htmlFor='tel'>Phone No.</label>
									<input
										type='tel'
										name='name'
										id='name'
										onChange={(e) => {
											setTel(e.target.value);
										}}
									/>
								</div>

								<div>
									<label htmlFor='pwd'>Passcode {`(4 digit)`}</label>
									<input
										type='password'
										name='pwd'
										id='pwd'
										onChange={(e) => {
											setCode(e.target.value);
										}}
									/>
								</div>

								<button
									onClick={(e) => {
										loginUser(e);
									}}
								>
									Log In
								</button>
							</form>
						</div>
					)}
				</div>
			</div>
			<div className={styles.right}>
				<div style={{ flex: 1 }}>
					<img src={img} alt='' width='100%' />
				</div>
			</div>
		</div>
	);
};

export default LogIn;
