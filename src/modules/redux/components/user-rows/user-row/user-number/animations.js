import gsap from "gsap";
import { globalTimeline } from "../../../../constants";

export function correct({ el, onStart, onComplete }) {
	const tl = gsap.timeline({ onStart, onComplete });
	tl.to(el, { scale: 2, duration: .3 });
	tl.to(el, { backgroundColor: '#70ff70', duration: .2 }, '>');
	tl.to(el, { scale: 1, duration: .2 }, '<0.1');
	tl.to(el, { duration: .6 });
	globalTimeline.add(tl);
	return tl;
}
