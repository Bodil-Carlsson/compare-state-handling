import React from 'react';
import { useSelector } from 'react-redux';
import { selectVisibleNumbers } from "../../store/slices/correct-numbers/selectors";
import { VisibleNumber } from "./visible-number";

export const VisibleNumbers = () => {
	const numbers = useSelector(selectVisibleNumbers);

	return (
		<ul className="correct-numbers">
			{numbers.map((n) => (
				<VisibleNumber key={n.value} value={n.value} />
			))}
		</ul>
	);
};
