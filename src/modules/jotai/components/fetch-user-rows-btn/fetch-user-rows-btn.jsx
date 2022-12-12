import React, { useCallback, useRef } from "react";
import { useUpdateAtom } from 'jotai/utils';
import { Button } from "../../../../components/button/button";
import { fetchUserRowsAtom } from "../../atoms/user-rows"; 
import { fadeOut } from "./animations";

export const FetchUserRowsBtn = ({ onClick }) => {
	const ref = useRef();
	const fetchRows = useUpdateAtom(fetchUserRowsAtom);
	const handleButtonClick = useCallback(
		() => fadeOut({ 
			el: ref.current, 
			onStart: fetchRows, 
			onComplete: onClick
		}), 
		[fetchRows, onClick]
	);

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