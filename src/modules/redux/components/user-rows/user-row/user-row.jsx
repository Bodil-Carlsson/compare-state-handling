import React, { useLayoutEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userRowAnimations as animations } from '../../../constants';
import { sortNumbers } from '../../../store/slices/user-rows/utils';
import { userRowSorted } from '../../../store/slices/user-rows/actions';
import { UserNumber } from './user-number';
import { CorrectCount } from './correct-count';
import { selectUserRowNumbers, selectUserRowIsSorting } from '../../../store/slices/user-rows/selectors';

export const UserRow = ({ id }) => {
	const numbers = useSelector((state) => selectUserRowNumbers(state, id));
	const isSorting = useSelector((state) => selectUserRowIsSorting(state, id));
	const dispatch = useDispatch();
	const ref = useRef();

	useLayoutEffect(() => {
		let tl;
		if (isSorting) {
			tl = animations.sortRow({
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