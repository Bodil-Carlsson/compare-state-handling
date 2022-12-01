import React from "react";
import { useShowNextNumber } from "../hooks/use-show-next-number";
import { useCorrectUserRows } from "../hooks/use-correct-user-rows";

export const Correction = () => {
	useShowNextNumber();
	useCorrectUserRows();
	return null;
}