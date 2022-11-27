import React from 'react';
import { UserRow } from './user-row/user-row';

export const UserRows = ({ rows }) => {
	return (
		<ul className='user-rows'>
			{rows.map((row) => (
				<UserRow key={row.id} row={row} />
			))}
	</ul>
	);
};
