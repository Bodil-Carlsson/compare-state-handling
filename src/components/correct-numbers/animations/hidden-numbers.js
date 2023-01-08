import gsap from "gsap";

export function fill({ el, onStart, onComplete }) {
	return gsap.fromTo(el, { height: '0' }, { height: '100%', duration: 3, onStart, onComplete });
}
