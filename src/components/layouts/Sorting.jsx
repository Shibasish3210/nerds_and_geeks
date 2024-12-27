import { useContext, useEffect, useState } from "react";
import DropDownIcon from "../../assets/icons/dropdown.svg";
import { ProductContext } from "../../contexts/contexts";

const options = {
	default: "Sort By",
	SORT_NAME_ASC: "Name: A - Z",
	SORT_NAME_DESC: "Name: Z - A",
	SORT_ORDER_VALUE_ASC: "Price: Low to High",
	SORT_ORDER_VALUE_DESC: "Price: High to Low",
};

const Sorting = () => {
	const { state, dispatch } = useContext(ProductContext);
	const [selectedOption, setSelectedOption] = useState(options.default);
	const [isOpen, setIsOpen] = useState(false);

	const { isSearchResult, isSortResult, isFilterResult } = state;

	useEffect(() => {
		if (isSearchResult || isFilterResult) {
			setSelectedOption(options.default);
		}
	}, [isSortResult]);

	const handleSort = (value) => {
		if (value === options.default) {
			setIsOpen(false);
			return;
		}
		const type = Object.keys(options).find((key) => options[key] === value);
		dispatch({ type: type });
		setSelectedOption(value);
		setIsOpen(false);
	};

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className="w-[12vw] min-w-fit mx-auto my-4">
			<div className="relative inline-block w-full">
				<button
					onClick={toggleDropdown}
					className="w-full min-w-fit flex justify-between items-center whitespace-nowrap text-sm font-bold bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline cursor-pointer"
				>
					<p>{selectedOption}</p>
					<img
						src={DropDownIcon}
						alt="dropdown"
						className={`${isOpen ? "rotate-180" : ""}`}
					/>
				</button>

				{isOpen && (
					<div className="absolute z-10 w-full bg-white border border-gray-300 rounded shadow-lg mt-1">
						{Object.keys(options).map((optionKey) => (
							<button
								key={optionKey}
								className="px-4 py-2 hover:bg-gray-200 cursor-pointer w-full text-sm"
								onClick={() => handleSort(options[optionKey])}
							>
								{options[optionKey]}
							</button>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default Sorting;
