import gsap from "gsap";
import { globalTimeline } from "../../../constants";

export function zsortRow({ el, onStart, onComplete }) {
	const tween = gsap.from(el, { opacity: 0, duration: 2, onStart, onComplete });
	globalTimeline.add(tween);
	return tween;
}

export function sortRow({ el, prevOrder, currOrder, onStart, onComplete }) {
	const children = [];
	el.childNodes.forEach((child, index) => {
		const { value } = currOrder[index];
		children.push({
			el: child,
			prevIndex: prevOrder.findIndex((n) => n.value === value),
			currIndex: index,
			x: child.getBoundingClientRect().x
		});
	});
	const tl = gsap.timeline({ onStart, onComplete });
	children.forEach((child) => {
		tl.set(child.el, { x: children[child.prevIndex].x - child.x });
	});

	children.forEach((child, index) => {
		if (child.prevIndex <= index) {
			tl.to(child.el, { opacity: 0, duration: 1 }, '<');
		}
	});

	children.forEach((child, index) => {
		tl.to(child.el, { x: 0, duration: 3 }, index === 0 ? '>' : '<');
	});

	children.forEach((child, index) => {
		tl.to(child.el, { opacity: 1, duration: 1 }, index === 0 ? '>' : '<');
	});
	return tl;
}