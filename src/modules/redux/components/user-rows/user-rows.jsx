import React, { useState, useEffect } from 'react';
import { UserRow } from './user-row/user-row';

const corrCount = (row) => row.numbers.filter((n) => n.isCorrect).length;

export const UserRows = ({ rows }) => {
	const sortedRows = [...rows].sort((a, b) => corrCount(b) - corrCount(a));
	return (
		<ul className='user-rows'>
			{sortedRows.map((row) => (
				<UserRow key={row.id} row={row} />
			))}
	</ul>
	);
};
