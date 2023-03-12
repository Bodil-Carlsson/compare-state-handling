import React, { useLayoutEffect, useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from "../../../../components/button/button";
import { correctionStarting } from "../../store/slices/correct-numbers/reducer";

export const StartCorrectionBtn = () => {
	const ref = useRef();
	const dispatch = useDispatch();

	useLayoutEffect(() => {
		ref.current.show();
	}, []);

	const handleClickStartCorrection = useCallback(() => {
		ref.current.hide({
			onStart: () => dispatch(correctionStarting())
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