import { useAtomValue } from "jotai";
import { useUpdateAtom } from "jotai/utils";
import { useEffect } from "react";
import { 
	waitingNumbersAtom, 
	animatingNumberAtom, 
	correctingNumberAtom,
	correctNumberAnimatingAtom,
	correctNumberCorrectedAtom
} from "../atoms/correct-numbers";

export const useNumbersCorrection = () => {
	const waitingNumbers = useAtomValue(waitingNumbersAtom);
	const animatingNumber = useAtomValue(animatingNumberAtom);
	const correctingNumber = useAtomValue(correctingNumberAtom);
	const setCorrectNumberAnimating = useUpdateAtom(correctNumberAnimatingAtom);
	const setCorrectNumberCorrected = useUpdateAtom(correctNumberCorrectedAtom);

	useEffect(() => {
		// TODO: replace with check for when rows are ready
		if (!correctingNumber) return;
		setCorrectNumberCorrected(correctingNumber.value);
	}, [correctingNumber, setCorrectNumberCorrected]);

	useEffect(() => {
		if (animatingNumber) return;
		if (correctingNumber) return;
		if (!waitingNumbers.length) return;
		setCorrectNumberAnimating(waitingNumbers[0].value);
	}, [animatingNumber, correctingNumber, setCorrectNumberAnimating, waitingNumbers]);
};
