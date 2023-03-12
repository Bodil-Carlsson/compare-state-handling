import { configureStore } from '@reduxjs/toolkit'
import thunkMiddleware from 'redux-thunk';
import socketMiddleware from './middleware/socket-middleware';
import correctNumbers from './slices/correct-numbers/reducer';
import userRows from './slices/user-rows/reducer';
import { actions as correctNumbersActions } from './slices/correct-numbers/reducer';
import { actions as userRowsActions } from './slices/user-rows/reducer';

const store = configureStore({
  reducer: {
    correctNumbers,
    userRows
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunkMiddleware, socketMiddleware),
  devTools: { 
    trace: true, 
    maxAge: 100, 
    actionCreators: { ...correctNumbersActions, ...userRowsActions } 
  }
});

export default store;
