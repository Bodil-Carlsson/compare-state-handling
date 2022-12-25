import React from "react";
import { useSelector } from 'react-redux';
import { StartCorrectionBtn } from '../components/correct-numbers/start-correction-btn';
import { CorrectNumbers } from "../components/correct-numbers/visible-numbers";
import { HiddenNumbers } from "../components/correct-numbers/hidden-numbers";
import { selectCorrectionStarted } from '../store/slices/correct-numbers/selectors';

export const CorrectNumbersContainer = () => {
	const userRowsFetched = useSelector((state) => state.userRows.rows.length > 0);
	const correctionStarted = useSelector(selectCorrectionStarted);
	const showStartBtn = userRowsFetched && !correctionStarted;

	if (showStartBtn) return (<StartCorrectionBtn />);

	return (
		<>
			<div className="correct-numbers-wrapper">
				<CorrectNumbers />
			</div>
			<div className="hidden-numbers-wrapper">
				<HiddenNumbers />
			</div>
		</>
	);
};

