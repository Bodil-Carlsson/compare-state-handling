import React from "react";
import { Link } from "react-router-dom";
import { routePaths } from "../constants";

export const StartPage = () => (
	<div>
		<h1>Start</h1>
		<div>
			<Link to={routePaths.numbers}>Numbers</Link>
		</div>
	</div>
);
