import { useAtom } from "jotai";
import React from "react";
import { useState } from "react";
import { isReadyToStartCorrectionAtom } from "../atoms/correct-numbers";
import { StartCorrectionBtn } from "../components/start-correction-btn/start-correction-btn";
import { CorrectNumbers } from "../components/correct-numbers/correct-numbers";

export const CorrectNumbersContainer = () => {
	const [isReadyToStart] = useAtom(isReadyToStartCorrectionAtom);
	const [showStartBtn, setShowStartBtn] = useState(true);

	if (isReadyToStart && showStartBtn) {
		return (
			<StartCorrectionBtn onClick={() => setShowStartBtn(false)} />
		);
	}

	return (
		<div className="correct-numbers-wrapper">
			<CorrectNumbers />
		</div>
	);
};
