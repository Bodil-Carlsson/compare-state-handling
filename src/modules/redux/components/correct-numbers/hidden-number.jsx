import React, { useLayoutEffect, useRef, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { hiddenNumberAnimations as animations, correctNumberStatus } from '../../constants';
import { correctNumberWaiting } from '../../store/slices/correct-numbers/actions';
import { createSelectCorrectNumberStatus } from '../../store/slices/correct-numbers/selectors'; 

export const HiddenNumber = ({ value }) =>  {
	const selectCorrectNumberStatus = useMemo(createSelectCorrectNumberStatus, []);
	const status = useSelector((state) => selectCorrectNumberStatus(state, value));
	const dispatch = useDispatch();
	const ref = useRef();

	useLayoutEffect(() => {
		if (status === correctNumberStatus.received) {
			animations.show({
				el: ref.current,
				onComplete: () => dispatch(correctNumberWaiting(value))
			});
		}
		if (status === correctNumberStatus.animating) {
			animations.hide({
				el: ref.current
			});
		}
	}, [status, value, dispatch]);

	return (
		<li ref={ref} className='hidden-number'></li>
	);
};