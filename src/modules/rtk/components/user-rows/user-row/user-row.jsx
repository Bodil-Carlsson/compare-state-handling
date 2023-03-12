import React, { useLayoutEffect, useMemo, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userRowAnimations as animations } from '../../../animations';
import { userRowsSortRow } from '../../../store/slices/user-rows/reducer';
import { createUserRowNumberValuesSelector, createPresortedUserRowNumbersSelector } from '../../../store/slices/user-rows/selectors';
import { UserNumber } from './user-number';
import { CorrectCount } from './correct-count';

export const UserRow = ({ rowId }) => {
const selectUserRowNumberValues = useMemo(() => createUserRowNumberValuesSelector(rowId), [rowId]);
const selectPresortedUserRowNumbers = useMemo(() => createPresortedUserRowNumbersSelector(rowId), [rowId]);
const ref = useRef();
const dispatch = useDispatch();
const numberValues = useSelector(selectUserRowNumberValues);
const presortedNumbers = useSelector(selectPresortedUserRowNumbers);
	
	useLayoutEffect(() => {
		if (presortedNumbers) {
			const tl = animations.sortRow({ 
				el: ref.current, 
				currOrder: numberValues,
				sortedOrder: presortedNumbers,
				onComplete: () => dispatch(userRowsSortRow(rowId)) 
			});
			return () => tl?.revert?.();
		}
	}, [dispatch, rowId, numberValues, presortedNumbers]);

	return (
		<li className='user-row'>
			<ul ref={ref} className='user-row-numbers'>
				{numberValues.map((value) => (
					<UserNumber key={value} rowId={rowId} value={value} />
				))}
			</ul>
			<CorrectCount rowId={rowId} />
		</li>
	);
};