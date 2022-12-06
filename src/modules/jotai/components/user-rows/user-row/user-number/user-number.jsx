import './user-number.less';
import React from "react";

export const UserNumber = ({ value, isCorrect }) => {
	return (
		<li className={`user-number${isCorrect ? ' correct' : ''}`}>
			{value}
		</li>
	);
};
