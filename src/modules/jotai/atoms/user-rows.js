import { atom } from 'jotai';
import { selectAtom } from 'jotai/utils';
import { userNumberStatus } from '../constants';

const fetchRows = async () => {
	const res = await fetch('http://localhost:3000/api/user/rows', { method: 'GET' });
	const { rows } = await res.json();
	return rows.map((row) => ({
		...row,
		numbers: row.numbers.map((n) => ({ ...n, status: userNumberStatus.initial }))
	}));
};

const rowIds = (rows) => Array.isArray(rows) ? rows.map((r) => r.id) : rows;

const rowsAtom = atom([]);
rowsAtom.debugLabel = 'rowsAtom';

// Fetch rows

export const fetchUserRowsAtom = atom(
	null,
	(get, set) => set(rowsAtom, fetchRows())
);
fetchUserRowsAtom.debugLabel = 'fetchUserRowsAtom';

// Derived from rowsAtom

const selectRowAtom = (rowId) => {
	const selectRowAtom = selectAtom(rowsAtom, (rows) => rows.find((r) => r.id === rowId));
	selectRowAtom.debugLabel = 'selectRowAtom';
	return selectRowAtom;
};


export const userRowIdsAtom = atom(
	(get) => rowIds(get(rowsAtom))
);
userRowIdsAtom.debugLabel = 'userRowIdsAtom';

export const selectUserNumbersAtom = (rowId) => {
	console.log('selectUserNumbersAtom', rowId);
	const selectNumbersAtom = selectAtom(selectRowAtom(rowId), (row) => row.numbers.map((n) => n.value));
	selectNumbersAtom.debugLabel = 'selectUserNumbersAtom';
	return selectNumbersAtom;
};

export const selectUserNumberStatusAtom = (rowId, value) => {
	console.log('selectUserNumberStatusAtom', rowId, value);
	const selectStatusAtom = selectAtom(selectRowAtom(rowId), (row) => row.numbers.find((n) => n.value === value).status);
	selectStatusAtom.debugLabel = 'selectUserNumberStatusAtom';
	return selectStatusAtom;
};

export const updateUserNumberStatusAtom = atom(
	null, 
	(get, set, { rowId, value, status }) => {
		const rows = [...get(rowsAtom)];
		const rowIndex = rows.findIndex((row) => row.id === rowId);
		rows[rowIndex] = {
			...rows[rowIndex],
			numbers: rows[rowIndex].numbers.map((n) => n.value === value ? ({ value, status }) : n)
		};
		set(rowsAtom, rows);
	}
);
