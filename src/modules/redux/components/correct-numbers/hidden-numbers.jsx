import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { hiddenNumbersAnimations as animations } from '../../constants';
import { HiddenNumber } from './hidden-number';
import { selectHiddenNumbers, selectCorrectionStarted } from '../../store/slices/correct-numbers/selectors';

export const HiddenNumbers = () =>  {
	const numbers = useSelector(selectHiddenNumbers, (prev, curr) => prev.length === curr.length);
	const correctionStarted = useSelector(selectCorrectionStarted);
	const ref = useRef();

	useEffect(() => {
		if (correctionStarted) {
			animations.fill({ el: ref.current });
		}
	}, [correctionStarted])

	return (
		<ul ref={ref} className='hidden-numbers'>
			{numbers.map((n) => <HiddenNumber key={n.value} value={n.value}/>)}
		</ul>
	);
};