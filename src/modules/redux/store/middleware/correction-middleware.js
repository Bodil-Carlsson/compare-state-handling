import { 
	correctNumberStatus, 
	userNumberStatus 
} from "../../constants";
import { 	
	hideCorrectNumber,
	showCorrectNumber
 } from "../slices/correct-numbers/action-types";
 import { 
	setNumberToCorrect, 
	correctNumberInRow, 
	sortRow, 
	rowSorted, 
	rowsSorted, 
	sortRows 
} from "../slices/user-rows/action-types";
import correctNumbersActions from "../slices/correct-numbers/actions";
import userRowsActions from "../slices/user-rows/actions";
const actions = {
	...correctNumbersActions,
	...userRowsActions
};

const needsSorting = (curr, sorted) => {
	for (let i = 0, len = sorted.length; i < len; i++) {
		if (sorted[i] !== curr[i]) {
			return true;
		}
	}
	return false;
};
const numbersNeedsSorting = (numbers) => {
	const sorted = [...numbers].sort((a, b) => b.status - a.status);
	return needsSorting(numbers, sorted);
};
const getRowCorrectCount = (rowId, rows) => rows.find((r) => r.id === rowId).numbers.filter((n) => n.status === userNumberStatus.corrected).length;
const rowsNeedsSorting = (rowIds, rows) => {
	const sorted = [...rowIds].sort((a, b) => getRowCorrectCount(b, rows) - getRowCorrectCount(a, rows));
	return needsSorting(rowIds, sorted);
};

export default (store) => (next) => (action) => {
	const {
		correctNumbers: {
			numbers
		},
		userRows: {
			rowIds,
			rows,
			numberToCorrect
		}
	} = store.getState();

	switch (action.type) {
		case correctNumberInRow: {
			if (!Number.isInteger(action.rowId)) {
				store.dispatch(actions.sortRows());
				return;
			}
			break;
		}
		case sortRow: {
			if (!numbersNeedsSorting(rows[action.rowId].numbers)) {
				store.dispatch(actions.rowSorted(action.rowId));
				return;
			}
			break;
		}
		case sortRows: {
			if (!rowsNeedsSorting(rowIds, rows)) {
				store.dispatch(actions.rowsSorted());
				return;
			}
			break;
		}
	}

	next(action);

	switch (action.type) {
		case hideCorrectNumber: {
			if (!numbers.some((n) => n.status === correctNumberStatus.correcting)) {
				store.dispatch(actions.startCorrectNumber(action.number));
			}
			break;
		}
		case setNumberToCorrect: {
			const rowId = rowIds.find((id) => rows[id].numbers.find((n) => n.value === action.number && n.status === userNumberStatus.none));
			store.dispatch(actions.correctNumberInRow(rowId));
			break;
		}
		case rowSorted: {
			const rowId = rowIds.find((id) => rows[id].numbers.find((n) => n.value === numberToCorrect && n.status === userNumberStatus.none));
			store.dispatch(actions.correctNumberInRow(rowId));
			break;
		}
		case rowsSorted: {
			store.dispatch(actions.showCorrectNumber(numberToCorrect));
			break;
		}
		case showCorrectNumber: {
			const firstHidden = numbers.find((n) => n.status === correctNumberStatus.hide);
			if (firstHidden) {
				store.dispatch(actions.startCorrectNumber(firstHidden.value));
			}
		}
	}
};
