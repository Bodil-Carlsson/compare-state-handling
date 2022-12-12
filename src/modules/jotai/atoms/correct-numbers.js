import { atom } from "jotai";
import { selectAtom } from "jotai/utils";
import socketclient from "socket.io-client";
import { correctNumberStatus } from "../constants";

let socket;
const correctionSocket = () => socket ?? (socket = socketclient.io());

const updateCorrectNumberStatus = (numbers, value, status) => {
	console.log('updateCorrectNumberStatus', numbers, value, status);
	return numbers.map((n) => n.value === value ? ({ ...n, status }) : n);
};

const numbersAtom = atom([]);
numbersAtom.debugLabel = 'numbersAtom';

// Correction atoms

export const isReadyToStartCorrectionAtom = atom(false);
isReadyToStartCorrectionAtom.debugLabel = 'isReadyToStartCorrectionAtom';

export const isCorrectionStartedAtom = atom(false);
isCorrectionStartedAtom.debugLabel = 'isCorrectionStartedAtom';

export const startCorrectionAtom = atom(
	null,
	(get, set) => correctionSocket()
		.on('numbers:start', () => set(isCorrectionStartedAtom, true))
		.on('numbers:number', ({ number }) => set(numbersAtom, [...get(numbersAtom), { value: number, status: correctNumberStatus.received }]))
		.on('numbers:done', () => socket.disconnect())
);
startCorrectionAtom.debugLabel = 'startCorrectionAtom';

// Derived from numbersAtom

export const hiddenNumbersAtom = atom(
	(get) => get(numbersAtom).filter((n) => n.status <= correctNumberStatus.animating).map((n) => n.value)
);
hiddenNumbersAtom.debugLabel = 'hiddenNumbersAtom';

export const correctNumbersAtom = atom(
	(get) => get(numbersAtom).filter((n) => n.status >= correctNumberStatus.animating).map((n) => n.value)
);
correctNumbersAtom.debugLabel = 'correctNumbersAtom';

export const waitingNumbersAtom = atom(
	(get) => get(numbersAtom).filter((n) => n.status === correctNumberStatus.waiting)
);
waitingNumbersAtom.debugLabel = 'waitingNumbersAtom';

export const animatingNumberAtom = atom(
	(get) => get(numbersAtom).find((n) => n.status === correctNumberStatus.animating)
);
animatingNumberAtom.debugLabel = 'animatingNumberAtom';

export const correctingNumberAtom = atom(
	(get) => get(numbersAtom).find((n) => n.status === correctNumberStatus.correcting)
);
correctingNumberAtom.debugLabel = 'correctingNumberAtom';

export const selectCorrectNumberStatusAtom = (value) => {
	console.log('selectCorrectNumberStatusAtom', value);
	const selectStatusAtom =  selectAtom(numbersAtom, (numbers) => numbers.find((n) => n.value === value).status);
	selectStatusAtom.debugLabel = 'selectStatusAtom';
	return selectStatusAtom;
};

export const correctNumberWaitingAtom = atom(
	null,
	(get, set, value) => set(numbersAtom, updateCorrectNumberStatus(get(numbersAtom), value, correctNumberStatus.waiting))
);
correctNumberWaitingAtom.debugLabel = 'correctNumberWaitingAtom';

export const correctNumberAnimatingAtom = atom(
	null,
	(get, set, value) => set(numbersAtom, updateCorrectNumberStatus(get(numbersAtom), value, correctNumberStatus.animating))
);
correctNumberAnimatingAtom.debugLabel = 'correctNumberAnimatingAtom';

export const correctNumberCorrectingAtom = atom(
	null,
	(get, set, value) => set(numbersAtom, updateCorrectNumberStatus(get(numbersAtom), value, correctNumberStatus.correcting))
);
correctNumberCorrectingAtom.debugLabel = 'correctNumberCorrectingAtom';

export const correctNumberCorrectedAtom = atom(
	null,
	(get, set, value) => set(numbersAtom, updateCorrectNumberStatus(get(numbersAtom), value, correctNumberStatus.corrected))
);
correctNumberCorrectedAtom.debugLabel = 'correctNumberCorrectedAtom';
