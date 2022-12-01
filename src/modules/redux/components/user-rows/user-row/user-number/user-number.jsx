import './user-number.less';
import React, { useRef, useLayoutEffect } from "react";
import { useDispatch } from 'react-redux';
import { userNumberStatus } from '../../../../constants';
import { correct } from './animations';
import { sortRow } from '../../../../store/slices/user-rows/actions';

export const UserNumber = ({ rowId, value, status }) => {
	const dispatch = useDispatch();
	const ref = useRef();
	useLayoutEffect(() => {
		if (status === userNumberStatus.correcting) {
			correct({
				el: ref.current,
				onComplete: () => dispatch(sortRow(rowId))
			});
		}
	}, [status, rowId, dispatch]);
	return (
		<li ref={ref} className={`user-number${status >= userNumberStatus.sorting ? ' correct' : ''}`}>
			{value}
		</li>
	);
};
