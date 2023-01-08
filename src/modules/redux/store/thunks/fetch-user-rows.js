import { userRowsAdd } from "../slices/user-rows/actions";

export const fetchUserRows = () => async (dispatch) => {
	const res = await fetch('/api/user/rows', { method: 'GET' });
	const { rows } = await res.json();
	dispatch(userRowsAdd(rows));
};