import React, { useCallback } from "react";
import { useAtom } from 'jotai';
import { Button } from "../../../../components/button/button";
import { rowsFetchingAtom } from "../../atoms/atoms"; 
import { fetchRowsAtom } from "../../atoms/async-atoms"; 

export const FetchUserRowsBtn = () => {
	const [rows, fetchRows] = useAtom(fetchRowsAtom);
	const [rowsFetching, setRowsFetching] = useAtom(rowsFetchingAtom);
	const handleButtonClick = useCallback(() => {
		console.log('fetchRows ', rowsFetching)
		if (!rowsFetching) {
			setRowsFetching(true);
			fetchRows();
		}
	}, [fetchRows, rowsFetching, setRowsFetching]);
	return (
		<Button
			className='fetch-user-rows-btn' 
			onClick={handleButtonClick}
		>
			{rowsFetching ? 'Loading rows...' : 'Get rows'}
		</Button>
	);
};