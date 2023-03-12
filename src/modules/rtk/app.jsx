import React from "react";
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routePaths } from "./constants";
import store from "./store/store";
import { NumbersPage } from "./pages/numbers-page";
import { StartPage } from "./pages/start-page";

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
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