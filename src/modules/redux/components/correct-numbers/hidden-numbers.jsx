import React, { useLayoutEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { hiddenNumbersAnimations as animations } from '../../animations';
import { selectHiddenNumbers } from '../../store/slices/correct-numbers/selectors';
import { HiddenNumber } from './hidden-number';

export const HiddenNumbers = () =>  {
	const ref = useRef();
	const numbers = useSelector(selectHiddenNumbers);

	useLayoutEffect(() => {
		const tl = animations.fill({ el: ref.current });
		return () => tl?.revert?.();
	}, []);

	return (
		<ul ref={ref} className='hidden-numbers'>
			{numbers.map((n) => (
				<HiddenNumber key={n.value} value={n.value}/>
			))}
		</ul>
	);
};