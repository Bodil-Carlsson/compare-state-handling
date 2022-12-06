import './hidden-number.less';
import React, { useLayoutEffect, useRef, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { correctNumberStatus } from '../../../constants';
import { show, hide } from './animations';
import { correctNumberWaiting } from '../../../store/slices/correct-numbers/actions';
import { createSelectCorrectNumberStatus } from '../../../store/slices/correct-numbers/selectors'; 

export const HiddenNumber = ({ value }) =>  {
	const selectCorrectNumberStatus = useMemo(createSelectCorrectNumberStatus, []);
	const status = useSelector((state) => selectCorrectNumberStatus(state, value));
	const dispatch = useDispatch();
	const ref = useRef();

	useLayoutEffect(() => {
		if (status === correctNumberStatus.received) {
			show({
				el: ref.current,
				onComplete: () => dispatch(correctNumberWaiting(value))
			});
		}
		if (status === correctNumberStatus.animating) {
			hide({
				el: ref.current
			});
		}
	}, [status, value, dispatch]);

	return (
		<li ref={ref} className='hidden-number'></li>
	);
};