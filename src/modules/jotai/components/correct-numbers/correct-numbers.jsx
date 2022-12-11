import './correct-numbers.less';
import React from "react";
import { useAtom } from 'jotai';
import { CorrectNumber } from "./correct-number/correct-number";
import { correctedNumbersAtom } from '../../atoms/correct-numbers';

export const CorrectNumbers = () => {
	const [numbers] = useAtom(correctedNumbersAtom);

	return (
		<ul className="correct-numbers">
			{numbers.map((n) => <CorrectNumber key={n.value} value={n.value} status={n.status} />)}
		</ul>
	);
};
