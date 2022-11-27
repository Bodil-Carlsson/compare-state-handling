import React from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routePaths } from "./constants";
import { NumbersPage } from "./pages/numbers-page";
import { StartPage } from "./pages/start-page";

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route 
					path={routePaths.base}
					element={<StartPage />} 
				/>
				<Route 
					path={routePaths.numbers}
					element={<NumbersPage />} 
				/>
			</Routes>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('contentRoot')
);