import { addUserRows } from "../slices/user-rows/actions";

export const fetchUserRows = () => async (dispatch, getState) => {
	const res = await fetch('http://localhost:3000/api/user/rows', { method: 'GET' });
	const { rows } = await res.json();
	console.log('rows', rows);
	dispatch(addUserRows(rows));
};