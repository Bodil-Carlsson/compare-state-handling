import './numbers-page.less';
import React from "react";
import { useSelector } from 'react-redux';
import { StartCorrectionBtn } from '../components/start-correction-btn/start-correction-btn';
import { FetchUserRowsBtn } from '../components/fetch-user-rows-btn/fetch-user-rows-btn';
import { CorrectNumbers } from "../components/correct-numbers/correct-numbers";
import { HiddenNumbers } from "../components/hidden-numbers/hidden-numbers";
import { UserRows } from "../components/user-rows/user-rows";
import { selectCorrectionStarted } from '../store/slices/correct-numbers/selectors';

export const NumbersPage = () => {
	const userRowsFetched = useSelector((state) => state.userRows.rows.length > 0);
	const correctionStarted = useSelector(selectCorrectionStarted);
	const showStartBtn = userRowsFetched && !correctionStarted;

	return (
		<div className="numbers-page">
			<div className="correct-numbers-wrapper">
				<CorrectNumbers />
			</div>
			{showStartBtn && <StartCorrectionBtn />}
			<div className="user-rows-wrapper">
				{userRowsFetched && <UserRows />}
			</div>
			{!userRowsFetched && <FetchUserRowsBtn />}
			<div className="hidden-numbers-wrapper">
				<HiddenNumbers />
			</div>
		</div>
	);
};

