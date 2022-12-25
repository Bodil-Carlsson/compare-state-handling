import React, { useRef, useLayoutEffect, useMemo } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { userNumberAnimations as animations, userNumberStatus } from '../../../constants';
import { userNumberCorrected } from '../../../store/slices/user-rows/actions';
import { createSelectUserNumberStatus } from '../../../store/slices/user-rows/selectors';

export const UserNumber = ({ rowId, value }) => {
	const selectStatus = useMemo(createSelectUserNumberStatus, []);
	const status = useSelector((state) => selectStatus(state, rowId, value));
	const dispatch = useDispatch();
	const ref = useRef();

	useLayoutEffect(() => {
		let tl;
		if (status === userNumberStatus.correcting) {
			tl = animations.correct({
				el: ref.current,
				onComplete: () => dispatch(userNumberCorrected(rowId, value))
			});
		}
		return () => tl?.revert?.();
	}, [status, value, rowId, dispatch]);

	return (
		<li ref={ref} className={`user-number${status >= userNumberStatus.corrected ? ' correct' : ''}`}>
			{value}
		</li>
	);
};
