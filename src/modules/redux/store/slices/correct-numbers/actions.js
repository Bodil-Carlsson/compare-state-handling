import actionTypes from "./action-types";

export const startCorrection = () => ({ type: actionTypes.startCorrection });
export const addCorrectNumber = (number) => ({ type: actionTypes.addCorrectNumber, number });
export const hideCorrectNumber = (number) => ({ type: actionTypes.hideCorrectNumber, number });
export const startCorrectNumber = (numberIndex) => ({ type: actionTypes.startCorrectNumber, numberIndex });
export const showCorrectNumber = (number) => ({ type: actionTypes.showCorrectNumber, number });

export default {
	startCorrection,
	addCorrectNumber,
	hideCorrectNumber,
	startCorrectNumber,
	showCorrectNumber
};
