import React from "react";
import { CorrectNumbers } from "../components/correct-numbers/correct-numbers";
import { HiddenNumbers } from "../components/hidden-numbers/hidden-numbers";
import { UserRows } from "../components/user-rows/user-rows";
import { correctNumberStatus } from "../constants";

const mockState = {
	numbers: [
		{ value: 1, status: correctNumberStatus.show },
		{ value: 2, status: correctNumberStatus.show },
		{ value: 3, status: correctNumberStatus.show },
		{ value: 4, status: correctNumberStatus.show },
		{ value: 5, status: correctNumberStatus.show },
		{ value: 6, status: correctNumberStatus.hide },
		{ value: 7, status: correctNumberStatus.hide },
		{ value: 8, status: correctNumberStatus.hide },
		{ value: 9, status: correctNumberStatus.hide },
		{ value: 10, status: correctNumberStatus.hide }
	]
};

export const NumbersPage = () => (
	<div className="content-width">
		<CorrectNumbers numbers={mockState.numbers.filter(({ status }) => status === correctNumberStatus.show)}/>
		<div className="flex space-between">
			<UserRows />
			<HiddenNumbers numbers={mockState.numbers.filter(({ status }) => status === correctNumberStatus.hide)}/>
		</div>
	</div>
);
