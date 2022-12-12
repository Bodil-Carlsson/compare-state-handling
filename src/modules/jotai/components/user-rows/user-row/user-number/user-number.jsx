import './user-number.less';
import React, { useMemo } from "react";
import { useAtom, useAtomValue } from 'jotai';
import { useUpdateAtom } from 'jotai/utils';
import { selectUserNumberStatusAtom, updateUserNumberStatusAtom } from '../../../../atoms/user-rows';
import { userNumberStatus } from '../../../../constants';
import { useLayoutEffect, useRef } from 'react';
import { correct } from './animations';
import { correctingNumberAtom } from '../../../../atoms/correct-numbers';

export const UserNumber = ({ rowId, value }) => {
	const numberStatusAtom = useMemo(() => selectUserNumberStatusAtom(rowId, value), [rowId, value]);
	const [status] = useAtom(numberStatusAtom);
	const correctingNumber = useAtomValue(correctingNumberAtom);
	const updateStatus = useUpdateAtom(updateUserNumberStatusAtom);
	const ref = useRef();

	useLayoutEffect(() => {
		let tl;
		if (value && correctingNumber && value === correctingNumber.value) {
			tl = correct({
				el: ref.current,
				onComplete: () => updateStatus({ rowId, value, status: userNumberStatus.corrected })
			});
		}
		return () => tl?.revert?.();
	}, [correctingNumber, updateStatus, value, rowId]);

	return (
		<li ref={ref} className={`user-number${status === userNumberStatus.corrected ? ' correct' : ''}`}>
			{value}
		</li>
	);
};
