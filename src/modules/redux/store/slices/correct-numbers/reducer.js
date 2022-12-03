
import { correctNumberStatus } from '../../../constants';
import {
	addCorrectNumber,
	hideCorrectNumber,
	startCorrectNumber,
	showCorrectNumber
} from './action-types';

const initialState = {
	numbers: []
};

const reducer = (state = initialState, action) => {
	switch(action.type) {
		case addCorrectNumber: {
			return {
				...state,
				numbers: [
					...state.numbers, 
					{ value: action.number, status: correctNumberStatus.none }
				]
			};
		}

		case hideCorrectNumber: {
			const numbers = [...state.numbers];
			const numberIndex = numbers.findIndex((n) => n.value === action.number);
			numbers[numberIndex] = {
				...numbers[numberIndex],
				status: correctNumberStatus.hide
			};
			return {
				...state,
				numbers
			};
		}

		case startCorrectNumber: {
			const numbers = [...state.numbers];
			const numberIndex = numbers.findIndex((n) => n.value === action.number);
			numbers[numberIndex] = {
				...numbers[numberIndex],
				status: correctNumberStatus.correcting
			};
			return {
				...state,
				numbers
			};
		}

		case showCorrectNumber: {
			const numbers = [...state.numbers];
			const numberIndex = numbers.findIndex((n) => n.value === action.number);
			numbers[numberIndex] = {
				...numbers[numberIndex],
				status: correctNumberStatus.show
			};
			return {
				...state,
				numbers
			};
		}

		default: {
			return state;
		}
	}
};

export default reducer;
