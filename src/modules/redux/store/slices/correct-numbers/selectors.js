import { createSelector } from "reselect";
import { correctNumberStatus } from "../../../constants";

const arraysAreSameLength = (arr1, arr2) => arr1?.length === arr2?.length;

const selectCorrectNumbersSlice = createSelector(
	(state) => state.correctNumbers,
	(correctNumbers) => correctNumbers
);

const selectCorrectNumbers = createSelector(
	selectCorrectNumbersSlice,
	(correctNumbers) => correctNumbers.numbers
);

const selectNumberToCorrect = createSelector(
	selectCorrectNumbers,
	(numbers) => numbers.find((n) => n.status > correctNumberStatus.received && n.status < correctNumberStatus.corrected)?.value
);

export const selectCorrectionStatus = createSelector(
	selectCorrectNumbersSlice,
	(correctNumbers) => correctNumbers.correctionStatus
);

export const selectHiddenNumbers = createSelector(
	selectCorrectNumbers,
	(numbers) => numbers.filter((n) => n.status <= correctNumberStatus.animating),
	{
		memoizeOptions: {
			resultEqualityCheck: arraysAreSameLength
    }
	}
);

export const selectVisibleNumbers = createSelector(
	selectCorrectNumbers,
	(numbers) => numbers.filter((n) => n.status >= correctNumberStatus.animating),
	{
		memoizeOptions: {
			resultEqualityCheck: arraysAreSameLength
    }
	}
);

export const createCorrectNumberStatusSelector = (numberValue) => createSelector(
	selectCorrectNumbers,
	(numbers) => numbers.find((n) => n.value === numberValue)?.status
);
0
export const createIsNumberToCorrectSelector = (value) => createSelector(
	selectNumberToCorrect,
	(numberToCorrect) => numberToCorrect === value
);



