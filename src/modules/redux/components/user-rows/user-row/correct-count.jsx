import React, { useMemo } from "react";
import { useSelector } from 'react-redux';
import { createSelectUserRowCorrectCount } from '../../../store/slices/user-rows/selectors';

export const CorrectCount = ({ rowId }) => {
	const selectCorrectCount = useMemo(createSelectUserRowCorrectCount, []);
	const correctCount = useSelector((state) => selectCorrectCount(state, rowId));
	return (
		<div className='correct-count'>
			{correctCount} <span className='correct-count-max'>/10</span>
		</div>
	);
};
