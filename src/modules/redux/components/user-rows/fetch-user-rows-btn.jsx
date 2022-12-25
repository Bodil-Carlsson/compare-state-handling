import React, { useLayoutEffect, useRef, useCallback } from "react";
import { useDispatch } from "react-redux";
import { Button } from "../../../../components/button/button";
import { fetchUserRows } from "../../store/thunks/fetch-user-rows";

export const FetchUserRowsBtn = () => {
	const dispatch = useDispatch();
	const ref = useRef();

	useLayoutEffect(() => {
		ref.current.show();
	}, []);

	const handleClickFetchUserRows = useCallback(() => {
		ref.current.hide({
			onStart: () => dispatch(fetchUserRows())
		});
	}, [dispatch]);

	return (
		<Button
			ref={ref} 
			className='fetch-user-rows-btn' 
			onClick={handleClickFetchUserRows}
		>
			Get rows
		</Button>
	);
};