import React, { useLayoutEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Button } from "../../../../components/button/button";
import { fadeIn } from "./animations";
import { startCorrection } from "../../store/slices/correct-numbers/actions";

export const StartCorrectionBtn = () => {
	const dispatch = useDispatch();
	const ref = useRef();

	useLayoutEffect(() => {
		fadeIn({ el: ref.current });
	}, []);

	return (
		<Button
			ref={ref} 
			className='start-correction-btn' 
			onClick={() => dispatch(startCorrection())}
		>
			Start
		</Button>
	);
};