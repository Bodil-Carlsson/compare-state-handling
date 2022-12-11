import './user-number.less';
import React from "react";
import { useAtom } from 'jotai';
import { useUpdateAtom } from 'jotai/utils';
import { correctingNumberAtom } from '../../../../atoms/correct-numbers';
import { updateUserNumberStatusAtom } from '../../../../atoms/user-rows';
import { userNumberStatus } from '../../../../constants';
import { useLayoutEffect, useRef } from 'react';
import { correct } from './animations';

export const UserNumber = ({ rowId, value, status }) => {
	const [correctingNumber] = useAtom(correctingNumberAtom);
	const updateUserNumberStatus = useUpdateAtom(updateUserNumberStatusAtom);
	const ref = useRef();

	useLayoutEffect(() => {
		let tl;
		if (value && value === correctingNumber) {
			tl = correct({
				el: ref.current,
				onComplete: () => updateUserNumberStatus({ rowId, value, status: userNumberStatus.corrected })
			});
		}
		return () => tl?.revert?.();
	}, [correctingNumber, updateUserNumberStatus, value, rowId]);

	return (
		<li ref={ref} className={`user-number${status === userNumberStatus.corrected ? ' correct' : ''}`}>
			{value}
		</li>
	);
};
