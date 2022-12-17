import './user-number.less';
import React, { useMemo } from "react";
import { useAtom } from 'jotai';
import { useUpdateAtom } from 'jotai/utils';
import { selectUserNumberStatusAtom, updateUserNumberStatusAtom } from '../../../../atoms/user-rows';
import { userNumberStatus } from '../../../../constants';
import { useLayoutEffect, useRef } from 'react';
import { correct } from './animations';

export const UserNumber = ({ rowId, value }) => {
	const numberStatusAtom = useMemo(() => selectUserNumberStatusAtom(rowId, value), [rowId, value]);
	const [status] = useAtom(numberStatusAtom);
	const updateStatus = useUpdateAtom(updateUserNumberStatusAtom);
	const ref = useRef();

	useLayoutEffect(() => {
		let tl;
		if (status === userNumberStatus.correcting) {
			tl = correct({
				el: ref.current,
				onComplete: () => updateStatus({ rowId, value, status: userNumberStatus.corrected })
			});
		}
		return () => tl?.revert?.();
	}, [updateStatus, value, rowId, status]);

	return (
		<li ref={ref} className={`user-number${status === userNumberStatus.corrected ? ' correct' : ''}`}>
			{value}
		</li>
	);
};
