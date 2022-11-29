import './correct-numbers.less';
import React from "react";
import { CorrectNumber } from "./correct-number/correct-number";

export const CorrectNumbers = ({ numbers }) => {
	return (
		<ul className="correct-numbers">
			{numbers.map(({ value }) => <CorrectNumber key={value} value={value}/>)}
		</ul>
	);
};
