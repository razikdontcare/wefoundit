import { ChevronDown } from "lucide-react"
import React, { useEffect, useRef } from 'react';

export interface IDropdownOption {
	label: string | number;
	labelValue: string | number;
}

interface IDropdownProps {
	options: IDropdownOption[];
	required?: boolean;
	tabIndex?: number;
	className?: string;
	placeHolder?: string;
	labelName?: string;
}

function Dropdown({
	labelName,
	options,
	placeHolder,
	required,
	className,
	tabIndex,
}: IDropdownProps) {
	const [isFocused, setIsFocused] = React.useState(false);
	const [selectedItem, setSelectedItem] = React.useState<number | string>();
	const wrapperRef = useRef<any>(null);

	useEffect(() => {
		function handleClickOutside(event: any) {
			if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
				setIsFocused(false);
			}
		}

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [wrapperRef]);

	const onValueChange = (selectedValue: string | number) => {
		setSelectedItem(selectedValue);
		setIsFocused(false);
	};

	return (
		<div ref={wrapperRef} className="border-[#979797] relative">
			<div tabIndex={tabIndex} className={"min-w-[120px] w-full h-[44px] py-2.5 px-4 box-primary rounded-sm cursor-pointer flex item-center justify-between transition duration-150 ${className}"}
				onClick={() => setIsFocused(!isFocused)}>
				<span className="truncate block max-w-[85%]">{selectedItem ?? placeHolder}</span>
                <ChevronDown/>
			</div>
			{isFocused && (
				<ul className="absolute mt-1 z-50 box-secondary w-full border border-gray-300 rounded-md shadow-md max-h-60 overflow-auto">
		            {options.map(({ label, labelValue }) => (
            			<li
			            	key={labelValue}
				            onClick={() => onValueChange(labelValue)}
            				className="px-4 py-2 hover:bg-gray-100 cursor-pointer hover:text-black">
			            	{label}
			            </li>
		            ))}
	            </ul>
			)}
		</div>
	);
}

export default Dropdown;

Dropdown.defaultProps = {
	name: '',
	type: '',
	className: '',
	placeHolder: '',
	required: false,
	tabIndex: 0,
	labelName: '',
};