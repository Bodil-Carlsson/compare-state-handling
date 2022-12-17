import './hidden-numbers.less';
import React, { useEffect, useRef } from 'react';
import { useAtom } from 'jotai';
import { HiddenNumber } from './hidden-number/hidden-number';
import { hiddenNumbersAtom, correctionStatusAtom } from '../../atoms/correct-numbers';
import { correctionStatus } from '../../constants';
import { fill } from './animations';

export const HiddenNumbers = () =>  {
	const [correction] = useAtom(correctionStatusAtom);
	const [numbers] = useAtom(hiddenNumbersAtom);
	const ref = useRef();

	useEffect(() => {
		if (correction === correctionStatus.starting) {
			fill({ el: ref.current });
		}
	}, [correction]);

	return (
		<ul ref={ref} className='hidden-numbers'>
			{numbers.map((n) => <HiddenNumber key={n} value={n} />)}
		</ul>
	);
};