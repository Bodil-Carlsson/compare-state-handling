import { createSelector } from "reselect";
import { sortNumbers, correctCount } from "./utils"; 

const arraysAreEqual = (key) => (arr1, arr2) => {
	if (arr1 === arr2) return true;
	if (Boolean(arr1) !== Boolean(arr2)) return false;
	if (arr1.length !== arr2.length) return false;
	if (key) return !arr1.some((o, i) => o[key] !== arr2[i][key]);
	return !arr1.some((o, i) => o !== arr2[i]);
}

const selectUserRowsSlice = createSelector(
	(state) => state.userRows,
	(userRows) => userRows
);

const selectUserRows = createSelector(
	selectUserRowsSlice,
	(userRows) => userRows.rows
);

const rowSelectors = {};

const userRowSelector = (rowId) => (
	rowSelectors[rowId] || 
	(rowSelectors[rowId] = createSelector(
		selectUserRows,
		(rows) => rows[rowId]
	))
);

const numberSelectors = {};

const userNumberSelector = (rowId, numberValue) => (
	numberSelectors[`${rowId}_${numberValue}`] || 
	(numberSelectors[`${rowId}_${numberValue}`] = createSelector(
		userRowSelector(rowId),
		(row) => row.numbers[numberValue]
	))
);

const selectCorrectNumber = createSelector(
	selectUserRowsSlice,
	(userRows) => userRows.correctNumber
);

const selectNumbersToCorrect = createSelector(
	selectUserRowsSlice,
	(userRows) => userRows.numbersToCorrect
);

const selectNumberToCorrect = createSelector(
	selectNumbersToCorrect,
	(numbersToCorrect) => numbersToCorrect.find((n) => !n.corrected)
);

export const selectHasUserRows = createSelector(
	selectUserRows,
	(rows) => rows.length > 0
);

export const selectUserRowIds = createSelector(
	selectUserRowsSlice,
	(userRows) => userRows.rowIds
);

export const selectPresortedUserRowIds = createSelector(
	selectNumbersToCorrect,
	selectUserRowIds,
	selectUserRows,
	(numbersToCorrect, rowIds, rows) => {
		if (!numbersToCorrect.length) return null;
		if (numbersToCorrect.some((n) => !n.corrected || !n.sorted)) return null;
		const sortedRows = [...rowIds].sort((a, b) => correctCount(rows[b].numbers) - correctCount(rows[a].numbers));
		return arraysAreEqual()(rowIds, sortedRows) ? null : sortedRows;
	},
	{
		memoizeOptions: {
			resultEqualityCheck: arraysAreEqual()
		}
	}
);

export const createUserRowNumberValuesSelector = (rowId) => createSelector(
	userRowSelector(rowId),
	(row) => row.numberValues
);

export const createPresortedUserRowNumbersSelector = (rowId) => createSelector(
	userRowSelector(rowId),
	(row) => {
		const sortedNumbers = sortNumbers(row);
		return arraysAreEqual()(row.numberValues, sortedNumbers) ? null : sortedNumbers;
	},
	{
		memoizeOptions: {
			resultEqualityCheck: arraysAreEqual()
		}
	}
);


export const createIsUserNumberCorrectSelector = (rowId, numberValue) => createSelector(
	userNumberSelector(rowId, numberValue),
	(number) => number.isCorrect
);

export const createIsUserNumberCorrectingSelector = (rowId, numberValue) => createSelector(
	selectNumberToCorrect,
	(numberToCorrect) => (
		numberToCorrect &&
		rowId === numberToCorrect.rowId &&
		numberValue === numberToCorrect.numberValue
	)
);

export const selectIsCorrectionOfNumberComplete = createSelector(
	selectCorrectNumber,
	selectNumbersToCorrect,
	selectPresortedUserRowIds,
	(correctNumber, numbersToCorrect, sortedRowIds) => (
		correctNumber && 
		!numbersToCorrect.some((n) => !n.corrected || !n.sorted) && 
		!sortedRowIds
	)
);

export const createCorrectCountSelector = (rowId) => createSelector(
	userRowSelector(rowId),
	(row) => correctCount(row.numbers)
);
