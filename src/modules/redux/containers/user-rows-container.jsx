import React from "react";
import { useSelector } from 'react-redux';
import { selectHasUserRows } from "../store/slices/user-rows/selectors";
import { FetchUserRowsBtn } from '../components/user-rows/fetch-user-rows-btn';
import { UserRows } from "../components/user-rows/user-rows";

export const UserRowsContainer = () => {
	const hasUserRows = useSelector(selectHasUserRows);

	if (!hasUserRows) {
		return (<FetchUserRowsBtn />);
	}

	return (
		<div className="user-rows-wrapper">
			<UserRows />
		</div>
	);
};

