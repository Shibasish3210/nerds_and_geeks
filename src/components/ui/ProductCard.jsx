import { useContext } from "react";
import { ProductContext, UserContext } from "../../contexts/contexts";
import { productActions, userActions } from "../../contexts/actions";
import { Link } from "react-router-dom";

const ProductCard = ({ product, onImageClick }) => {
	const { dispatch: productDispatch } = useContext(ProductContext);
	const { dispatch: userDispatch } = useContext(UserContext);

	const handleAddToCart = (e) => {
		e.preventDefault();
		e.stopPropagation();
		userDispatch({
			type: userActions.ADD_TO_CART,
			payload: product,
		});
		productDispatch({
			type: productActions.ADD_TO_CART,
			payload: product.id,
		});
	};

	const handleLightboxOpen = (e) => {
		e.preventDefault();
		e.stopPropagation();
		onImageClick(product.image);
	};

	const handleGOToProduct = () => {
		userDispatch({ type: userActions.SELECT_PRODUCT, payload: product });
	};
	return (
		<Link
			onClick={handleGOToProduct}
			to={`/products/${product.id}`}
			className="border cursor-pointer rounded shadow hover:shadow-lg p-4 2xl:min-h-[35vh] flex flex-col gap-4 justify-between w-full"
		>
			<button onClick={handleLightboxOpen} className="w-full h-[24vh]">
				<img
					src={product.image}
					alt={product.name}
					className="w-full h-full object-cover cursor-pointer"
				/>
			</button>
			<h2 className="text-lg font-bold text-slate-800">{product.name}</h2>
			<div className="flex w-full justify-between items-center">
				<p
					data-label={"$" + product.actualPrice.toString()}
					className="text-gray-600 relative price text-sm lg:text-base translate-y-2"
				>
					${product.price}
				</p>
				<button
					disabled={product.isInCart}
					onClick={handleAddToCart}
					className={`rounded-md shadow-lg border border-[#d4d4d4] py-2 px-2 md:px-4 text-nowrap text-sm font-semibold  ${
						product.isInCart
							? "bg-gray-400 text-slate-600 hover:scale-100"
							: "hover:scale-105 bg-gray-300 text-slate-800"
					}`}
				>
					{product.isInCart ? "Added to cart" : "Add to cart"}
				</button>
			</div>
		</Link>
	);
};

export default ProductCard;
