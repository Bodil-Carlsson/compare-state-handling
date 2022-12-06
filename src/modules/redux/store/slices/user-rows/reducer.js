import {
	addUserRows,
	correctUserNumber,
	userNumberCorrected,
	sortUserRow,
	userRowSorted,
	sortUserRows,
	userRowsSorted
} from './action-types';
import { startCorrectingNumber } from '../correct-numbers/action-types';
import { userNumberStatus } from '../../../constants';
import { sortNumbers, sortRowIds, numbersNeedsSorting } from './utils';
const initialState = {
	rowIds: [],
	rows: [],
	numberToCorrect: null,
	isSorting: false
};

const updateNumberStatus = (rows, rowId, numberToCorrect, status) => {
	return rows.map((row) => row.id === rowId ? 
		({
			...row, 
			numbers: row.numbers.map((number) => number.value === numberToCorrect ? 
				({ ...number, status }) : 
				number
			) 
		}) : 
		row
	)
};

const reducer = (state = initialState, action) => {
	switch(action.type) {
		case addUserRows: {
			return { 
				...state,
				rowIds: action.rows.map((row) => row.id),
				sortedIds: action.rows.map((row) => row.id),
				rows: action.rows.map((row) => ({ 
					...row,
					isSorting: false,
					isCorrecting: false,
					numbers: row.numbers.map((number) => ({ 
						...number,
						status: userNumberStatus.initial
					}))
				}))
			};
		}

		case startCorrectingNumber: {
			return {
				...state,
				numberToCorrect: action.number
			};
		}

		case correctUserNumber: {
			return {
				...state,
				rows: updateNumberStatus(state.rows, action.rowId, action.number, userNumberStatus.correcting)
			};
		}

		case userNumberCorrected: {
			return {
				...state,
				rows: updateNumberStatus(state.rows, action.rowId, action.number, userNumberStatus.corrected)
			};
		}

		case sortUserRow: {
			return {
				...state,
				rows: state.rows.map((row) => row.id === action.rowId ? 
					({
						...row,
						isSorting: true
					}) : 
					row
				)
			};
		}

		case userRowSorted: {
			return {
				...state,
				rows: state.rows.map((row) => row.id === action.rowId ? 
					({
						...row,
						isSorting: false,
						numbers: sortNumbers(row.numbers)
					}) : 
					row
				)
			};
		}

		case sortUserRows: {
			return {
				...state,
				isSorting: true,
				sortedIds: sortRowIds(state.rowIds, state.rows)
			};
		}

		case userRowsSorted: {
			return{
				...state,
				isSorting: false,
				rowIds: [...state.sortedIds]
			};
		}

		default: {
			return state;
		}
	}
};

export default reducer;
