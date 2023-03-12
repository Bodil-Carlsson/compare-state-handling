import React, { useLayoutEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { correctionStatus as constants } from "../../constants";
import { hiddenNumbersAnimations as animations } from '../../animations';
import { selectCorrectionStatus, selectHiddenNumbers } from '../../store/slices/correct-numbers/selectors';
import { HiddenNumber } from './hidden-number';

export const HiddenNumbers = () =>  {
	const ref = useRef();
	const tlRef = useRef();
	const numbers = useSelector(selectHiddenNumbers);
	const correctionStatus = useSelector(selectCorrectionStatus);

	useLayoutEffect(() => {
		tlRef.current = animations.fill({ el: ref.current });
	}, []);

	useLayoutEffect(() => {
		if (correctionStatus === constants.completed) {
			tlRef.current?.reverse?.();
		}
	}, [correctionStatus]);

	return (
		<ul ref={ref} className='hidden-numbers'>
			{numbers.map((n) => (
				<HiddenNumber key={n.value} value={n.value}/>
			))}
		</ul>
	);
};