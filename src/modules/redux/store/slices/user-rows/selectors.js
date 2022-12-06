import { createSelector } from 'reselect';
import { userNumberStatus } from '../../../constants';

export const selectRowIds = (state) => state.userRows.rowIds;
export const selectSortedIds = (state) => state.userRows.sortedIds;
export const selectRows = (state) => state.userRows.rows;
export const selectIsSorting = (state) => state.userRows.isSorting;
export const selectUserRowNumbers = (state, rowId) => state.userRows.rows[rowId].numbers;
export const selectUserRowIsSorting = (state, rowId) => state.userRows.rows[rowId].isSorting;

export const createSelectUserRowCorrectCount = () => createSelector(
	selectUserRowNumbers,
	(numbers) => numbers.filter(({ status }) => status >= userNumberStatus.corrected).length
);

export const createSelectUserNumberStatus = () => createSelector(
	selectUserRowNumbers,
	(state, rowId, number) => number,
	(numbers, number) => numbers.find((n) => n.value === number)?.status
);