import { 
	createStore, 
	combineReducers,
	compose,
	applyMiddleware 
} from 'redux';
import thunkMiddleware from 'redux-thunk';
import socketMiddleware from './middleware/socket-middleware';
import correctionMiddleware from './middleware/correction-middleware';
import correctNumbers from './slices/correct-numbers/reducer';
import userRows from './slices/user-rows/reducer';

const store = createStore(
  combineReducers({
		correctNumbers,
		userRows
  }),
  {},
  compose(
    applyMiddleware(thunkMiddleware, socketMiddleware, correctionMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({ trace: true })
  )
);

export default store;
