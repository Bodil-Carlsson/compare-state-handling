import {
	CORRECT_NUMBER_RECEIVED,
	CORRECT_NUMBER_WAITING,
	CORRECT_NUMBER_ANIMATING,
	CORRECT_NUMBER_CORRECTING,
	CORRECT_NUMBER_CORRECTED,
	CORRECTION_READY_TO_START,
	CORRECTION_STARTING,
	CORRECTION_STARTED,
	CORRECTION_ALL_NUMBERS_RECEIVED,
	CORRECTION_COMPLETED
} from './action-types';

export const correctNumberReceived = (numberValue) => ({ type: CORRECT_NUMBER_RECEIVED, numberValue });
export const correctNumberWaiting = (numberValue) => ({ type: CORRECT_NUMBER_WAITING, numberValue });
export const correctNumberAnimating = (numberValue) => ({ type: CORRECT_NUMBER_ANIMATING, numberValue });
export const correctNumberCorrecting = (numberValue) => ({ type: CORRECT_NUMBER_CORRECTING, numberValue });
export const correctNumberCorrected = () => ({ type: CORRECT_NUMBER_CORRECTED });
export const correctionReadyToStart = () => ({ type: CORRECTION_READY_TO_START });
export const correctionStarting = () => ({ type: CORRECTION_STARTING });
export const correctionStarted = () => ({ type: CORRECTION_STARTED });
export const correctionAllNumersReceived = () => ({ type: CORRECTION_ALL_NUMBERS_RECEIVED });
export const correctionCompleted = () => ({ type: CORRECTION_COMPLETED });

export default {
	correctNumberReceived,
	correctNumberWaiting,
	correctNumberAnimating,
	correctNumberCorrecting,
	correctNumberCorrected,
	correctionReadyToStart,
	correctionStarting,
	correctionStarted,
	correctionAllNumersReceived,
	correctionCompleted
};
