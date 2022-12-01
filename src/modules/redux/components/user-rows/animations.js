import gsap from "gsap";
import { globalTimeline } from "../../constants";

export function sortRows({ el, onStart, onComplete }) {
	const tween = gsap.from(el, { opacity: 0, duration: 2, onStart, onComplete });
	globalTimeline.add(tween);
	return tween;
}
