import { atom } from 'jotai';
import { selectAtom } from 'jotai/utils';
import { userNumberStatus } from '../constants';
import { correctingNumberAtom } from './correct-numbers';

const fetchRows = async () => {
	const res = await fetch('/api/user/rows', { method: 'GET' });
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
		rows[rowId] = {
			...rows[rowId],
			numbers: rows[rowId].numbers.map((n) => n.value === value ? ({ value, status }) : n)
		};
		set(rowsAtom, rows);
	}
);
updateUserNumberStatusAtom.debugLabel = 'updateUserNumberStatusAtom';

const rowsWithNumber = (rows, number) => rows.filter((r) => r.numbers.find((n) => n.value === number && n.status !== userNumberStatus.corrected));

const rowsToCorrectAtom = atom(
	(get) => {
		const rows = rowsWithNumber(get(rowsAtom), get(correctingNumberAtom)?.value);
		const sorted = get(userRowIdsAtom).filter((id) => rows.find((r) => r.id === id));
		return sorted.map((id) => rows.find((r) => r.id === id));
	}
);

export const userRowsToCorrectAtom = selectAtom(rowsToCorrectAtom, (rows) => {
	console.log('userRowsToCorrect', rows);
	return rows;
}, (a, b) => {
	console.log('a', a);
	console.log('b', b);
	return a.length === b.length;
});
userRowsToCorrectAtom.debugLabel = 'userRowsToCorrectAtom';