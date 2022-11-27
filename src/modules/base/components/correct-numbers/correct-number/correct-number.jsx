import "./correct-number.less";
import React from "react";

export const CorrectNumber = ({ value }) => {
	return (
		<li className="number correct-number">
			{value}
		</li>
	);
};
