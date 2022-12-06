import gsap from "gsap";

export function showRows({ el, onStart, onComplete }) {
	const tl = gsap.timeline({ onStart, onComplete });
	el.childNodes.forEach((child) => {
		tl.add(gsap.from(child, { y: 500, opacity: 0, duration: 2, ease: 'back.out(1.2)' }), '<+.2');
	});
	return tl;
}
export function sortRows({ el, currOrder, sortedOrder, onStart, onComplete }) {
	const children = [];
	el.childNodes.forEach((child, index) => {
		const rowId = currOrder[index];
		children.push({
			el: child,
			sortIndex: sortedOrder.indexOf(rowId),
			currIndex: index,
			y: child.getBoundingClientRect().y
		});
	});
	const tl = gsap.timeline({ onStart, onComplete });
	children.forEach((child, index) => {
		tl.to(child.el, { y: children[child.sortIndex].y - child.y, duration: 3 }, index === 0 ? '>' : '<');
	});
	return tl;
}