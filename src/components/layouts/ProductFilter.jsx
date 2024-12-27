import { useState, useContext, useEffect } from "react";
import { categories } from "../../utils/dummyData";
import { ProductContext } from "../../contexts/contexts";
import { productActions } from "../../contexts/actions";

const ProductFilter = () => {
	const [selected, setSelected] = useState("All");
	const { state, dispatch } = useContext(ProductContext);

	const { isSearchResult, isSortResult, isFilterResult } = state;

	useEffect(() => {
		if (isSearchResult || isSortResult) {
			setSelected("All");
		}
	}, [isFilterResult]);

	const handleFilterChange = (category) => {
		dispatch({ type: productActions.FILTER_PRODUCTS, payload: category });
		setSelected(category);
	};

	return (
		<div className="flex pl-6 pt-4 gap-4 max-w-[85%] flex-wrap">
			{categories.map((category) => (
				<button
					key={category}
					onClick={() => handleFilterChange(category)}
					className={`text-sm px-4 py-2 rounded transition-transform duration-300 border-b border-b-[#d4d4d4] min-w-fit ${
						selected === category
							? "bg-blue-500 text-white scale-105"
							: "bg-gray-200 text-gray-700"
					}`}
				>
					{category}
				</button>
			))}
		</div>
	);
};

export default ProductFilter;
