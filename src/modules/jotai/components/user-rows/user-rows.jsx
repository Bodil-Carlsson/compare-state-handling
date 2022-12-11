import React, { useRef, useLayoutEffect } from 'react';
import { useAtom } from 'jotai';
import { UserRow } from './user-row/user-row';
import { asyncRowsAtom } from '../../atoms/user-rows';
import { showRows } from './animations';

export const UserRows = () => {
	const [rows] = useAtom(asyncRowsAtom);
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
