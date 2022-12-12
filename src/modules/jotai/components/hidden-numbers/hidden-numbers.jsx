import './hidden-numbers.less';
import React, { useEffect, useRef } from 'react';
import { useAtom } from 'jotai';
import { HiddenNumber } from './hidden-number/hidden-number';
import { hiddenNumbersAtom, isCorrectionStartedAtom } from '../../atoms/correct-numbers';
import { fill } from './animations';

export const HiddenNumbers = () =>  {
	const [isCorrectionStarted] = useAtom(isCorrectionStartedAtom);
	const [numbers] = useAtom(hiddenNumbersAtom);
	const ref = useRef();

	useEffect(() => {
		if (isCorrectionStarted) {
			fill({ el: ref.current });
		}
	}, [isCorrectionStarted]);

	return (
		<ul ref={ref} className='hidden-numbers'>
			{numbers.map((n) => <HiddenNumber key={n} value={n} />)}
		</ul>
	);
};