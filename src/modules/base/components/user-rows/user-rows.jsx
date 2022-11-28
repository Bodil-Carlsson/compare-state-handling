import React, { useState, useEffect } from 'react';
import { UserRow } from './user-row/user-row';

export const UserRows = () => {
	const [rows, setRows] = useState([]);
	useEffect(() => {
		(async () => {
			const res = await fetch('http://localhost:3000/api/user/rows', { method: 'GET' });
			const { rows } = await res.json();
			setRows(rows);
		})();
	}, []);
	return (
		<ul className='user-rows'>
			{rows.map((row) => (
				<UserRow key={row.id} row={row} />
			))}
	</ul>
	);
};
