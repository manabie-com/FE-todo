import React, { useEffect, useRef, useState } from 'react';
import useOnClickOutside from '../utils/hooks/useOnClickOutside';
import { InputField } from './InputField';

export const Editable: React.FC<
	React.DetailedHTMLProps<
		React.InputHTMLAttributes<HTMLInputElement>,
		HTMLInputElement
	> & {
		textStyle?: React.CSSProperties;
		onSave: (value: string) => void;
	}
> = ({ value, onSave, textStyle, className, ...props }) => {
	const [isEdit, setIsEdit] = useState(false);
	const [name, setName] = useState(value as string);

	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (isEdit && inputRef.current) {
			inputRef.current.focus();
		}
	}, [isEdit]);

	useOnClickOutside(inputRef, () => setIsEdit(false));

	return (
		<div className={`App__editable ${className}`}>
			{isEdit ? (
				<InputField
					type="text"
					{...props}
					value={name}
					onChange={(e) => {
						setName(e.target.value);
					}}
					onKeyDown={(event) => {
						if (event.key === 'Enter' || event.key === 'Escape') {
							setIsEdit(false);
							onSave(name);
							event.preventDefault();
							event.stopPropagation();
						}
					}}
					ref={inputRef}
				/>
			) : (
				<p
					style={textStyle}
					onDoubleClick={() => {
						setIsEdit(true);
					}}
				>
					{name}
				</p>
			)}
		</div>
	);
};
