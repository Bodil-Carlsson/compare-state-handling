import './numbers-page.less';
import React from "react";
import { CorrectNumbers } from "../components/correct-numbers/correct-numbers";
import { HiddenNumbers } from "../components/hidden-numbers/hidden-numbers";
import { UserRows } from "../components/user-rows/user-rows";

export const NumbersPage = () => (
	<div className="numbers-page">
		<div className="correct-numbers-wrapper">
			<CorrectNumbers />
		</div>
		<div className="user-rows-wrapper">
			<UserRows />
		</div>
		<div className="hidden-numbers-wrapper">
			<HiddenNumbers />
		</div>
	</div>
);
