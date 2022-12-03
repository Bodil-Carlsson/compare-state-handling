import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UserRow } from './user-row/user-row';
import { showRows, sortRows } from './animations';
import { rowsSorted } from '../../store/slices/user-rows/actions';
import { fetchUserRows } from '../../store/thunks/fetch-user-rows';
import { startCorrection } from '../../store/slices/correct-numbers/actions';

export const UserRows = () => {
	const rowIds = useSelector((state) => state.userRows.rowIds);
	const isSorting = useSelector((state) => state.userRows.isSorting);
	const dispatch = useDispatch();
	const ref = useRef();

	useEffect(() => {
		(async () => {
			await dispatch(fetchUserRows());
			showRows({
				el: ref.current,
				onComplete: () => dispatch(startCorrection())
			});
		})();
	}, [dispatch]);

	useLayoutEffect(() => {
		if (isSorting) {
			sortRows({
				el: ref.current,
				onComplete: () => dispatch((rowsSorted()))
			})
		}
	}, [isSorting, dispatch]);

	return (
		<ul ref={ref} className='user-rows'>
			{rowIds.map((id) => (
				<UserRow key={id} id={id} />
			))}
	</ul>
	);
};
