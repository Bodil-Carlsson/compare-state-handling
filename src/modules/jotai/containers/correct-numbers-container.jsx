import { useAtom } from "jotai";
import React from "react";
import { correctionStatusAtom } from "../atoms/correct-numbers";
import { StartCorrectionBtn } from "../components/start-correction-btn/start-correction-btn";
import { CorrectNumbers } from "../components/correct-numbers/correct-numbers";
import { correctionStatus } from "../constants";

export const CorrectNumbersContainer = () => {
	const [status] = useAtom(correctionStatusAtom);

	if (status === correctionStatus.readyToStart) {
		return (
			<StartCorrectionBtn />
		);
	}

	return (
		<div className="correct-numbers-wrapper">
			<CorrectNumbers />
		</div>
	);
};
