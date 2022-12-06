import { correctNumberStatus } from '../../../constants';
import {
	startCorrection,
	correctNumberReceived,
	correctNumberWaiting,
	showCorrectNumber,
	startCorrectingNumber,
	correctNumberCorrected
} from './action-types';

const initialState = {
	correctionStarted: false,
	numbers: []
};

const updateNumberStatus = (numbers, number, status) => numbers.map((n) => n.value === number ? ({ ...n, status }) : n);

const reducer = (state = initialState, action) => {
	switch(action.type) {

		case startCorrection: {
			return { 
				...state, 
				correctionStarted: true 
			};
		}

		case correctNumberReceived: {
			return { 
				...state, 
				numbers: [
					...state.numbers, 
					{ value: action.number, status: correctNumberStatus.received }
				] 
			};
		}

		case correctNumberWaiting: {
			return {
				...state,
				numbers: updateNumberStatus(state.numbers, action.number, correctNumberStatus.waiting)
			};
		}

		case showCorrectNumber: {
			return {
				...state,
				numbers: updateNumberStatus(state.numbers, action.number, correctNumberStatus.animating)
			};
		}

		case startCorrectingNumber: {
			return {
				...state,
				numbers: updateNumberStatus(state.numbers, action.number, correctNumberStatus.correcting)
			};
		}

		case correctNumberCorrected: {
			return {
				...state,
				numbers: updateNumberStatus(state.numbers, action.number, correctNumberStatus.corrected)
			};
		}

		default: {
			return state;
		}
	}
};

export default reducer;
