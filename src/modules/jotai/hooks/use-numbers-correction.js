import { useAtom, useAtomValue } from "jotai";
import { useUpdateAtom } from "jotai/utils";
import { useEffect } from "react";
import { 
	waitingNumbersAtom, 
	animatingNumberAtom, 
	correctingNumberAtom,
	correctedNumberAtom
} from "../atoms/correct-numbers";
import { updateUserNumberStatusAtom, userRowIdsAtom, userRowsToCorrectAtom } from "../atoms/user-rows";
import { userNumberStatus } from "../constants";

export const useNumbersCorrection = () => {
	const waitingNumbers = useAtomValue(waitingNumbersAtom);
	const [animatingNumber, setAnimatingNumber] = useAtom(animatingNumberAtom);
	const correctingNumber = useAtomValue(correctingNumberAtom);
	const setNumberCorrected = useUpdateAtom(correctedNumberAtom);
	const rowsToCorrect = useAtomValue(userRowsToCorrectAtom);
	const setUserNumberStatus = useUpdateAtom(updateUserNumberStatusAtom);

	useEffect(() => { 
		console.log('rowsToCorrect', rowsToCorrect);
		if (rowsToCorrect.length) { 
			const number = rowsToCorrect[0].numbers.find((n) => n.value === correctingNumber.value);
			if (number.status < userNumberStatus.correcting) {
				setUserNumberStatus({ rowId: rowsToCorrect[0].id, value: number.value, status: userNumberStatus.correcting })
			}
		}
	}, [correctingNumber, rowsToCorrect, setUserNumberStatus]);

	useEffect(() => {
		// TODO: replace with check for when rows are ready
		if (rowsToCorrect.length) return;
		if (!correctingNumber) return;
		setNumberCorrected(correctingNumber.value);
	}, [correctingNumber, rowsToCorrect, setNumberCorrected]);

	useEffect(() => {
		if (animatingNumber) return;
		if (correctingNumber) return;
		if (!waitingNumbers.length) return;
		setAnimatingNumber(waitingNumbers[0].value);
	}, [animatingNumber, correctingNumber, setAnimatingNumber, waitingNumbers]);
};
