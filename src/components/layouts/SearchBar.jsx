import { useContext, useEffect, useRef } from "react";
import { ProductContext } from "../../contexts/contexts";
import { productActions } from "../../contexts/actions";

const SearchBar = () => {
	const { state, dispatch } = useContext(ProductContext);
	const ref = useRef(null);
	const { isSearchResult, isSortResult, isFilterResult } = state;

	useEffect(() => {
		if (isSortResult || isFilterResult) {
			ref.current.value = "";
		}
	}, [isSearchResult]);
	const handleSearch = (e) => {
		const searchedValue = e.target.value;
		if (searchedValue === "") {
			dispatch({ type: productActions.FETCH_INITIAL_PRODUCTS });
			return;
		}
		dispatch({
			type: productActions.GET_SEARCHED_PRODUCTS,
			payload: searchedValue,
		});
	};

	return (
		<div className="flex-1 min-w-[60%]">
			<input
				type="text"
				ref={ref}
				placeholder="Search products..."
				onChange={handleSearch}
				className="w-full p-2 border rounded shadow-lg"
			/>
		</div>
	);
};

export default SearchBar;
