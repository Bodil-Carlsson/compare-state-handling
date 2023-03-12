import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { correctionStatus as constants } from "../constants";
import { selectCorrectionStatus, selectIsAllNumbersCorrected } from "../store/slices/correct-numbers/selectors";
import { StartCorrectionBtn } from '../components/correct-numbers/start-correction-btn';
import { VisibleNumbers } from "../components/correct-numbers/visible-numbers";
import { HiddenNumbers } from "../components/correct-numbers/hidden-numbers";
import { correctionCompleted } from "../store/slices/correct-numbers/reducer";


export const CorrectNumbersContainer = () => {
	const correctionStatus = useSelector(selectCorrectionStatus);
	const isAllNumbersCorrected = useSelector(selectIsAllNumbersCorrected);
	const dispatch = useDispatch();

	useEffect(() => {
		if (correctionStatus === constants.allNumersReceived && isAllNumbersCorrected) {
			dispatch(correctionCompleted());
		}
	}, [correctionStatus, isAllNumbersCorrected, dispatch]);

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

