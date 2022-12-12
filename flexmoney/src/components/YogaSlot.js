import styles from '../style/yogaslot.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const YogaSlot = ({ tel, setTel }) => {
	const [feesPaid, setFeesPaid] = useState(false);
	const [slot, setSlot] = useState('');
	const [data, setData] = useState({});
	const slotsAvailable = ['6-7 AM', '7-8 AM', '8-9 AM', '5-6 PM'];
	useEffect(() => {
		console.log(tel);
		// setTel('7412589630');
		const current = new Date();
		axios
			.get('http://localhost:8000/api/user/getUser', {
				params: {
					phone: `${tel}`,
				},
			})
			.then((res) => {
				console.log(res.data, current.getMonth(), res.data[0].fees);
				setData(res.data[0]);
				if (current.getMonth() == res.data[0].fees) {
					setSlot(res.data[0].slot);
					setFeesPaid(true);
				} else {
					setFeesPaid(false);
				}
			});
	}, []);

	const CompletePayment = () => {
		const current = new Date();
		var payLoad = {
			name: data.name,
			age: data.age,
			phone: data.phone,
			pwd: data.pwd,
			slot: slot,
			fees: `${current.getMonth()}`,
		};

		axios
			.put(`http://localhost:8000/api/user/${data._id}`, payLoad)
			.then((res) => {
				console.log(res.data);
				setFeesPaid(true);
			});
		console.log('regestered');
	};

	return (
		<div className={styles.cont}>
			{feesPaid && (
				<div className={styles.unpaid}>
					<p>
						Congratulations {data.name} !! Welcome to the the world of peace and
						harmony. We GoFlex will help you to achieve peace and flexibality.
					</p>
					<p>Thank you for enrolling to your course.</p>
					<p>
						Please join at <b>{data.slot == 'none' ? slot : data.slot}</b>
					</p>
				</div>
			)}

			{!feesPaid && (
				<div className={styles.unpaid}>
					<p>
						Hey {data.name} !! It seems like you are not enrolled in any batch
						yet. Please go through all the batches and choose the one that suits
						you the most
					</p>
					<p>Choose from the following batches.</p>
					<p style={{ fontWeight: 'bold' }}>Fees : 500 INR Only</p>
					<div className={styles.slots}>
						<form action=''>
							{slotsAvailable.map((data, index) => {
								return (
									<div key={index}>
										<input
											type='radio'
											name='slot'
											id={`slot${index}`}
											onChange={() => {
												console.log(data);
												setSlot(data);
											}}
										/>
										<label htmlFor={`slot${index}`}>{data}</label>
									</div>
								);
							})}
						</form>
					</div>

					<button onClick={() => CompletePayment()}>ENROLL</button>
				</div>
			)}
		</div>
	);
};

export default YogaSlot;
