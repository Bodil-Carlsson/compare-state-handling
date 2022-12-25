import './numbers-page.less';
import React from "react";
import { CorrectNumbersContainer } from '../containers/correct-numbers-container';
import { UserRowsContainer } from '../containers/user-rows-container';

export const NumbersPage = () => {
	return (
		<div className="numbers-page">
			<CorrectNumbersContainer />
			<UserRowsContainer />
		</div>
	);
};

