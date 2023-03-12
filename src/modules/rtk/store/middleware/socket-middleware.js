import socketclient from "socket.io-client";
import { 
  correctionStarting,
  correctionStarted, 
  correctNumberReceived,
  correctionAllNumersReceived
} from "../slices/correct-numbers/reducer";

let socket;

export default (store) => (next) => (action) => {
  if (action.type === correctionStarting.type) {
    if (!socket) {
      socket = socketclient.io();
      socket.on('numbers:done', () => {
        socket.disconnect();
        store.dispatch(correctionAllNumersReceived());
      });
      socket.on('numbers:start', () => {
        store.dispatch(correctionStarted());
      });
      socket.on('numbers:number', ({ number }) => {
        store.dispatch(correctNumberReceived(number));
      });
    }
  }

  next(action);
};
