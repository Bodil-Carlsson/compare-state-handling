import './correct-count.less';
import React from "react";

export const CorrectCount = ({ correctCount }) => {
	return (
		<div className='correct-count'>
			{correctCount} <span className='correct-count-max'>/10</span>
		</div>
	);
};
