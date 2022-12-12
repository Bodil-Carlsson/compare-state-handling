import React from "react";
import { Suspense, useState } from "react";
import { UserRows } from "../components/user-rows/user-rows";
import { FetchUserRowsBtn } from "../components/fetch-user-rows-btn/fetch-user-rows-btn";

export const UserRowsContainer = () => {
	const [showFetchBtn, setShowFetchBtn] = useState(true);

	if (showFetchBtn) {
		return (
			<FetchUserRowsBtn onClick={() => setShowFetchBtn(false)} />
		);
	}

	return (
		<Suspense fallback={<p className='loading-rows'>Loading rows...</p>}>
			<div className="user-rows-wrapper">
				<UserRows />
			</div>
		</Suspense>
	);
};
