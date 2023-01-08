import React from "react";
import { useSelector } from 'react-redux';
import { correctionStatus as constants } from "../constants";
import { selectCorrectionStatus } from "../store/slices/correct-numbers/selectors";
import { StartCorrectionBtn } from '../components/correct-numbers/start-correction-btn';
import { VisibleNumbers } from "../components/correct-numbers/visible-numbers";
import { HiddenNumbers } from "../components/correct-numbers/hidden-numbers";


export const CorrectNumbersContainer = () => {
	const correctionStatus = useSelector(selectCorrectionStatus);

	if (correctionStatus === constants.readyToStart) {
		return (<StartCorrectionBtn />);
	}

	if (correctionStatus >= constants.starting) {
		return (
			<>
				<div className="correct-numbers-wrapper">
					<VisibleNumbers />
				</div>
				<div className="hidden-numbers-wrapper">
					<HiddenNumbers />
				</div>
			</>
		);
	}

	return null;
};

