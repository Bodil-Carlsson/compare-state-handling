
export const routePaths = {
	base: '/redux',
	numbers: '/redux/numbers'
};

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

const initial = 'initial';
const readyToStart = 'readyToStart';
const starting = 'starting';
const started = 'started';
const completed = 'completed';

const cs = [
	initial,
	readyToStart,
	starting,
	started,
	completed
];

export const correctionStatus = {
	initial: cs.indexOf(initial),
	readyToStart: cs.indexOf(readyToStart),
	starting: cs.indexOf(starting),
	started: cs.indexOf(started),
	completed: cs.indexOf(completed)
};