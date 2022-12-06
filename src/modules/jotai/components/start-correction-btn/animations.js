import gsap from "gsap";

export function fadeIn({ el, onStart, onComplete }) {
	return gsap.from(el, { opacity: 0, duration: 3, delay: 1, onStart, onComplete });
}
