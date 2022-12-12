import "./correct-number.less";
import React, { useLayoutEffect, useRef, useMemo } from "react";
import { useAtom } from "jotai";
import { useUpdateAtom } from 'jotai/utils';
import { correctNumberStatus } from "../../../constants";
import { show } from "./animations";
import { selectCorrectNumberStatusAtom, correctNumberCorrectingAtom } from '../../../atoms/correct-numbers';

export const CorrectNumber = ({ value }) => {
	const numberStatusAtom = useMemo(() => selectCorrectNumberStatusAtom(value), [value]);
	const [status] = useAtom(numberStatusAtom);
	const updateToCorrecting = useUpdateAtom(correctNumberCorrectingAtom);
	const ref = useRef();

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
