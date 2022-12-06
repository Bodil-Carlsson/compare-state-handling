import { 
	correctNumberStatus, 
	userNumberStatus 
} from "../../constants";
import { 
	startCorrection,
	correctNumberReceived,
	correctNumberWaiting,
	showCorrectNumber,
	startCorrectingNumber,
	correctNumberCorrected
 } from "../slices/correct-numbers/action-types";
 import {
	addUserRows,
	correctUserNumber,
	userNumberCorrected,
	sortUserRow,
	userRowSorted,
	sortUserRows,
	userRowsSorted
 } from "../slices/user-rows/action-types";
import correctNumbersActions from "../slices/correct-numbers/actions";
import userRowsActions from "../slices/user-rows/actions";
import { numbersNeedsSorting, rowsNeedsSorting } from "../slices/user-rows/utils";
const actions = {
	...correctNumbersActions,
	...userRowsActions
};

const nextUserRowWithCorrectNumber = (rowIds, rows, numberToCorrect) => {
	return rowIds.find((id) => rows[id].numbers.find((n) => n.value === numberToCorrect && n.status === userNumberStatus.initial));
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
		case showCorrectNumber: {
			if (!Number.isInteger(action.number)) {
				return;
			}
			break;
		}

		case sortUserRow: {
			if (!numbersNeedsSorting(rows[action.rowId].numbers)) {
				return store.dispatch(actions.userRowSorted(action.rowId));
			}
			break;
		}

		case sortUserRows: {
			if (!rowsNeedsSorting(rowIds, rows)) {
				return store.dispatch(actions.userRowsSorted());
			}
			break;
		}
	}

	next(action);

	switch (action.type) {
		case correctNumberWaiting: {
			if (!numbers.some((n) => n.status === correctNumberStatus.animating || n.status === correctNumberStatus.correcting)) {
				store.dispatch(actions.showCorrectNumber(action.number));
			}
			break;
		}

		case startCorrectingNumber: {
			const rowId = nextUserRowWithCorrectNumber(rowIds, rows, action.number);
			if (Number.isInteger(rowId)) {
				store.dispatch(actions.correctUserNumber(rowId, action.number));
			} else {
				store.dispatch(actions.correctNumberCorrected(action.number));
			}
			break;
		}

		case userNumberCorrected: {
			const rowId = nextUserRowWithCorrectNumber(rowIds, rows, numberToCorrect);
			if (Number.isInteger(rowId)) {
				store.dispatch(actions.correctUserNumber(rowId, numberToCorrect));
			}

			store.dispatch(actions.sortUserRow(action.rowId));
			break;
		}

		case userRowSorted: {
			if (rowIds.every((rowId) => rowId === action.rowId  || !numbersNeedsSorting(rows[rowId].numbers))) {
				store.dispatch(actions.sortUserRows());
			}

			break;
		}

		case userRowsSorted: {
			store.dispatch(actions.correctNumberCorrected(numberToCorrect));
			break;
		}

		case correctNumberCorrected: {
			const firstHidden = numbers.find((n) => n.status === correctNumberStatus.waiting);
			store.dispatch(actions.showCorrectNumber(firstHidden?.value));
			break;
		}
	}
};


/*
export default (store) => (next) => (action) => {
	const {
		correctNumbers: {
			numbers
		},
		userRows: {
			rowIds,
			rows
		}
	} = store.getState();

	next(action);

	switch (action.type) {
		case correctNumberWaiting: {
			if (!numbers.some((n) => n.status === correctNumberStatus.animating || n.status === correctNumberStatus.correcting)) {
				store.dispatch(actions.showCorrectNumber(action.number));
			}
			break;
		}

		case startCorrectingNumber: {
			rowIds.forEach((id) => {
				store.dispatch(actions.correctUserNumber(id, action.number));
			})
			break;
		}

		case sortUserRow: {
			if (rowIds.every((rowId) => rowId === action.rowId  || !numbersNeedsSorting(rows[rowId].numbers))) {
				store.dispatch(actions.sortRows());
			}
			break;
		}

		case userRowsSorted: {
			return;
		}
	}
};
*/