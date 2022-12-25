import React, { useLayoutEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userRowsAnimations as animations } from '../../constants';
import { UserRow } from './user-row/user-row';
import { selectRowIds, selectIsSorting, selectSortedIds } from '../../store/slices/user-rows/selectors';
import { sortRowIds } from '../../store/slices/user-rows/utils';
import { userRowsSorted } from '../../store/slices/user-rows/actions';

export const UserRows = () => {
	const rowIds = useSelector(selectRowIds);
	const sortedIds = useSelector(selectSortedIds);
	const isSorting = useSelector(selectIsSorting);
	const dispatch = useDispatch();
	const ref = useRef();

	useLayoutEffect(() => {
		const tl = animations.showRows({ 
			el: ref.current, 
			onComplete: () => tl.revert() 
		});
	}, []);

	useLayoutEffect(() => {
		let tl;
		if (isSorting) {
			tl = animations.sortRows({
				el: ref.current,
				currOrder: rowIds,
				sortedOrder: sortedIds,
				onComplete: () => {
					dispatch(userRowsSorted());
				}
			});
		}
		return () => tl?.revert?.();
	}, [isSorting, rowIds, sortedIds, dispatch]);

	return (
		<ul ref={ref} className='user-rows'>
			{rowIds.map((id) => (
				<UserRow key={id} id={id} />
			))}
		</ul>
	);
};
