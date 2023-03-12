import { 
	correctionStatus, 
	correctNumberStatus 
} from '../../../constants';

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	correctionStatus: correctionStatus.initial,
	numbers: []
};

const correctNumbersSlice = createSlice({
  name: 'correct-numbers',
  initialState,
  reducers: {
		correctNumberReceived(state, action) {
			state.numbers.push({ value: action.payload, status: correctNumberStatus.received });
		},

		correctNumberWaiting(state, action) {
			const number = state.numbers.find((n) => n.value === action.payload);
			number.status = correctNumberStatus.waiting;
		},

		correctNumberAnimating(state, action) {
			const number = state.numbers.find((n) => n.value === action.payload);
			number.status = correctNumberStatus.animating;
		},

		correctNumberCorrecting(state, action) {
			const number = state.numbers.find((n) => n.value === action.payload);
			number.status = correctNumberStatus.correcting;
		},

		correctNumberCorrected(state, action) {
			const number = state.numbers.find((n) => n.status === correctNumberStatus.correcting);
			number.status = correctNumberStatus.corrected;
		},

		correctionReadyToStart(state) {
			state.correctionStatus = correctionStatus.readyToStart;
		},
		
		correctionStarting(state) {
			state.correctionStatus = correctionStatus.starting;
		},

		correctionStarted(state,) {
			state.correctionStatus = correctionStatus.started;
		},

		correctionAllNumersReceived(state) {
			state.correctionStatus = correctionStatus.allNumersReceived;
		},
		
		correctionCompleted(state) {
			state.correctionStatus = correctionStatus.completed;
		}
  },
})

export const { 	
	correctNumberReceived,
	correctNumberWaiting,
	correctNumberAnimating,
	correctNumberCorrecting,
	correctNumberCorrected,
	correctionReadyToStart,
	correctionStarting,
	correctionStarted,
	correctionAllNumersReceived,
	correctionCompleted 
} = correctNumbersSlice.actions;
export const actions = correctNumbersSlice.actions;

export default correctNumbersSlice.reducer;
