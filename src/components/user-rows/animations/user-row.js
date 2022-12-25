import gsap from "gsap";

export function sortRow({ el, currOrder, sortedOrder, onStart, onComplete }) {
	const children = [];
	el.childNodes.forEach((child, index) => {
		const { value } = currOrder[index];
		children.push({
			el: child,
			sortIndex: sortedOrder.findIndex((n) => n.value === value),
			currIndex: index,
			x: child.getBoundingClientRect().x
		});
	});
	
	const tl = gsap.timeline({ onStart, onComplete });
	children.forEach((child, index) => {
		tl.to(child.el, { x: children[child.sortIndex].x - child.x, duration: 3 }, index === 0 ? '>' : '<');
	});
	return tl;
}
