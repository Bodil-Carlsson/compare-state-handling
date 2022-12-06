import './numbers-page.less';
import React, { useState, useEffect } from "react";
import socketclient from "socket.io-client";
import { useAtom } from 'jotai';
import { CorrectNumbers } from "../components/correct-numbers/correct-numbers";
import { HiddenNumbers } from "../components/hidden-numbers/hidden-numbers";
import { UserRows } from "../components/user-rows/user-rows";
import { FetchUserRowsBtn } from '../components/fetch-user-rows-btn/fetch-user-rows-btn';
import { correctNumberStatus } from "../constants";
import { rowsAtom } from '../atoms/atoms';
import { StartCorrectionBtn } from '../components/start-correction-btn/start-correction-btn';

const showLastNumber = (numbers) => {
	if (numbers.length) {
		const last = numbers.pop();
		numbers.push({ ...last, status: correctNumberStatus.show });
	}
	return numbers;
};

export const NumbersPage = () => {
	const [rows] = useAtom(rowsAtom);
	// const [rows, setRows] = useState([]);
	const [numbers, setNumbers] = useState([]);
	const [correctNumber, setCorrectNumber] = useState();
	const rowsFetched = Boolean(rows.length);

	return (
		<div className="numbers-page">
			<div className="correct-numbers-wrapper">
				<CorrectNumbers numbers={numbers.filter(({ status }) => status === correctNumberStatus.show)}/>
			</div>
			{rowsFetched && <StartCorrectionBtn />}
			{rowsFetched && <div className="user-rows-wrapper">
				<UserRows />
			</div>}
			{!rowsFetched && <FetchUserRowsBtn />}
			<div className="hidden-numbers-wrapper">
				<HiddenNumbers numbers={numbers.filter(({ status }) => status === correctNumberStatus.hide)}/>
			</div>
		</div>
	);
}