import './user-row.less';
import React, { useLayoutEffect, useRef } from 'react';
import { UserNumber } from './user-number/user-number';
import { CorrectCount } from './correct-count/correct-count';
import { useSelector } from 'react-redux';
import { userNumberStatus } from '../../../constants';
import { sortRow } from './animations';
import { useDispatch } from 'react-redux';
import { rowSorted } from '../../../store/slices/user-rows/actions';

export const UserRow = ({ id }) => {
	const numbers = useSelector((state) => state.userRows.rows.find((r) => r.id === id).numbers);
	const numbersRef = useRef(numbers);
	const isSorting = useSelector((state) => state.userRows.rows.find((r) => r.id === id).isSorting);
	const ref = useRef();
	const dispatch = useDispatch();
	useLayoutEffect(() => {
		if (isSorting) {
			sortRow({
				el: ref.current,
				prevOrder: numbersRef.current, 
				currOrder: numbers,
				onComplete: () => dispatch(rowSorted(id))
			});
		}
		numbersRef.current = numbers;
	}, [isSorting, numbers, id, dispatch]);
	return (
		<li className='user-row'>
			<ul ref={ref} className='user-row-numbers'>
				{numbers.map(({ value, status }) => (
					<UserNumber key={value} rowId={id} value={value} status={status}/>
				))}
			</ul>
			<CorrectCount correctCount={numbers.filter(({ status }) => status > userNumberStatus.correcting).length}/>
		</li>
	);
};