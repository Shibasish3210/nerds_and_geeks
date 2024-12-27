import { motion } from "framer-motion";

const LightboxModal = ({ image, onClose }) => {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
		>
			<div className="relative h-[60vh]">
				<img
					src={image}
					alt="Product"
					className="max-w-full max-h-full"
				/>
				<button
					onClick={onClose}
					className="absolute top-2 right-2 text-white bg-red-500 px-4 py-2 rounded"
				>
					Close
				</button>
			</div>
		</motion.div>
	);
};

export default LightboxModal;
