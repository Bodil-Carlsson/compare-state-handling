import React, { useLayoutEffect, useMemo, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userNumberAnimations as animations } from "../../../animations";
import { userRowsCorrectNumber } from "../../../store/slices/user-rows/actions";
import { createIsUserNumberCorrectSelector, createIsUserNumberCorrectingSelector } from "../../../store/slices/user-rows/selectors";

export const UserNumber = ({ rowId, value }) => {
const selectIsUserNumberCorrecting = useMemo(() => createIsUserNumberCorrectingSelector(rowId, value), [rowId, value]);
const selectIsUserNumberCorrect = useMemo(() => createIsUserNumberCorrectSelector(rowId, value), [rowId, value]);
const ref = useRef();
const dispatch = useDispatch();
const isCorrecting = useSelector(selectIsUserNumberCorrecting);
const isCorrect = useSelector(selectIsUserNumberCorrect);

	useLayoutEffect(() => {
		if (isCorrecting) {
			const tl = animations.correct({ 
				el: ref.current, 
				onComplete: () => dispatch(userRowsCorrectNumber(rowId, value)) 
			});
			return () => tl?.revert?.();
		}
	}, [isCorrecting, rowId, value, dispatch]);

	return (
		<li ref={ref} className={`user-number${isCorrect ? ' correct' : ''}`}>
			{value}
		</li>
	);
};
