import React, { useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { hiddenNumberAnimations as animations } from '../../animations';
import { correctNumberStatus } from '../../constants';
import { correctNumberAnimating, correctNumberWaiting } from '../../store/slices/correct-numbers/actions';
import { createCorrectNumberStatusSelector, createIsNumberToCorrectSelector } from '../../store/slices/correct-numbers/selectors';

export const HiddenNumber = ({ value }) =>  {
	const selectStatus = useMemo(() => createCorrectNumberStatusSelector(value), [value]);
	const selectIsNumberToCorrect = useMemo(() => createIsNumberToCorrectSelector(value), [value]);
	const ref = useRef();
	const dispatch = useDispatch();
	const status = useSelector(selectStatus);
	const isNumberToCorrect = useSelector(selectIsNumberToCorrect);

	useEffect(() => {
		if (isNumberToCorrect) {
			dispatch(correctNumberAnimating(value));
		}
	}, [isNumberToCorrect, value, dispatch]);
 
	useLayoutEffect(() => {
		if (status === correctNumberStatus.received) {
			const tl = animations.show({
				el: ref.current,
				onComplete: () => dispatch(correctNumberWaiting(value))
			});
			return () => tl?.revert?.();
		}
	}, [status, value, dispatch]);

	useLayoutEffect(() => {
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