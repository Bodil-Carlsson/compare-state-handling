import './correct-numbers.less';
import React from "react";
import { CorrectNumber } from "./correct-number/correct-number";
import { useSelector } from 'react-redux';
import { correctNumberStatus } from '../../constants';
import { useShowNextNumber } from '../../hooks/use-show-next-number'; 

export const CorrectNumbers = () => {
	const numbers = useSelector(
		(state) => state.correctNumbers.numbers.filter((n) => n.status > correctNumberStatus.hide),  
		(prev, curr) => prev.length === curr.length
	);

	return (
		<ul className="correct-numbers">
			{numbers.map((n) => <CorrectNumber key={n.value} value={n.value} status={n.status}/>)}
		</ul>
	);
};
