import { 
	correctionStatus, 
	correctNumberStatus 
} from '../../../constants';
import {
	CORRECT_NUMBER_RECEIVED,
	CORRECT_NUMBER_WAITING,
	CORRECT_NUMBER_ANIMATING,
	CORRECT_NUMBER_CORRECTING,
	CORRECT_NUMBER_CORRECTED,
	CORRECTION_READY_TO_START,
	CORRECTION_STARTING,
	CORRECTION_STARTED
} from './action-types';

const initialState = {
	correctionStatus: correctionStatus.initial,
	numbers: []
};

const reducer = (state = initialState, action) => {
	switch(action.type) {

		case CORRECT_NUMBER_RECEIVED: {
			return {
				...state,
				numbers: [
					...state.numbers, 
					{ value: action.numberValue, status: correctNumberStatus.received }
				]
			};
		}

		case CORRECT_NUMBER_WAITING: {
			return {
				...state,
				numbers: state.numbers.map(
					(n) => n.value === action.numberValue ? 
						({ ...n, status: correctNumberStatus.waiting }) : 
						n
				)
			};
		}

		case 	CORRECT_NUMBER_ANIMATING: {
			return {
				...state,
				numbers: state.numbers.map(
					(n) => n.value === action.numberValue ? 
						({ ...n, status: correctNumberStatus.animating }) : 
						n
				)
			};
		}

		case 	CORRECT_NUMBER_CORRECTING: {
			return {
				...state,
				numbers: state.numbers.map(
					(n) => n.value === action.numberValue ? 
						({ ...n, status: correctNumberStatus.correcting }) : 
						n
				)
			};
		}

		case CORRECT_NUMBER_CORRECTED: {
			return {
				...state,
				numbers: state.numbers.map(
					(n) => n.status === correctNumberStatus.correcting ? 
						({ ...n, status: correctNumberStatus.corrected }) : 
						n
				)
			};
		}

		case CORRECTION_READY_TO_START: {
			return {
				...state,
				correctionStatus: correctionStatus.readyToStart
			};
		}

		case CORRECTION_STARTING: {
			return {
				...state,
				correctionStatus: correctionStatus.starting
			};
		}

		case CORRECTION_STARTED: {
			return {
				...state,
				correctionStatus: correctionStatus.started
			};
		}

		default: {
			return state;
		}
	}
};

export default reducer;
