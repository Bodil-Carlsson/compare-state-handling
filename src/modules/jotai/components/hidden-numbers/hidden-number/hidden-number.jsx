import './hidden-number.less';
import React, { useLayoutEffect, useRef } from 'react';
import { useUpdateAtom } from 'jotai/utils';
import { correctNumberStatus } from '../../../constants';
import { show, hide } from './animations';
import { correctNumberWaitingAtom } from '../../../atoms/correct-numbers';
import { useEffect } from 'react';

export const HiddenNumber = ({ value, status }) =>  {
	const ref = useRef();
	const updateToWaiting = useUpdateAtom(correctNumberWaitingAtom);

	useEffect(() => (console.log('value', value)), [value]);
	useEffect(() => (console.log('status', status)), [status]);
	useEffect(() => (console.log('updateToWaiting', updateToWaiting)), [updateToWaiting]);

	useLayoutEffect(() => {
		if (status === correctNumberStatus.received) {
			console.log('hidden number', value);
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