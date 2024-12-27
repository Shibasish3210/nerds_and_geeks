import { useContext, useEffect, useState } from "react";
import ProductCard from "../components/ui/ProductCard";
import LightboxModal from "../components/layouts/LightboxModal";
import DropdownIcon from "../assets/icons/dropdown.svg";
import { ProductContext } from "../contexts/contexts";
import { productActions } from "../contexts/actions";
import Sorting from "../components/layouts/Sorting";
const itemsPerPage = 12;

const ProductShowcase = () => {
	const [lightboxImage, setLightboxImage] = useState(null);
	const { state, dispatch } = useContext(ProductContext);
	const { currentPage, products, totalLength } = state;

	const totalPages = Math.ceil(totalLength / itemsPerPage);

	const handlePageChange = (pageNumber) => {
		dispatch({
			type: productActions.FETCH_REMAINING_PRODUCTS,
			payload: pageNumber,
		});
	};

	useEffect(() => {
		dispatch({ type: productActions.FETCH_INITIAL_PRODUCTS });
	}, [dispatch]);

	return (
		<div className="w-full m-3 mb-[15vh] overflow-y-auto">
			<section className="flex-1 h-[67vh] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 scroll-smooth gap-6 p-6  overflow-y-scroll no-scrollbar mb-2 border border-[#d4d4d4] rounded-lg shadow-lg">
				{products.length === 0 && <h1>No products found</h1>}
				{products.map((product) => (
					<div
						key={product.id}
						className="transform transition-transform duration-300 hover:scale-105"
					>
						<ProductCard
							product={product}
							onImageClick={setLightboxImage}
						/>
					</div>
				))}
				{lightboxImage && (
					<LightboxModal
						image={lightboxImage}
						onClose={() => setLightboxImage(null)}
					/>
				)}
				{totalPages > 1 && products.length <= itemsPerPage && (
					<div className="flex justify-center mt-4 mx-auto col-span-full h-8 md:h-11">
						<button
							onClick={() => handlePageChange(currentPage - 1)}
							disabled={currentPage === 1}
							className="px-2 md:px-3 py-2 mx-1 bg-gray-300 rounded disabled:opacity-50"
						>
							<img
								src={DropdownIcon}
								className="rotate-90 w-4 md:w-6"
								alt="Previous"
							/>
						</button>
						{Array.from({ length: totalPages }, (_, index) => (
							<button
								key={index + 1}
								onClick={() => handlePageChange(index + 1)}
								className={`px-2 md:px-4 py-2 text-xs md:text-base mx-1 ${
									currentPage === index + 1
										? "bg-blue-500 text-white"
										: "bg-gray-300"
								} rounded`}
							>
								{index + 1}
							</button>
						))}
						<button
							onClick={() => handlePageChange(currentPage + 1)}
							disabled={currentPage === totalPages}
							className="px-2 md:px-3 py-2 mx-1 bg-gray-300 rounded disabled:opacity-50"
						>
							<img
								src={DropdownIcon}
								className="-rotate-90 w-4 md:w-6"
								alt="next"
							/>
						</button>
					</div>
				)}
			</section>
		</div>
	);
};

export default ProductShowcase;
