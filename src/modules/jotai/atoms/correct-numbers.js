import { atom } from "jotai";
import { splitAtom } from "jotai/utils";
import socketclient from "socket.io-client";
import { correctNumberStatus } from "../constants";

const waitingNumbers = (numbers) => numbers.filter((n) => n.status <= correctNumberStatus.animating);
const correctedNumbers = (numbers) => numbers.filter((n) => n.status >= correctNumberStatus.animating);
const updateCorrectNumberStatus = (numbers, value, status) => {
	console.log('updateCorrectNumberStatus', numbers, value, status);
	return numbers.map((n) => n.value === value ? ({ ...n, status }) : n);
}

const correctionStartedAtom = atom(false);
const numAtom = atom([]);
const numbersAtom = atom(
	(get) => {
		return get(numAtom);
	},
	(get, set, payload) => {
		set(numAtom, payload);
	}
);

export const correctingNumberAtom = atom();
export const waitingNumbersAtom = atom(
	(get) => waitingNumbers(get(numbersAtom))
);
export const waitingNumbersAtomsAtom = splitAtom(waitingNumbersAtom);
export const correctedNumbersAtom = atom(
	(get) => correctedNumbers(get(numbersAtom))
);
export const correctedNumbersAtomsAtom = splitAtom(correctedNumbersAtom);
export const correctNumberWaitingAtom = atom(
	null,
	(get, set, value) => {
		const waiting = get(waitingNumbersAtom);
		if (waiting[0].value === value) {
			set(numbersAtom, updateCorrectNumberStatus(get(numbersAtom), value, correctNumberStatus.animating ));
		} else {
			set(numbersAtom, updateCorrectNumberStatus(get(numbersAtom), value, correctNumberStatus.waiting ));
		}
	}
);

export const correctNumberCorrectingAtom = atom(
	(get) => get(correctingNumberAtom),
	(get, set, value) => {
		set(numbersAtom, updateCorrectNumberStatus(get(numbersAtom), value, correctNumberStatus.correcting ));
		set(correctingNumberAtom, value);
	}
);

let socket; 
const startSocket = (get, set) => {
	if (socket) return;
	socket = socketclient.io();
	set(correctionStartedAtom, true);
	socket.on('numbers:done', () => socket.disconnect());
	socket.on('numbers:number', ({ number }) => {
		set(numbersAtom, [...get(numbersAtom), { value: number, status: correctNumberStatus.received }]);
	});
}


export const startCorrectionAtom = atom(
	(get) => get(correctionStartedAtom),
	startSocket
);

