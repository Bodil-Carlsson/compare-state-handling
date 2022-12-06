import gsap from "gsap";

export const globalTimeline = gsap.timeline();

export const routePaths = {
	base: '/redux',
	numbers: '/redux/numbers'
};

const initial = 'initial';
const received = 'received';
const waiting = 'waiting';
const animating = 'animating';
const correcting = 'correcting';
const corrected = 'corrected';

const cns = [
	received,
	waiting,
	animating,
	correcting,
	corrected
];

export const correctNumberStatus = {
	received: cns.indexOf(received),
	waiting: cns.indexOf(waiting),
	animating: cns.indexOf(animating),
	correcting: cns.indexOf(correcting),
	corrected: cns.indexOf(corrected)
};

const uns = [
	initial,
	correcting,
	corrected
];

export const userNumberStatus = {
	initial: uns.indexOf(initial),
	correcting: uns.indexOf(correcting),
	corrected: uns.indexOf(corrected)
};

