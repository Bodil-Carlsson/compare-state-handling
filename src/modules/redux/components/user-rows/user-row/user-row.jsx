import './user-row.less';
import React, { useLayoutEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userNumberStatus } from '../../../constants';
import { sortRow } from './animations';
import { sortNumbers } from '../../../store/slices/user-rows/utils';
import { userRowSorted } from '../../../store/slices/user-rows/actions';
import { UserNumber } from './user-number/user-number';
import { CorrectCount } from './correct-count/correct-count';
import { selectUserRowNumbers, selectUserRowIsSorting } from '../../../store/slices/user-rows/selectors';

export const UserRow = ({ id }) => {
	const numbers = useSelector((state) => selectUserRowNumbers(state, id));
	const isSorting = useSelector((state) => selectUserRowIsSorting(state, id));
	const dispatch = useDispatch();
	const ref = useRef();

	useLayoutEffect(() => {
		let tl;
		if (isSorting) {
			tl = sortRow({
				el: ref.current,
				currOrder: numbers,
				sortedOrder: sortNumbers(numbers),
				onComplete: () => dispatch(userRowSorted(id))
			});
		}
		return () => tl?.revert?.();
	}, [isSorting, numbers, id, dispatch]);

	return (
		<li className='user-row'>
			<ul ref={ref} className='user-row-numbers'>
				{numbers.map(({ value }) => (
					<UserNumber key={value} rowId={id} value={value}/>
				))}
			</ul>
			<CorrectCount rowId={id} />
		</li>
	);
};