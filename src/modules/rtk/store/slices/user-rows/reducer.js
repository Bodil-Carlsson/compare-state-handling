import { 
	correctNumberCorrecting, 
	correctNumberCorrected 
} from "./../correct-numbers/reducer";
import { 
	sortNumbers, 
	correctCount, 
	numbersNeedsSorting 
} from './utils';

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	rowIds: [],
	rows: [],
	correctNumber: null,
	numbersToCorrect: []
};

const userRowsSlice = createSlice({
  name: 'user-rows',
  initialState,
  reducers: {
		userRowsAdd(state, action) {
			state.rowIds = action.payload.map((r) => r.id);
			state.rows = action.payload.map((r) => ({ 
				...r,
				numberValues: r.numbers.map((n) => n.value),
				numbers: r.numbers.reduce((acc, n) => (
					Object.assign(acc, { [n.value]: { ...n, isCorrect: false } })
				), {})
			}));
		},
		userRowsCorrectNumber(state, action) {
			state.rows[action.payload.rowId].numbers[action.payload.numberValue].isCorrect = true;
			state.numbersToCorrect.find((n) => n.rowId === action.payload.rowId).corrected = true;
		},
		userRowsSortRow(state, action) {
			state.rows[action.payload].numberValues = sortNumbers(state.rows[action.payload]);
			state.numbersToCorrect.find((n) => n.rowId === action.payload).sorted = true;
		},
		userRowsSortRows(state) {
			state.rowIds.sort((a, b) => correctCount(state.rows[b].numbers) - correctCount(state.rows[a].numbers));
		}
  },
	extraReducers: {
		[correctNumberCorrecting.type](state, action) {
			state.correctNumber = action.payload;
			state.numbersToCorrect = state.rowIds.reduce((arr, rowId) => {
				if (state.rows[rowId].numbers[action.payload]) {
					arr.push({ 
						rowId, 
						numberValue: action.payload, 
						corrected: false,
						sorted: !numbersNeedsSorting(state.rows[rowId], action.payload)
					});
				}
				return arr;
			}, []);

		},
		[correctNumberCorrected.type](state) {
			state.correctNumber = null;
			state.numbersToCorrect = [];
		}
	}
})


export const { 	
	userRowsAdd,
	userRowsCorrectNumber,
	userRowsSortRow,
	userRowsSortRows
} = userRowsSlice.actions;
export const actions = userRowsSlice.actions;

export default userRowsSlice.reducer;
