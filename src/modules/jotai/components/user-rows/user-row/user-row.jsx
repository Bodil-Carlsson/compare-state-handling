import './user-row.less';
import React from 'react';
import { UserNumber } from './user-number/user-number';
import { CorrectCount } from './correct-count/correct-count';
import { userNumberStatus } from '../../../constants';

export const UserRow = ({ row }) => {
	return (
		<li className='user-row'>
			<ul className='user-row-numbers'>
				{row.numbers.map((n) => (
					<UserNumber key={n.value} value={n.value} status={n.status} rowId={row.id}/>
				))}
			</ul>
			<CorrectCount correctCount={row.numbers.filter((n) => n.status === userNumberStatus.corrected).length}/>
		</li>
	);
};