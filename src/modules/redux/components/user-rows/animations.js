import gsap from "gsap";
import { globalTimeline } from "../../constants";

export function showRows({ el, onStart, onComplete }) {
	const tl = gsap.timeline({ onStart, onComplete });
	el.childNodes.forEach((child) => {
		tl.add(gsap.from(child, { y: 500, opacity: 0, duration: 2 }), '<+.2');
	});
	globalTimeline.add(tl);
	return tl;
}

export function sortRows({ el, onStart, onComplete }) {
	const tween = gsap.from(el, { opacity: 0, duration: 2, onStart, onComplete });
	globalTimeline.add(tween);
	return tween;
}
