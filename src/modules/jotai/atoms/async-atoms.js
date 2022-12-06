import { atom } from 'jotai';
import socketclient from "socket.io-client";
import { correctNumberStatus, userNumberStatus } from '../constants';
import { rowsAtom } from './atoms';

export const fetchRowsAtom = atom(
	(get) => get(rowsAtom),
	async (_get, set, url) => {
		const res = await fetch('http://localhost:3000/api/user/rows', { method: 'GET' });
		const { rows } = await res.json();
		const mappedRows = rows.map((row) => ({ 
			...row,
			numbers: row.numbers.map((number) => ({ 
				...number,
				status: userNumberStatus.initial
			}))
		}));
		set(rowsAtom, mappedRows);
	},
);

let socket;

export const startCorrection = atom(
	(get) => get(rowsAtom),
	async (_get, set, url) => {
		if (!socket) {
      socket = socketclient.io();
      socket.on('numbers:done', () => socket.disconnect());
      socket.on('numbers:number', ({ number }) => {
        
      });
    }


	},
);

/*
???
import { atomWithReducer } from 'jotai/utils';

const updateCorrectNumber = (numbers, number, status) => [...numbers].map((n) => n.value === number ? ({ ...n, status }) : n);
const correctNumbersReducer = (prev, action) => {
	switch (action.type) {
		case 'add':
			return [...prev, { value: action.number, status: correctNumberStatus.received }];
		case 'wait':
			return updateCorrectNumber(prev, action.number, correctNumberStatus.waiting);
		case 'show':
			return updateCorrectNumber(prev, action.number, correctNumberStatus.animating);
		case 'correct':
			return updateCorrectNumber(prev, action.number, correctNumberStatus.correcting);
		case 'corrected':
			return updateCorrectNumber(prev, action.number, correctNumberStatus.corrected);
	}
  throw new Error('unknown action type')
}

const correctNumbersReducerAtom = atomWithReducer([], correctNumbersReducer)
*/
	/*


	let socket;

export default (store) => (next) => (action) => {
  if (action.type === startCorrection) {
    if (!socket) {
      socket = socketclient.io();
      socket.on('numbers:done', () => socket.disconnect());
      socket.on('numbers:number', ({ number }) => {
        store.dispatch(correctNumberReceived(number));
      });
    }
  }

  next(action);
};



			const res = await fetch('http://localhost:3000/api/user/rows', { method: 'GET' });
			const { rows } = await res.json();
			setRows(rows);

const countAtom = atom(1)
const asyncIncrementAtom = atom(null, async (get, set) => {
  // await something
  set(countAtom, get(countAtom) + 1)
})


            const fetchCountAtom = atom(
                (get) => get(countAtom),
                async (_get, set, url) => {
                    const response = await fetch(url);
                    set(countAtom, (await response.json()).count);
                },
                );




                rows: action.rows.map((row) => ({ 
					...row,
					isSorting: false,
					isCorrecting: false,
					numbers: row.numbers.map((number) => ({ 
						...number,
						status: userNumberStatus.initial
					}))
				}))
	*/