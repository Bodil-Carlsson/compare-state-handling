import socketclient from "socket.io-client";
import { startCorrection } from '../slices/correct-numbers/action-types';

import { addCorrectNumber } from '../slices/correct-numbers/actions';

let socket;

export default (store) => (next) => (action) => {
    if (action.type === startCorrection) {
      if (!socket) {
        socket = socketclient.io();
				socket.on('numbers:done', () => socket.disconnect());
				socket.on('numbers:number', ({ number }) => {
					store.dispatch(addCorrectNumber(number));
				});
      }
    }

    next(action);
  };
