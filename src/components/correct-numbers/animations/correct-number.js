import gsap from "gsap";

export function show({ el, number, onStart, onComplete }) {
	const hiddenNumbersEl = document.querySelector('.hidden-numbers'); // FIXME
	const hidden = hiddenNumbersEl.firstChild.getBoundingClientRect();
	const elPos = el.getBoundingClientRect();

	const x = (hidden.width/2 + hidden.x) - (elPos.width/2 + elPos.x);
	const y = (hidden.height/2 + hidden.y) - (elPos.height/2 + elPos.y);
	const scale = hidden.height/elPos.height;

	const tween = gsap.set(el, { x, y, scale });
	el.innerText = '?';
	const counter = { val: 0 };
	
	const tl = gsap.timeline({ onStart, onComplete });
	tl.add(tween);
	tl.to(el, { y: 0, duration: 1 });
	tl.to(el, { scale: 1, duration: 0.5 });
	tl.to(el, { x: 0, duration: 2 });
	tl.to(counter, { 
		val: number, 
		roundProps: 'val', 
		duration: 2, 
		onUpdate: () => el.innerText = counter.val 
	}, '<');
	return tl;
}