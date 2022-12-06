import { atom } from 'jotai';
import { selectAtom } from "jotai/utils";
import { correctNumberStatus } from '../constants';

export const rowsAtom = atom([]);
export const rowsFetchingAtom = atom(false);
export const startCorrection = atom(false);
const correctNumbersInternalAtom = atom([
	atom({ value: 1, status: correctNumberStatus.corrected }),
	atom({ value: 2, status: correctNumberStatus.corrected }),
	atom({ value: 3, status: correctNumberStatus.corrected }),
	atom({ value: 4, status: correctNumberStatus.corrected }),
	atom({ value: 5, status: correctNumberStatus.corrected }),
	atom({ value: 6, status: correctNumberStatus.animating }),
	atom({ value: 7, status: correctNumberStatus.waiting }),
	atom({ value: 8, status: correctNumberStatus.waiting }),
	atom({ value: 9, status: correctNumberStatus.waiting })
]);

export const addCorrectNumberAtom = atom(
    null,
    (get, set, number) => {
        const correctNumbers = get(correctNumbersInternalAtom);
        correctNumbers.push({ value: number, status: correctNumberStatus.received });
        set(correctNumbersInternalAtom, correctNumbers);
    }
  );

export const xaddCorrectNumberAtom = atom(
    null,
    (get, set, number) => {
        const correctNumbers = get(correctNumbersInternalAtom);
        correctNumbers.push({ value: number, status: correctNumberStatus.received });
        set(correctNumbersInternalAtom, correctNumbers);
    }
    );
 
export const correctNumbersAtom = selectAtom(correctNumbersInternalAtom, (correctNumbers) => {
	console.log('I want to see this one', correctNumbers[0]);
	return correctNumbers.filter(({ status }) => status >= correctNumberStatus.animating);
});
export const hiddenNumbersAtom = selectAtom(correctNumbersInternalAtom, (correctNumbers) => correctNumbers.filter(({ status }) => status < correctNumberStatus.animating));

// const updateCorrectNumber = (numbers, number, status) => [...numbers].map((n) => n.value === number ? ({ ...n, status }) : n);

// add number
// read numbers, filtered by status

// update status
// read number
// read status

/*
	received,
	waiting,
	animating,
	correcting,
	corrected
*/