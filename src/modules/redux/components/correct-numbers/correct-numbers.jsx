import './correct-numbers.less';
import React from "react";
import { useSelector } from 'react-redux';
import { CorrectNumber } from "./correct-number/correct-number";
import { selectVisibleNumbers } from '../../store/slices/correct-numbers/selectors';

export const CorrectNumbers = () => {
	const numbers = useSelector(selectVisibleNumbers, (prev, curr) => prev.length === curr.length);

	return (
		<ul className="correct-numbers">
			{numbers.map((n) => <CorrectNumber key={n.value} value={n.value} />)}
		</ul>
	);
};
