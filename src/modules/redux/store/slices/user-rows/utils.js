import { userNumberStatus } from "../../../constants";

export const getRowCorrectCount = (rowId, rows) => rows.find((r) => r.id === rowId).numbers.filter((n) => n.status === userNumberStatus.corrected).length;

export const sortNumbers = (numbers) => [...numbers].sort((a, b) => b.status - a.status);
export const sortRowIds = (rowIds, rows) => [...rowIds].sort((a, b) => getRowCorrectCount(b, rows) - getRowCorrectCount(a, rows));

const needsSorting = (curr, sorted) => {
	for (let i = 0, len = sorted.length; i < len; i++) {
		if (sorted[i] !== curr[i]) {
			return true;
		}
	}
	return false;
};
export const numbersNeedsSorting = (numbers) => needsSorting(numbers, sortNumbers(numbers));
export const rowsNeedsSorting = (rowIds, rows) => needsSorting(rowIds, sortRowIds(rowIds, rows));
