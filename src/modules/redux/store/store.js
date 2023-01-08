import { 
	createStore, 
	combineReducers,
	compose,
	applyMiddleware 
} from 'redux';
import thunkMiddleware from 'redux-thunk';
import socketMiddleware from './middleware/socket-middleware';
import correctNumbers from './slices/correct-numbers/reducer';
import userRows from './slices/user-rows/reducer';
import correctNumbersActions from './slices/correct-numbers/actions';
import userRowsActions from './slices/user-rows/actions';

const store = createStore(
  combineReducers({
		correctNumbers,
		userRows
  }),
  {},
  compose(
    applyMiddleware(thunkMiddleware, socketMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({ 
      trace: true, 
      maxAge: 100, 
      actionCreators: { ...correctNumbersActions, ...userRowsActions } 
    })
  )
);

export default store;
