import {
	addUserRows,
	setNumberToCorrect,
	correctNumberInRow,
	sortRow,
	rowSorted,
	sortRows,
	rowsSorted
} from './action-types';
import { userNumberStatus } from '../../../constants';

const initialState = {
	rowIds: [],
	rows: [],
	numberToCorrect: null,
	isSorting: false
};

const getRowCorrectCount = (rowId, rows) => rows.find((r) => r.id === rowId).numbers.filter((n) => n.status === userNumberStatus.corrected).length;

const reducer = (state = initialState, action) => {
	switch(action.type) {
		case addUserRows: {
			return { 
				...state,
				rowIds: action.rows.map((row) => row.id),
				rows: action.rows.map((row) => ({ 
					...row,
					isSorting: false,
					isCorrecting: false,
					numbers: row.numbers.map((number) => ({ 
						...number,
						status: userNumberStatus.none
					}))
				}))
			};
		}

		case setNumberToCorrect: {
			return {
				...state,
				numberToCorrect: action.number
			};
		}

		case correctNumberInRow: {
			const rows = [...state.rows];
			const row = rows[action.rowId];
			rows[action.rowId] = { 
				...row,
				isCorrecting: true,
				numbers: row.numbers.map((n) => {
					if (n.value === state.numberToCorrect) {
						return { value: n.value, status: userNumberStatus.correcting }
					}
					return n;
				})
			};
			return {
				...state,
				rows
			};
		}

		case sortRow: {
			const rows = [...state.rows];
			const row = rows[action.rowId];
			rows[action.rowId] = { 
				...row,
				isSorting: true,
				isCorrecting: false,
				numbers: row.numbers.map((n) => {
					if (n.status === userNumberStatus.correcting) {
						return { value: n.value, status: userNumberStatus.sorting }
					}
					return n;
				}).sort((a, b) => b.status - a.status)
			};
			return {
				...state,
				rows
			};
		}

		case rowSorted: {
			const rows = [...state.rows];
			const row = rows[action.rowId];
			rows[action.rowId] = { 
				...row,
				isSorting: false,
				numbers: row.numbers.map((n) => {
					if (n.status === userNumberStatus.sorting) {
						return { value: n.value, status: userNumberStatus.corrected }
					}
					return n;
				})
			};
			return {
				...state,
				rows
			};
		}

		case sortRows: {
			const rowIds = [...state.rowIds].sort((a, b) => getRowCorrectCount(b, state.rows) - getRowCorrectCount(a, state.rows));
			return {
				...state,
				rowIds,
				isSorting: true
			};
		}

		case rowsSorted: {
			return{
				...state,
				isSorting: false
			};
		}

		default: {
			return state;
		}
	}
};

export default reducer;
