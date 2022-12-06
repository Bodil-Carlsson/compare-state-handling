import './user-row.less';
import React from 'react';
import { UserNumber } from './user-number/user-number';
import { CorrectCount } from './correct-count/correct-count';

export const UserRow = ({ row }) => {
	return (
		<li className='user-row'>
			<ul className='user-row-numbers'>
				{row.numbers.map(({ value, isCorrect }) => (
					<UserNumber key={value} value={value} isCorrect={isCorrect}/>
				))}
			</ul>
			<CorrectCount correctCount={row.numbers.filter(({ isCorrect }) => isCorrect).length}/>
		</li>
	);
};