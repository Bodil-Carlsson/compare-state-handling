import gsap from "gsap";

export function fadeIn({ el, onStart, onComplete }) {
	return gsap.from(el, { opacity: 0, duration: 3, onStart, onComplete });
}

export function fadeOut({ el, onStart, onComplete }) {
	return gsap.to(el, { opacity: 0, duration: 3, onStart, onComplete });
}
