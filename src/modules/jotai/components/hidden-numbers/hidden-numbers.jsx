import './hidden-numbers.less';
import React, { useEffect, useRef } from 'react';
import { useAtom } from 'jotai';
import { HiddenNumber } from './hidden-number/hidden-number';
import { waitingNumbersAtom, startCorrectionAtom } from '../../atoms/correct-numbers';
import { fill } from './animations';

export const HiddenNumbers = () =>  {
	const [correctionStarted] = useAtom(startCorrectionAtom);
	const [numbers] = useAtom(waitingNumbersAtom);
	const ref = useRef();

	useEffect(() => {
		if (correctionStarted) {
			fill({ el: ref.current });
		}
	}, [correctionStarted])
	console.log('hidden numbers', numbers);
	return (
		<ul ref={ref} className='hidden-numbers'>
			{numbers.map((n) => <HiddenNumber key={n.value} value={n.value} status={n.status} />)}
		</ul>
	);
};