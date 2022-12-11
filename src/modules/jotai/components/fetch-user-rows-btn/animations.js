import gsap from "gsap";

export function fadeOut({ el, onStart, onComplete }) {
	return gsap.to(el, { opacity: 0, duration: 1, ease: 'power2.in', onStart, onComplete });
}
