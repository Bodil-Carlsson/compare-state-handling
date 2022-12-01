import './numbers-page.less';
import React, { useState, useEffect } from "react";
import { CorrectNumbers } from "../components/correct-numbers/correct-numbers";
import { HiddenNumbers } from "../components/hidden-numbers/hidden-numbers";
import { UserRows } from "../components/user-rows/user-rows";
import { fetchUserRows } from '../store/thunks/fetch-user-rows';
import { useDispatch, useSelector } from 'react-redux';
import { startCorrection } from '../store/slices/correct-numbers/actions';
import { Correction } from '../components/correction'; 

export const NumbersPage = () => {
	const [rowsFetched, setRowsFetched] = useState(false);
	const userRows = useSelector((state) => state.userRows.rows);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchUserRows());
	}, [dispatch]);

	useEffect(() => {
		if (userRows.length) {
			setRowsFetched(true);
		}
	}, [userRows]);

	useEffect(() => {
		if (rowsFetched) {
			dispatch(startCorrection());
		}
	}, [rowsFetched, dispatch]);

	return (
		<div className="numbers-page">
			<div className="correct-numbers-wrapper">
				<CorrectNumbers />
			</div>
			<div className="user-rows-wrapper">
				<UserRows />
			</div>
			<div className="hidden-numbers-wrapper">
				<HiddenNumbers />
			</div>
			<Correction />
		</div>
	);
}