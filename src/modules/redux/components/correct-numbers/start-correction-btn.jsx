import React, { useLayoutEffect, useRef, useCallback } from "react";
import { useDispatch } from "react-redux";
import { Button } from "../../../../components/button/button";
import { startCorrection } from "../../store/slices/correct-numbers/actions";

export const StartCorrectionBtn = () => {
	const dispatch = useDispatch();
	const ref = useRef();

	useLayoutEffect(() => {
		ref.current.show();
	}, []);

	const handleClickStartCorrection = useCallback(() => {
		ref.current.hide({
			onStart: () => dispatch(startCorrection())
		});
	}, [dispatch]);

	return (
		<Button
			ref={ref} 
			className='start-correction-btn' 
			onClick={handleClickStartCorrection}
		>
			Start
		</Button>
	);
};