import './numbers-page.less';
import socketclient from "socket.io-client";
import React, { useState, useEffect, useCallback, Suspense } from "react";
import { useAtom } from 'jotai';
import { CorrectNumbers } from "../components/correct-numbers/correct-numbers";
import { HiddenNumbers } from "../components/hidden-numbers/hidden-numbers";
import { UserRows } from "../components/user-rows/user-rows";
import { startCorrectionAtom } from '../atoms/correct-numbers';
import { fetchRowsAtom } from '../atoms/user-rows';
import { FetchUserRowsBtn } from '../components/fetch-user-rows-btn/fetch-user-rows-btn';
import { StartCorrectionBtn } from '../components/start-correction-btn/start-correction-btn';


export const NumbersPage = () => {
	const [rowsFetched] = useAtom(fetchRowsAtom);
	const [correctionStarted, startCorrection] = useAtom(startCorrectionAtom);
	const [showFetchRowsBtn, setShowFetchRowsBtn] = useState(true);
	const fetchRowsBtnClickCb = useCallback(() => setShowFetchRowsBtn(false), []);

	useEffect(() => {
		if (!showFetchRowsBtn && !correctionStarted) {
			startCorrection();
		}
	}, [correctionStarted, showFetchRowsBtn, startCorrection]);



	return (
		<div className="numbers-page">
			{showFetchRowsBtn && <FetchUserRowsBtn clickCb={fetchRowsBtnClickCb} />}
			<div className="correct-numbers-wrapper">
				<CorrectNumbers />
			</div>
			{!showFetchRowsBtn && (
				<Suspense fallback="Loading rows..." >
					{/*<StartCorrectionBtn />*/}
					<div className="user-rows-wrapper">
						<UserRows />
					</div>
				</Suspense>	
			)}
			
			<div className="hidden-numbers-wrapper">
				<HiddenNumbers />
			</div>
		</div>
	);
}