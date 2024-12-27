import { useNavigate } from "react-router-dom";
import Cart from "../../assets/icons/cart.svg";
import { useContext } from "react";
import { UserContext } from "../../contexts/contexts";

const CartButton = () => {
	const navigate = useNavigate();
	const { state } = useContext(UserContext);
	const cartProductsLength = state.cartProducts.length;
	return (
		<button
			onClick={() => navigate("/cart")}
			className="relative text-white px-s-4 py-2 focus:outline-none rounded"
		>
			<img src={Cart} alt="cart" className="w-8 md:w-12 h-8 md:h-12" />
			{cartProductsLength > 0 && (
				<span className="absolute top-2 right-3 bg-rose-500 text-white text-xs rounded-full px-2">
					{cartProductsLength}
				</span>
			)}
		</button>
	);
};

export default CartButton;
