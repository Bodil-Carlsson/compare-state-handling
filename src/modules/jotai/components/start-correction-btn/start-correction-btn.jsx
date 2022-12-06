import React, { useLayoutEffect, useRef } from "react";
import { Button } from "../../../../components/button/button";
import { fadeIn } from "./animations";

export const StartCorrectionBtn = () => {
	const ref = useRef();

	useLayoutEffect(() => {
		fadeIn({ el: ref.current });
	}, []);

	return (
		<Button
			ref={ref} 
			className='start-correction-btn' 
			onClick={() => console.log('todo')}
		>
			Start
		</Button>
	);
};