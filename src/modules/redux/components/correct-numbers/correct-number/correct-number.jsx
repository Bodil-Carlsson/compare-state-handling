import "./correct-number.less";
import React, { useLayoutEffect, useRef } from "react";
import { show } from './animations';
import { correctNumberStatus } from "../../../constants";
import { useDispatch } from "react-redux";
import { setNumberToCorrect } from "../../../store/slices/user-rows/actions";

export const CorrectNumber = ({ value, status }) => {
	const ref = useRef();
	const dispatch = useDispatch();
	useLayoutEffect(() => {
		if (status === correctNumberStatus.correcting) {
			show({
				el: ref.current,
				number: value,
				onComplete: () => dispatch(setNumberToCorrect(value))
			})
		}
	}, [status, value, dispatch]);

	return (
		<li ref={ref} className="correct-number">
			{value}
		</li>
	);
};
