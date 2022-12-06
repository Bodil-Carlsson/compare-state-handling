import React, { useRef, useLayoutEffect } from 'react';
import { useAtom } from 'jotai';
import { UserRow } from './user-row/user-row';
import { rowsAtom } from '../../atoms/atoms';
import { showRows } from './animations';

const corrCount = (row) => row.numbers.filter((n) => n.isCorrect).length;

export const UserRows = () => {
	const [rows] = useAtom(rowsAtom);
	const ref = useRef();

	useLayoutEffect(() => {
		const tl = showRows({ 
			el: ref.current, 
			onComplete: () => tl.revert() 
		});
	}, []);

	return (
		<ul ref={ref} className='user-rows'>
			{rows.map((row) => (
				<UserRow key={row.id} row={row} />
			))}
	</ul>
	);
};
