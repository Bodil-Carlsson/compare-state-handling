import {
	USER_ROWS_ADD,
	USER_ROWS_CORRECT_NUMBER,
	USER_ROWS_SORT_ROW,
	USER_ROWS_SORT_ROWS
} from './action-types';
import { 
	CORRECT_NUMBER_CORRECTED, 
	CORRECT_NUMBER_CORRECTING 
} from '../correct-numbers/action-types';
import { 
	sortNumbers, 
	correctCount, 
	numbersNeedsSorting 
} from './utils';

const initialState = {
	rowIds: [],
	rows: [],
	correctNumber: null,
	numbersToCorrect: []
};

const reducer = (state = initialState, action) => {
	switch(action.type) {

		case USER_ROWS_ADD: {
			return {
				...state,
				rowIds: action.rows.map((r) => r.id),
				rows: action.rows.map((r) => ({ 
					...r,
					numberValues: r.numbers.map((n) => n.value),
					numbers: r.numbers.reduce((acc, n) => (
						Object.assign(acc, { [n.value]: { ...n, isCorrect: false } })
					), {})
				}))
			};
		}

		case USER_ROWS_CORRECT_NUMBER: {
			return {
				...state,
				rows: state.rows.map((r) => r.id === action.rowId ?
					({
						...r,
						numbers: { 
							...r.numbers, 
							[action.numberValue]: { 
								...r.numbers[action.numberValue], 
								isCorrect: true
							} 
						}
					}) : r
				),
				numbersToCorrect: state.numbersToCorrect.map((n) => n.rowId === action.rowId ? { ...n, corrected: true } : n)
			};
		}

		case USER_ROWS_SORT_ROW: {
			return {
				...state,
				rows: state.rows.map((r) => r.id === action.rowId ?
					({
						...r,
						numberValues: sortNumbers(state.rows[r.id])
					}) : r
				),
				numbersToCorrect: state.numbersToCorrect.map((n) => n.rowId === action.rowId ? { ...n, sorted: true } : n)
			};
		}

		case USER_ROWS_SORT_ROWS: {
			return {
				...state,
				rowIds: [...state.rowIds].sort((a, b) => correctCount(state.rows[b].numbers) - correctCount(state.rows[a].numbers))
			};
		}

		case CORRECT_NUMBER_CORRECTING: {
			return {
				...state,
				correctNumber: action.numberValue,
				numbersToCorrect: state.rowIds.reduce((arr, rowId) => {
					if (state.rows[rowId].numbers[action.numberValue]) {
						arr.push({ 
							rowId, 
							numberValue: action.numberValue, 
							corrected: false,
							sorted: !numbersNeedsSorting(state.rows[rowId], action.numberValue)
						});
					}
					return arr;
				}, [])
			};
		}

		case CORRECT_NUMBER_CORRECTED: {
			return {
				...state,
				correctNumber: null,
				numbersToCorrect: []
			};
		}

		default: {
			return state;
		}
	}
};

export default reducer;
