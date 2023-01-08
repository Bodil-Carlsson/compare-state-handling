import {
	USER_ROWS_ADD,
	USER_ROWS_CORRECT_NUMBER,
	USER_ROWS_SORT_ROW,
	USER_ROWS_SORT_ROWS
} from "./action-types";

export const userRowsAdd = (rows) => ({ type: USER_ROWS_ADD, rows });
export const userRowsCorrectNumber = (rowId, numberValue) => ({ type: USER_ROWS_CORRECT_NUMBER, rowId, numberValue });
export const userRowsSortRow = (rowId) => ({ type: USER_ROWS_SORT_ROW, rowId });
export const userRowsSortRows = () => ({ type: USER_ROWS_SORT_ROWS });

export default {
	userRowsAdd,
	userRowsCorrectNumber,
	userRowsSortRow,
	userRowsSortRows
};
