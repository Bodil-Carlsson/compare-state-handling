import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { correctNumberStatus } from "../constants";
import { startCorrectNumber } from "../store/slices/correct-numbers/actions";

export const useShowNextNumber = () => {
	const numbers = useSelector((state) => state.correctNumbers.numbers);
	const dispatch = useDispatch();

	useEffect(() => {
		if (!numbers.some((n) => n.status === correctNumberStatus.correcting)) {
			const firstHidden = numbers.findIndex((n) => n.status === correctNumberStatus.hide);
			if (firstHidden > -1) {
				dispatch(startCorrectNumber(firstHidden));
			}
		}
	}, [numbers, dispatch]);
};