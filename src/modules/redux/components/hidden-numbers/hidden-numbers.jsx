import React from 'react';
import { useSelector } from 'react-redux';
import { correctNumberStatus } from '../../constants';
import { HiddenNumber } from './hidden-number/hidden-number';

export const HiddenNumbers = () =>  {
	const numbers = useSelector(
		(state) => state.correctNumbers.numbers.filter((n) => n.status < correctNumberStatus.show),  
		(prev, curr) => prev.length === curr.length
	);
	return (
		<ul className='hidden-numbers'>
			{numbers.map((n) => <HiddenNumber key={n.value} value={n.value}/>)}
		</ul>
	);
};