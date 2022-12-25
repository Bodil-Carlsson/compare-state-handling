import gsap from "gsap";

export function fill({ el, onStart, onComplete }) {
	return gsap.to(el, { height: '100%', duration: 3, delay: 1, onStart, onComplete });
}
