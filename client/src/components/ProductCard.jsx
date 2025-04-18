import React from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const ProductCard = ({ product }) => {
  const { currency, addToCart, removeFromCart, cartItems, navigate } = useAppContext();

  return product && (
    <div
      onClick={() => {
        navigate(`/products/${product.category.toLowerCase()}/${product._id}`);
        scrollTo(0, 0);
      }}
      className="border border-gray-200 rounded-lg p-3 bg-white shadow-sm hover:shadow-md transition duration-300 cursor-pointer w-full"
    >
      <div className="flex items-center justify-center mb-3">
        <img
          className="group-hover:scale-105 transition-transform duration-300 max-h-36 object-contain"
          src={product.image[0]}
          alt={product.name}
        />
      </div>

      <div className="text-gray-600 text-sm space-y-1">
        <p className="capitalize">{product.category}</p>
        <p className="text-gray-800 font-semibold text-base truncate">{product.name}</p>

        <div className="flex items-center gap-1 text-xs text-yellow-500">
          {Array(5).fill('').map((_, i) => (
            <img key={i} className="w-4 h-4" src={i < 4 ? assets.star_icon : assets.star_dull_icon} alt="" />
          ))}
          <p className="text-gray-500 text-xs">(4)</p>
        </div>

        <div className="flex items-end justify-between pt-3">
          <p className="text-primary font-bold text-lg">
            {currency}{product.offerPrice}
            <span className="text-gray-400 text-xs line-through ml-1">
              {currency}{product.price}
            </span>
          </p>

          <div onClick={(e) => { e.stopPropagation(); }}>
            {!cartItems[product._id] ? (
              <button
                className="flex items-center gap-1 bg-primary/10 border border-primary/40 px-2 py-1 rounded text-xs"
                onClick={() => addToCart(product._id)}
              >
                <img src={assets.cart_icon} alt="cart_icon" className="w-4 h-4" />
                Add
              </button>
            ) : (
              <div className="flex items-center gap-2 bg-primary/20 px-2 py-1 rounded text-xs">
                <button onClick={() => removeFromCart(product._id)} className="px-2">-</button>
                <span>{cartItems[product._id]}</span>
                <button onClick={() => addToCart(product._id)} className="px-2">+</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
