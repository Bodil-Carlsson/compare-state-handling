import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userRowsAnimations as animations } from '../../animations';
import { correctionReadyToStart, correctNumberCorrected } from '../../store/slices/correct-numbers/reducer';
import { userRowsSortRows } from '../../store/slices/user-rows/reducer';
import { selectIsCorrectionOfNumberComplete, selectUserRowIds, selectPresortedUserRowIds } from '../../store/slices/user-rows/selectors';
import { UserRow } from './user-row/user-row';

export const UserRows = () => {
const sortedRows = useSelector(selectPresortedUserRowIds);
const isCorrectionOfNumberComplete = useSelector(selectIsCorrectionOfNumberComplete);

const dispatch = useDispatch();
const ref = useRef();
const rowIds = useSelector(selectUserRowIds);

	useLayoutEffect(() => {
		const tl = animations.showRows({
			el: ref.current,
			onComplete: () => dispatch(correctionReadyToStart())
		});
		return () => tl?.revert?.();
	}, [dispatch]);


	useLayoutEffect(() => {
		if (sortedRows) {
			const tl = animations.sortRows({
				el: ref.current,
				currOrder: rowIds,
				sortedOrder: sortedRows,
				onComplete: () => dispatch(userRowsSortRows())
			});
			return () => tl?.revert?.();
		}
	}, [dispatch, rowIds, sortedRows]);

	useEffect(() => {
		if (isCorrectionOfNumberComplete) {
			dispatch(correctNumberCorrected());
		}
	}, [isCorrectionOfNumberComplete, dispatch]);

	return (
		<ul ref={ref} className='user-rows'>
			{rowIds.map((id) => (
				<UserRow key={id} rowId={id} />
			))}
		</ul>
	);
};
