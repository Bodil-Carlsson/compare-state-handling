import gsap from "gsap";

export function show({ el, onStart, onComplete }) {
	return gsap.from(el, { opacity: 0, y: 500, duration: 3, onStart, onComplete });
}

export function hide({ el, onStart, onComplete }) {
	const tween = gsap.set(el, { opacity: 0 });
	const tl = gsap.timeline({ onStart, onComplete });
	tl.add(tween);
	tl.to(el, { height: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0, duration: 1 });
	return tl;
}
