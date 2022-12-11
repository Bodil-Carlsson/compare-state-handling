import React from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routePaths } from "./constants";
import { NumbersPage } from "./pages/numbers-page";
import { StartPage } from "./pages/start-page";
import { Provider } from 'jotai';
import { useAtomsDebugValue } from 'jotai/devtools'

const DebugAtoms = () => {
  useAtomsDebugValue();
  return null;
}

ReactDOM.render(
	<React.StrictMode>
		<Provider>
			<DebugAtoms />
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