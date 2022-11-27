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
	],
	userRows: [
		{
			id: 0,
			numbers: [
				{ value: 1, isCorrect: true },
				{ value: 2, isCorrect: true },
				{ value: 3, isCorrect: true },
				{ value: 4, isCorrect: true },
				{ value: 5, isCorrect: true },
				{ value: 16, isCorrect: false },
				{ value: 17, isCorrect: false },
				{ value: 18, isCorrect: false },
				{ value: 19, isCorrect: false },
				{ value: 20, isCorrect: false }
			]
		},
		{
			id: 1,
			numbers: [
				{ value: 6, isCorrect: true },
				{ value: 7, isCorrect: true },
				{ value: 8, isCorrect: true },
				{ value: 9, isCorrect: true },
				{ value: 10, isCorrect: true },
				{ value: 26, isCorrect: false },
				{ value: 27, isCorrect: false },
				{ value: 28, isCorrect: false },
				{ value: 29, isCorrect: false },
				{ value: 30, isCorrect: false }
			]
		}
	]
};

export const NumbersPage = () => (
	<div className="content-width">
		<CorrectNumbers numbers={mockState.numbers.filter(({ status }) => status === correctNumberStatus.show)}/>
		<div className="flex space-between">
			<UserRows rows={mockState.userRows}/>
			<HiddenNumbers numbers={mockState.numbers.filter(({ status }) => status === correctNumberStatus.hide)}/>
		</div>
	</div>
);
