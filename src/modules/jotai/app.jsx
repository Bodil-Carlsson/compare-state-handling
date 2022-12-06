import React from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routePaths } from "./constants";
import { NumbersPage } from "./pages/numbers-page";
import { StartPage } from "./pages/start-page";
import { Provider } from 'jotai';

ReactDOM.render(
	<React.StrictMode>
		<Provider>
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
		</Provider>
	</React.StrictMode>,
	document.getElementById('contentRoot')
);