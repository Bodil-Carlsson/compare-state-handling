import './correct-numbers.less';
import React from "react";
import { useAtom } from 'jotai';
import { CorrectNumber } from "./correct-number/correct-number";
import { correctNumbersAtom } from '../../atoms/correct-numbers';

export const CorrectNumbers = () => {
	const [numbers] = useAtom(correctNumbersAtom);

	return (
		<ul className="correct-numbers">
			{numbers.map((n) => <CorrectNumber key={n} value={n} />)}
		</ul>
	);
};
