import actionTypes from "./action-types";

export const addUserRows = (rows) => ({ type: actionTypes.addUserRows, rows });
export const setNumberToCorrect = (number) => ({ type: actionTypes.setNumberToCorrect, number });
export const correctNumberInRow = (rowIndex) => ({ type: actionTypes.correctNumberInRow, rowIndex });
export const sortRow = (rowId) => ({ type: actionTypes.sortRow, rowId });
export const rowSorted = (rowId) => ({ type: actionTypes.rowSorted, rowId });
export const sortRows = () => ({ type: actionTypes.sortRows });
export const rowsSorted = () => ({ type: actionTypes.rowsSorted });

export default {
	addUserRows,
	setNumberToCorrect,
	correctNumberInRow,
	sortRow,
	rowSorted,
	sortRows,
	rowsSorted
};
