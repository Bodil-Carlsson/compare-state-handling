import React, { useLayoutEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UserRow } from './user-row/user-row';
import { sortRows } from './animations';
import { rowsSorted } from '../../store/slices/user-rows/actions';

export const UserRows = () => {
	const rowIds = useSelector((state) => state.userRows.rowIds);
	const isSorting = useSelector((state) => state.userRows.isSorting);
	const dispatch = useDispatch();
	const ref = useRef();
	useLayoutEffect(() => {
		if (isSorting) {
			sortRows({
				el: ref.current,
				onComplete: () => dispatch((rowsSorted()))
			})
		}
	}, [isSorting, dispatch])
	return (
		<ul ref={ref} className='user-rows'>
			{rowIds.map((id) => (
				<UserRow key={id} id={id} />
			))}
	</ul>
	);
};
