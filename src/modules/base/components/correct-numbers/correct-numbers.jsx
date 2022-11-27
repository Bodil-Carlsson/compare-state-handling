import React from "react";
import { CorrectNumber } from "./correct-number/correct-number";

export const CorrectNumbers = ({ numbers }) => {
	return (
		<ul>
			{numbers.map(({ value }) => <CorrectNumber key={value} value={value}/>)}
		</ul>
	);
};
