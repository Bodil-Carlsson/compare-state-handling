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

export function sortRows({ el, prevOrder, currOrder, onStart, onComplete }) {
	const children = [];
	el.childNodes.forEach((child, index) => {
		const rowId = currOrder[index];
		children.push({
			el: child,
			prevIndex: prevOrder.indexOf(rowId),
			currIndex: index,
			y: child.getBoundingClientRect().y
		});
	});
	const tl = gsap.timeline({ onStart, onComplete });
	children.forEach((child) => {
		tl.set(child.el, { y: children[child.prevIndex].y - child.y });
	});

	children.forEach((child, index) => {
		if (child.prevIndex <= index) {
			tl.to(child.el, { opacity: 0, duration: 1 }, '<');
		}
	});

	children.forEach((child, index) => {
		tl.to(child.el, { y: 0, duration: 3 }, index === 0 ? '>' : '<');
	});

	children.forEach((child, index) => {
		tl.to(child.el, { opacity: 1, duration: 1 }, index === 0 ? '>' : '<');
	});
	return tl;
}
