import './hidden-number.less';
import React, { useLayoutEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { correctNumberStatus } from '../../../constants';
import { hideCorrectNumber } from '../../../store/slices/correct-numbers/actions';
import { show, hide } from './animations';
import { useDispatch } from 'react-redux';

export const HiddenNumber = ({ value }) =>  {
	const status = useSelector((state) => state.correctNumbers.numbers.find((n) => n.value === value).status);
	const ref = useRef();
	const dispatch = useDispatch();
	useLayoutEffect(() => {
		if (status === correctNumberStatus.none) {
			show({
				el: ref.current,
				onComplete: () => dispatch(hideCorrectNumber(value))
			});
		}
		if (status === correctNumberStatus.correcting) {
			hide({
				el: ref.current
			});
		}
	}, [status, value, dispatch]);
	return (
		<li ref={ref} className='hidden-number'>
			
		</li>
	);
};