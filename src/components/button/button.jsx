import './button.less';
import React, { forwardRef } from 'react';

export const Button = forwardRef(({ className = '', children, onClick }, ref) => {
	return (
		<button ref={ref} className={`btn ${className}`} onClick={onClick}>
			{children}
		</button>
	);
});
