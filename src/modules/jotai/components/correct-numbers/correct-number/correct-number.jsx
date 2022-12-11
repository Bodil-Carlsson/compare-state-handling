import "./correct-number.less";
import React, { useLayoutEffect, useRef } from "react";
import { useUpdateAtom } from 'jotai/utils';
import { correctNumberStatus } from "../../../constants";
import { show } from "./animations";
import { correctNumberWaitingAtom, correctNumberCorrectingAtom } from '../../../atoms/correct-numbers';

export const CorrectNumber = ({ value, status }) => {
	const ref = useRef();
	const updateToCorrecting = useUpdateAtom(correctNumberCorrectingAtom);

	useLayoutEffect(() => {
		if (status === correctNumberStatus.animating) {
			show({
				el: ref.current,
				number: value,
				onComplete: () => updateToCorrecting(value)
			})
		}
	}, [status, value, updateToCorrecting]);

	return (
		<li ref={ref} className="correct-number">
			{value}
		</li>
	);
};
