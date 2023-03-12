import React, { useLayoutEffect, useMemo, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { correctNumberAnimations as animations } from "../../animations";
import { correctNumberStatus } from "../../constants";
import { correctNumberCorrecting } from "../../store/slices/correct-numbers/reducer";
import { createCorrectNumberStatusSelector } from "../../store/slices/correct-numbers/selectors";

export const VisibleNumber = ({ value }) => {
	const selectStatus = useMemo(() => createCorrectNumberStatusSelector(value), [value]);
	const ref = useRef();
	const dispatch = useDispatch();
	const status = useSelector(selectStatus);

	useLayoutEffect(() => {
		if (status === correctNumberStatus.animating) {
			const tl = animations.show({ 
				el: ref.current, 
				number: value, 
				onComplete: () => dispatch(correctNumberCorrecting(value)) 
			});
			return () => tl?.revert?.();
		}
	}, [status, value, dispatch]);

	return (
		<li ref={ref} className="correct-number">
			{value}
		</li>
	);
};
