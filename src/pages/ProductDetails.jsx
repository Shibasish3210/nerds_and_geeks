import { useContext, useEffect } from "react";
import { ProductContext, UserContext } from "../contexts/contexts.js";
import { Navigate, useNavigate } from "react-router-dom";
import { productActions, userActions } from "../contexts/actions.js";
import Stars from "../components/ui/Stars.jsx";

const ProductDetails = () => {
	const { state, dispatch: userDispatch } = useContext(UserContext);
	const { dispatch: productDispatch } = useContext(ProductContext);

	const { selectedProduct } = state;

	const navigate = useNavigate();

	if (!selectedProduct) {
		return <Navigate to="/products" />;
	}

	const addToCart = (e) => {
		userDispatch({
			type: userActions.ADD_SELECTED_PRODUCT_TO_CART,
			payload: selectedProduct,
		});
		productDispatch({
			type: productActions.ADD_TO_CART,
			payload: selectedProduct.id,
		});
	};

	return (
		<div className="mt-[10vh] overflow-y-scroll md:overflow-y-clip">
			<h1 className="text-3xl font-bold text-center my-4 p-4 border-b border-b-[#d4d4d4] text-slate-600">
				Product Details
			</h1>
			<div className="flex flex-col md:flex-row gap-4 justify-center w-11/12 mx-auto">
				<div className="w-full md:w-1/2 h-[60vh]">
					<img
						src={selectedProduct.image}
						alt="Product"
						className="h-full mx-auto md:mx-0 md:ml-auto"
					/>
				</div>
				<div className="w-full md:w-1/2 p-4 text-slate-800">
					<h1 className="text-2xl font-bold">
						{selectedProduct.name}
					</h1>
					<p className="mt-2 text-base w-full md:text-lg">
						{selectedProduct.description}
					</p>
					<p className="mt-6 text-base font-semibold">
						Price: ${selectedProduct.actualPrice} (
						{Math.round(
							((selectedProduct.actualPrice -
								selectedProduct.price) *
								100) /
								selectedProduct.actualPrice,
						)}
						% off )
					</p>
					<p className="mt-2 text-base font-semibold">
						Discounted Price: ${selectedProduct.price}
					</p>
					<div className="mt-2">
						<Stars rating={selectedProduct.rating} noOfPeople={selectedProduct.ratedBy} />
					</div>
					{selectedProduct.isInCart ? (
						<button
							onClick={() => navigate("/cart")}
							className="mt-12 mb-[10vh] md:mb-0 px-4 py-2 rounded w-[60%] bg-slate-800 text-white"
						>
							Go to cart
						</button>
					) : (
						<button
							onClick={addToCart}
							className="mt-12 mb-[10vh] md:mb-0 px-4 py-2 rounded w-[60%] bg-slate-800 text-white"
						>
							Add to cart
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default ProductDetails;
