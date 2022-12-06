import actionTypes from "./action-types";

export const startCorrection = () => ({ type: actionTypes.startCorrection });
export const correctNumberReceived = (number) => ({ type: actionTypes.correctNumberReceived, number });
export const correctNumberWaiting = (number) => ({ type: actionTypes.correctNumberWaiting, number });
export const showCorrectNumber = (number) => ({ type: actionTypes.showCorrectNumber, number });
export const startCorrectingNumber = (number) => ({ type: actionTypes.startCorrectingNumber, number });
export const correctNumberCorrected = (number) => ({ type: actionTypes.correctNumberCorrected, number });


export default {
	startCorrection,
	correctNumberReceived,
	correctNumberWaiting,
	showCorrectNumber,
	startCorrectingNumber,
	correctNumberCorrected
};
