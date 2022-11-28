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
	const [numbers, setNumbers] = useState([]);
	useEffect(() => {
		const socket = socketclient.io();
		socket.on('numbers:done', () => {
			socket.disconnect();
			setNumbers((numbers) => showLastNumber([...numbers]));
		});
		socket.on('numbers:number', (msg) => {
			setNumbers((numbers) => [...showLastNumber([...numbers]), { value: msg.number, status: correctNumberStatus.hide }]);
		});
		return () => socket.disconnect();
	}, []);
	return (
		<div className="content-width">
			<CorrectNumbers numbers={numbers.filter(({ status }) => status === correctNumberStatus.show)}/>
			<div className="flex space-between">
				<UserRows />
				<HiddenNumbers numbers={numbers.filter(({ status }) => status === correctNumberStatus.hide)}/>
			</div>
		</div>
	);
}