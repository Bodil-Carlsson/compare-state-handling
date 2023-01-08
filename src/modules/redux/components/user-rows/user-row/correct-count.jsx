import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { createCorrectCountSelector } from '../../../store/slices/user-rows/selectors';  

export const CorrectCount = ({ rowId }) => {
	const selectCorrectCount = useMemo(() => createCorrectCountSelector(rowId), [rowId]);
	const correctCount = useSelector(selectCorrectCount);
	return (
		<div className='correct-count'>
			{correctCount} <span className='correct-count-max'>/10</span>
		</div>
	);
};
