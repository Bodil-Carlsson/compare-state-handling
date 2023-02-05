import socketclient from "socket.io-client";
import { CORRECTION_STARTING } from '../slices/correct-numbers/action-types';
import { 
  correctionStarted, 
  correctNumberReceived,
  correctionAllNumersReceived
} from "../slices/correct-numbers/actions";

let socket;

export default (store) => (next) => (action) => {
  if (action.type === CORRECTION_STARTING) {
    if (!socket) {
      socket = socketclient.io();
      socket.on('numbers:done', () => {
        socket.disconnect();
        store.dispatch(correctionAllNumersReceived());
      });
      socket.on('numbers:start', () => store.dispatch(correctionStarted()));
      socket.on('numbers:number', ({ number }) => {
        store.dispatch(correctNumberReceived(number));
      });
    }
  }

  next(action);
};
