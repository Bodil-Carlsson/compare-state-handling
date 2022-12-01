import gsap from "gsap";

export const globalTimeline = gsap.timeline();

export const routePaths = {
	base: '/redux',
	numbers: '/redux/numbers'
};

export const correctNumberStatus = {
	none: 0,
	hide: 1,
	correcting: 2,
	show: 3
};

export const userNumberStatus = {
	none: 0,
	correcting: 1,
	sorting: 2,
	corrected: 3
};

