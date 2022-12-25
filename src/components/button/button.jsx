import './button.less';
import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { fadeIn, fadeOut } from './animations';

export const Button = forwardRef(({ className = '', children, onClick }, ref) => {
	const btnRef = useRef();

  useImperativeHandle(ref, () => ({
		show({ onStart, onComplete } = {}) {
			fadeIn({ el: btnRef.current, onStart, onComplete });
		},
		hide({ onStart, onComplete } = {}) {
			fadeOut({ el: btnRef.current, onStart, onComplete });
		}
  }));
	
	return (
		<button ref={btnRef} className={`btn ${className}`} onClick={onClick}>
			{children}
		</button>
	);
});
