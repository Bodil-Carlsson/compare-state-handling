import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "../../../../components/button/button";
import { fetchUserRows } from "../../store/thunks/fetch-user-rows";

export const FetchUserRowsBtn = () => {
	const dispatch = useDispatch();
	console.log('render FetchUserRowsBtn');
	return (
		<Button
			className='fetch-user-rows-btn' 
			onClick={() => dispatch(fetchUserRows())}
		>
			Get rows
		</Button>
	);
};