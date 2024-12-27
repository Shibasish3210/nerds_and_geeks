import React from 'react'
import { useNavigate } from 'react-router-dom'

const Checkout = () => {
    const navigate = useNavigate();

    return (
        <div className="p-5 border border-gray-300 w-80 mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Checkout</h2>
            <p className="mb-4">Your items will be shipped soon!</p>
            <button 
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                onClick={() => navigate("/products")}
            >
                Return to Products
            </button>
        </div>
    )
}

export default Checkout
