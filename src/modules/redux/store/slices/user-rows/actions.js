import actionTypes from "./action-types";

export const addUserRows = (rows) => ({ type: actionTypes.addUserRows, rows });
export const correctUserNumber = (rowId, number) => ({ type: actionTypes.correctUserNumber, rowId, number });
export const userNumberCorrected = (rowId, number) => ({ type: actionTypes.userNumberCorrected, rowId, number });
export const sortUserRow = (rowId) => ({ type: actionTypes.sortUserRow, rowId });
export const userRowSorted = (rowId) => ({ type: actionTypes.userRowSorted, rowId });
export const sortUserRows = () => ({ type: actionTypes.sortUserRows });
export const userRowsSorted = () => ({ type: actionTypes.userRowsSorted });


export default {
	addUserRows,
	correctUserNumber,
	userNumberCorrected,
	sortUserRow,
	userRowSorted,
	sortUserRows,
	userRowsSorted
};
