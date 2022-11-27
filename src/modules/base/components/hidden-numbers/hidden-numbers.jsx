import './hidden-numbers.less';
import React from 'react';
import { HiddenNumber } from './hidden-number/hidden-number';

export const HiddenNumbers = ({ numbers }) =>  {
	return (
		<ul className='hidden-numbers'>
			{numbers.map(({ value }) => <HiddenNumber key={value}/>)}
		</ul>
	);
};