import React from "react";
import { useSelector } from 'react-redux';
import { FetchUserRowsBtn } from '../components/user-rows/fetch-user-rows-btn';
import { UserRows } from "../components/user-rows/user-rows";

export const UserRowsContainer = () => {
	const userRowsFetched = useSelector((state) => state.userRows.rows.length > 0);

	if (!userRowsFetched) return (<FetchUserRowsBtn />);

	return (
		<div className="user-rows-wrapper">
			<UserRows />
		</div>
	);
};

