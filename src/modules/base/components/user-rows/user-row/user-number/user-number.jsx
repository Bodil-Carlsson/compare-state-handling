import './user-number.less';
import React from "react";

export const UserNumber = ({ value, isCorrect }) => {
	return (
		<li className={`number user-number${isCorrect ? ' correct' : ''}`}>
			<div>{value}</div>
		</li>
	);
};
