import './correct-numbers.less';
import React from "react";
import { useAtom } from 'jotai';
import { CorrectNumber } from "./correct-number/correct-number";
import { correctNumbersAtom } from '../../atoms/atoms';

export const CorrectNumbers = () => {
	const [numbers] = useAtom(correctNumbersAtom);
	console.log(correctNumbersAtom);
	console.log(numbers);
	return (
		<ul className="correct-numbers">
			{numbers.map((correctNumberAtom) => <CorrectNumber key={correctNumberAtom} correctNumberAtom={correctNumberAtom}/>)}
		</ul>
	);
};
