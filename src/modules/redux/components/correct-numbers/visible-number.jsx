import React, { useLayoutEffect, useRef, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { correctNumberAnimations as animations, correctNumberStatus } from "../../constants";
import { startCorrectingNumber } from "../../store/slices/correct-numbers/actions";
import { createSelectCorrectNumberStatus } from "../../store/slices/correct-numbers/selectors";

export const CorrectNumber = ({ value }) => {
	const selectCorrectNumberStatus = useMemo(createSelectCorrectNumberStatus, []);
	const status = useSelector((state) => selectCorrectNumberStatus(state, value));
	const dispatch = useDispatch();
	const ref = useRef();

	useLayoutEffect(() => {
		if (status === correctNumberStatus.animating) {
			animations.show({
				el: ref.current,
				number: value,
				onComplete: () => dispatch(startCorrectingNumber(value))
			})
		}
	}, [status, value, dispatch]);

	return (
		<li ref={ref} className="correct-number">
			{value}
		</li>
	);
};
