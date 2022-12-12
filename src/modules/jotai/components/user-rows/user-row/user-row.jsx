import './user-row.less';
import React, { useMemo } from 'react';
import { UserNumber } from './user-number/user-number';
import { CorrectCount } from './correct-count/correct-count';
import { userNumberStatus } from '../../../constants';
import { useAtom } from 'jotai';
import { selectUserNumbersAtom } from '../../../atoms/user-rows';

export const UserRow = ({ rowId }) => {
	const rowNumbersAtom = useMemo(() => selectUserNumbersAtom(rowId), [rowId]);
	const [rowNumbers] = useAtom(rowNumbersAtom);

	return (
		<li className='user-row'>
			<ul className='user-row-numbers'>
				{rowNumbers.map((n) => (
					<UserNumber key={n} value={n} rowId={rowId}/>
				))}
			</ul>
			<CorrectCount correctCount={rowNumbers.filter((n) => n === userNumberStatus.corrected).length}/>
		</li>
	);
};