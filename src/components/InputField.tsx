import React from 'react';

export const InputField = React.forwardRef<
	HTMLInputElement,
	React.DetailedHTMLProps<
		React.InputHTMLAttributes<HTMLInputElement>,
		HTMLInputElement
	> & {
		name?: string;
		label?: string;
		errorMsg?: string;
	}
>(({ id, name, label, errorMsg, className, ...props }, ref) => (
	<div className={`App__input ${className}`}>
		{label && <label htmlFor={id || name}>{label}</label>}

		<input id={id || name} name={name} {...props} ref={ref} />

		{errorMsg && <p className="App__input__error">errorMsg</p>}
	</div>
));
