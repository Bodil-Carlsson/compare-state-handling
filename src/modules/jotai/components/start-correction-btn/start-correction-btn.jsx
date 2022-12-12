import { useUpdateAtom } from "jotai/utils";
import React, { useLayoutEffect, useRef } from "react";
import { useCallback } from "react";
import { Button } from "../../../../components/button/button";
import { startCorrectionAtom } from "../../atoms/correct-numbers";
import { fadeIn } from "./animations";

export const StartCorrectionBtn = ({ onClick }) => {
	const ref = useRef();
	const tlRef = useRef();
	const startCorrection = useUpdateAtom(startCorrectionAtom);

	useLayoutEffect(() => {
		tlRef.current = fadeIn({ el: ref.current });
	}, []);

	const startCorrectionClick = useCallback(() => {
		startCorrection(true);
		tlRef.current.reverse().then(onClick);
	}, [startCorrection, onClick]);

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