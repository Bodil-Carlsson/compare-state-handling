import { atom } from 'jotai';
import { userNumberStatus } from '../constants';

let rowsAtom;

const fetchRows = async () => {
	if (!rowsAtom) {
		const res = await fetch('http://localhost:3000/api/user/rows', { method: 'GET' });
		const { rows } = await res.json();
		rowsAtom = atom(
			rows.map((row) => ({
				...row,
				numbers: row.numbers.map((n) => ({ ...n, status: userNumberStatus.initial }))
			}))
		);
	}
	return rowsAtom;
};

const findRowIndex = (rows, id) => {
	return rows.findIndex((row) => row.id === id);
}

export const asyncRowsAtom = atom(
	async (get) => get(await fetchRows())
);

export const fetchRowsAtom = atom(
	(get) => Boolean(rowsAtom), 
	async (get, set) => set(rowsAtom, await fetchRows())
);

export const updateUserNumberStatusAtom = atom(
	null, 
	(get, set, { rowId, value, status }) => {
		const rows = [...get(rowsAtom)];
		const rowIndex = findRowIndex(rows, rowId);
		rows[rowIndex] = {
			...rows[rowIndex],
			numbers: rows[rowIndex].numbers.map((n) => n.value === value ? ({ value, status }) : n)
		};
		set(rowsAtom, rows);
	}
);
