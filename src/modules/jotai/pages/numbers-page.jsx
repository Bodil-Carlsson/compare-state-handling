import './numbers-page.less';
import React from "react";
import { UserRowsContainer } from '../containers/user-rows-container';
import { CorrectNumbersContainer } from '../containers/correct-numbers-container';
import { HiddenNumbers } from '../components/hidden-numbers/hidden-numbers';
import { useNumbersCorrection } from '../hooks/use-numbers-correction';

const NumbersCorrection = () => {
	useNumbersCorrection();
	return null;
};

export const NumbersPage = () => {
	return (
		<div className="numbers-page">
			<CorrectNumbersContainer />
			<UserRowsContainer />
			<div className="hidden-numbers-wrapper">
				<HiddenNumbers />
			</div>
			<NumbersCorrection />
		</div>
	);
}