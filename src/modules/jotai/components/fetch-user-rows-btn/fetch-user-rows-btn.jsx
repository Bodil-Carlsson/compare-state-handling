import React, { useCallback, useRef } from "react";
import { useAtom } from 'jotai';
import { Button } from "../../../../components/button/button";
import { fetchRowsAtom } from "../../atoms/user-rows"; 
import { fadeOut } from "./animations";

export const FetchUserRowsBtn = ({ clickCb }) => {
	const ref = useRef();
	const handleButtonClick = useCallback(() => fadeOut({ el: ref.current, onComplete: clickCb }), [clickCb]);
	return (
		<Button
			ref={ref}
			className='fetch-user-rows-btn' 
			onClick={handleButtonClick}
		>
			{'Get rows'}
		</Button>
	);
};