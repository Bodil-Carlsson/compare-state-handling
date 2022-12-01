import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userNumberStatus } from "../constants";
import { showCorrectNumber } from "../store/slices/correct-numbers/actions";
import { correctNumberInRow, sortRows } from "../store/slices/user-rows/actions";

export const useCorrectUserRows = () => {
	const numberToCorrect = useSelector((state) => state.userRows.numberToCorrect);
	const rowIds = useSelector((state) => state.userRows.rowIds);
	const isSorting = useSelector((state) => state.userRows.isSorting);
	const rows = useSelector((state) => state.userRows.rows); //, (prev, curr) => prev.length === curr.length);
	const dispatch = useDispatch();
	const correctedRows = useRef([]);

	useEffect(() => {
		if (numberToCorrect && rows.every((r) => !r.isCorrecting)) {
			const rowId = rowIds.find(
				(id) => rows.find(
					(row) => row.id === id && row.numbers.find((n) => n.value === numberToCorrect && n.status === userNumberStatus.none)
				)
			);
			if (rowId) {
				correctedRows.current.push(rowId);
				dispatch(correctNumberInRow(rows.findIndex((row) => row.id === rowId)));
			} else if (rows.every((r) => !r.isSorting)) {
				let needsSorting = false;
				for (let i = 0, len = correctedRows.current.length; i < len; i++) {
					if (correctedRows.current[i] !== rowIds[i]) {
						needsSorting = true;
						break;
					}
				}
				correctedRows.current = [];
				if (needsSorting) {
					dispatch(sortRows());
				} else if (!isSorting) {
					dispatch(showCorrectNumber(numberToCorrect));
				}
			}
		}
	}, [numberToCorrect, rowIds, isSorting, rows, dispatch]);
};