import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <div 
      className="group bg-white rounded-md shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/products/${product.id}`} className="block">
        <div className="relative p-4 pt-6 bg-white h-52 flex items-center justify-center">
          {/* Discount Tag */}
          {product.discount > 0 && (
            <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-sm">
              -{product.discount}%
            </div>
          )}
          
          {/* Wishlist Button */}
          <button
            onClick={toggleFavorite}
            className="absolute top-2 right-2 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center transition-all duration-300 hover:bg-gray-200"
          >
            <Heart 
              size={18} 
              className={`${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-500'}`} 
            />
          </button>
          
          {/* Product Image */}
          <img
            src={product.image}
            alt={product.name}
            className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        
        <div className="p-4 border-t">
          {/* Category */}
          <div className="text-xs text-gray-500 mb-1">{product.category}</div>
          
          {/* Product Name */}
          <h3 className="font-medium text-gray-800 mb-2 line-clamp-2 h-12">{product.name}</h3>
          
          {/* Price */}
          <div className="flex items-center space-x-2 mb-3">
            <span className="font-bold text-lg text-orange-600">{product.price.toFixed(2)} DT</span>
            {product.oldPrice && (
              <span className="text-sm text-gray-500 line-through">{product.oldPrice.toFixed(2)} DT</span>
            )}
          </div>
          
          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded flex items-center justify-center transition-colors"
          >
            <ShoppingCart size={16} className="mr-2" />
            <span>Ajouter au panier</span>
          </button>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
