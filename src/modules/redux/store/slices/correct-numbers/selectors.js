import { createSelector } from 'reselect';
import { correctNumberStatus } from '../../../constants';

const selectNumbers = (state) => state.correctNumbers.numbers;

export const selectCorrectionStarted = (state) => state.correctNumbers.correctionStarted;

export const selectNumberToCorrect = (state) => state.correctNumbers.numbers.find((n) => n.status === correctNumberStatus.correcting);

export const selectVisibleNumbers = createSelector(
	selectNumbers,
	(numbers) => numbers.filter((n) => n.status > correctNumberStatus.waiting)
);

export const selectHiddenNumbers = createSelector(
	selectNumbers,
	(numbers) => numbers.filter((n) => n.status < correctNumberStatus.correcting)
);

export const createSelectCorrectNumberStatus = () => createSelector(
	selectNumbers,
	(state, number) => number,
	(numbers, number) => numbers.find((n) => n.value === number)?.status
);