import { useUpdateAtom } from "jotai/utils";
import React, { useLayoutEffect, useRef } from "react";
import { useCallback } from "react";
import { Button } from "../../../../components/button/button";
import { startCorrectionAtom, correctionStatusAtom } from "../../atoms/correct-numbers";
import { correctionStatus } from "../../constants";
import { fadeIn } from "./animations";

export const StartCorrectionBtn = () => {
	const ref = useRef();
	const tlRef = useRef();
	const startCorrection = useUpdateAtom(startCorrectionAtom);
	const setCorrectionStatus = useUpdateAtom(correctionStatusAtom);

	useLayoutEffect(() => {
		tlRef.current = fadeIn({ el: ref.current });
	}, []);

	const startCorrectionClick = useCallback(() => {
		startCorrection(true);
		tlRef.current.reverse().then(setCorrectionStatus(correctionStatus.starting));
	}, [startCorrection, setCorrectionStatus]);

	return (
		<Button
			ref={ref} 
			className='start-correction-btn' 
			onClick={startCorrectionClick}
		>
			Start
		</Button>
	);
};