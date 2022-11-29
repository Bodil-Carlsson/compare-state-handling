import { 
	createStore, 
	combineReducers,
	compose,
	applyMiddleware 
} from 'redux';
import thunkMiddleware from 'redux-thunk';
import correctNumbers from './slices/correct-numbers/reducer';
import userRows from './slices/user-rows/reducer';

const store = createStore(
  combineReducers({
		correctNumbers,
		userRows
  }),
  {},
  compose(
    applyMiddleware(thunkMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({ trace: true })
  )
);

export default store;
