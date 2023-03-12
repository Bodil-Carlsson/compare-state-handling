import { userRowsAdd } from "../slices/user-rows/reducer";

export const fetchUserRows = () => async (dispatch) => {
	const res = await fetch('/api/user/rows', { method: 'GET' });
	const { rows } = await res.json();
	dispatch(userRowsAdd(rows));
};