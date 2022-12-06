import "./correct-number.less";
import React from "react";
import { useAtom } from 'jotai';

export const CorrectNumber = ({ correctNumberAtom }) => {
	// const [{ value, status }] = useAtom(correctNumberAtom);
	const value = 1;
	console.log(correctNumberAtom);
	console.log(value, status);
	return (
		<li className="correct-number">
			{value}
		</li>
	);
};
