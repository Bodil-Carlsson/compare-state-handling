import './numbers-page.less';
import React, { useState, useEffect } from "react";
import socketclient from "socket.io-client";
import { CorrectNumbers } from "../components/correct-numbers/correct-numbers";
import { HiddenNumbers } from "../components/hidden-numbers/hidden-numbers";
import { UserRows } from "../components/user-rows/user-rows";
import { correctNumberStatus } from "../constants";

const showLastNumber = (numbers) => {
	if (numbers.length) {
		const last = numbers.pop();
		numbers.push({ ...last, status: correctNumberStatus.show });
	}
	return numbers;
};

export const NumbersPage = () => {
	const [rowsFetched, setRowsFetched] = useState(false);
	const [rows, setRows] = useState([]);
	const [numbers, setNumbers] = useState([]);
	const [correctNumber, setCorrectNumber] = useState();

	useEffect(() => {
		(async () => {
			const res = await fetch('http://localhost:3000/api/user/rows', { method: 'GET' });
			const { rows } = await res.json();
			setRows(rows);
			setRowsFetched(true);
		})();
	}, []);

	useEffect(() => {
		if (rowsFetched) {
			const socket = socketclient.io();
			socket.on('numbers:done', () => {
				socket.disconnect();
				setNumbers((numbers) => showLastNumber([...numbers]));
			});
			socket.on('numbers:number', ({ number }) => {
				setNumbers((numbers) => [...showLastNumber([...numbers]), { value: number, status: correctNumberStatus.hide }]);

			});
			return () => socket.disconnect();
		}
	}, [rowsFetched]);

	useEffect(() => {
		const lastShown = [...numbers].reverse().find(({ status }) => status === correctNumberStatus.show);
		if (lastShown) {
			setCorrectNumber(lastShown.value);
		}
	}, [numbers]);

	useEffect(() => {
		if (correctNumber) {
			setRows((rows) => rows.map((row) => ({
				...row,
				numbers: row.numbers
					.map((num) => ({ value: num.value, isCorrect: num.isCorrect || num.value === correctNumber }))
					.sort((a, b) => b.isCorrect - a.isCorrect)
			})));
		}
	}, [correctNumber])

	return (
		<div className="numbers-page">
			<div className="correct-numbers-wrapper">
				<CorrectNumbers numbers={numbers.filter(({ status }) => status === correctNumberStatus.show)}/>
			</div>
			<div className="user-rows-wrapper">
				<UserRows rows={rows}/>
			</div>
			<div className="hidden-numbers-wrapper">
				<HiddenNumbers numbers={numbers.filter(({ status }) => status === correctNumberStatus.hide)}/>
			</div>
		</div>
	);
}