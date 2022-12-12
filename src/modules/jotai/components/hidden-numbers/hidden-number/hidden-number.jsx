import './hidden-number.less';
import React, { useLayoutEffect, useRef, useMemo } from 'react';
import { useUpdateAtom } from 'jotai/utils';
import { correctNumberStatus } from '../../../constants';
import { show, hide } from './animations';
import { correctNumberWaitingAtom, selectCorrectNumberStatusAtom } from '../../../atoms/correct-numbers';
import { useAtom } from 'jotai';

export const HiddenNumber = ({ value }) =>  {
	const ref = useRef();
	const numberStatusAtom = useMemo(() => selectCorrectNumberStatusAtom(value), [value]);
	const [status] = useAtom(numberStatusAtom);
	const updateToWaiting = useUpdateAtom(correctNumberWaitingAtom);

	useLayoutEffect(() => {
		if (status === correctNumberStatus.received) {
			show({
				el: ref.current,
				onComplete: () => updateToWaiting(value)
			});
		}
		if (status === correctNumberStatus.animating) {
			hide({
				el: ref.current
			});
		}
	}, [status, value, updateToWaiting]);

	return (
		<li ref={ref} className='hidden-number'>
			{value}
		</li>
	);
};