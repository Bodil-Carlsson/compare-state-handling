import { atom } from "jotai";
import { selectAtom } from "jotai/utils";
import socketclient from "socket.io-client";
import { correctNumberStatus, correctionStatus } from "../constants";

let socket;
const correctionSocket = () => socket ?? (socket = socketclient.io());

const updateCorrectNumberStatus = (numbers, value, status) => {
	console.log('updateCorrectNumberStatus', numbers, value, status);
	return numbers.map((n) => n.value === value ? ({ ...n, status }) : n);
};

const numbersAtom = atom([]);
numbersAtom.debugLabel = 'numbersAtom';

// Correction atoms

export const correctionStatusAtom = atom(correctionStatus.initial);
correctionStatusAtom.debugLabel = 'correctionStatusAtom';

export const startCorrectionAtom = atom(
	null,
	(get, set) => correctionSocket()
		.on('numbers:start', () => set(correctionStatusAtom, correctionStatus.started))
		.on('numbers:number', ({ number }) => set(numbersAtom, [...get(numbersAtom), { value: number, status: correctNumberStatus.received }]))
		.on('numbers:done', () => {
			set(correctionStatusAtom, correctionStatus.completed);
			socket.disconnect();
		})
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
	(get) => get(numbersAtom).filter((n) => n.status === correctNumberStatus.waiting),
	(get, set, value) => set(numbersAtom, updateCorrectNumberStatus(get(numbersAtom), value, correctNumberStatus.waiting))
);
waitingNumbersAtom.debugLabel = 'waitingNumbersAtom';

export const animatingNumberAtom = atom(
	(get) => get(numbersAtom).find((n) => n.status === correctNumberStatus.animating),
	(get, set, value) => set(numbersAtom, updateCorrectNumberStatus(get(numbersAtom), value, correctNumberStatus.animating))
);
animatingNumberAtom.debugLabel = 'animatingNumberAtom';

export const correctingNumberAtom = atom(
	(get) => get(numbersAtom).find((n) => n.status === correctNumberStatus.correcting),
	(get, set, value) => set(numbersAtom, updateCorrectNumberStatus(get(numbersAtom), value, correctNumberStatus.correcting))
);
correctingNumberAtom.debugLabel = 'correctingNumberAtom';

export const correctedNumberAtom = atom(
	null,
	(get, set, value) => set(numbersAtom, updateCorrectNumberStatus(get(numbersAtom), value, correctNumberStatus.corrected))
);
correctedNumberAtom.debugLabel = 'correctedNumberAtom';

export const selectCorrectNumberStatusAtom = (value) => {
	console.log('selectCorrectNumberStatusAtom', value);
	const selectStatusAtom =  selectAtom(numbersAtom, (numbers) => numbers.find((n) => n.value === value).status);
	selectStatusAtom.debugLabel = 'selectStatusAtom';
	return selectStatusAtom;
};
