import {
	addUserRows
} from './action-types';

const initialState = {
	rows: []
};

const reducer = (state = initialState, action) => {
	switch(action.type) {
		case addUserRows: {
			return { 
				...state,
				rows: action.rows.map((row) => ({ 
					...row, 
					numbers: row.numbers.map((number) => ({ 
						...number,
						isCorrect: false 
					}))
				}))
			};
		}

		default: {
			return state;
		}
	}
};

export default reducer;
