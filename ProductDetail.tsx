import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Plus, Minus, Truck, ShoppingCart, Heart, Share2 } from 'lucide-react';
import Button from '../components/common/Button';
import ProductCard from '../components/common/ProductCard';
import { products } from '../data/products';
import { categories } from '../data/categories';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(products.find(p => p.id === id));
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [selectedImage, setSelectedImage] = useState(0);
  
  // Get related products
  const relatedProducts = products
    .filter(p => p.id !== id && p.categoryId === product?.categoryId)
    .slice(0, 4);
  
  useEffect(() => {
    // Find product by ID
    const foundProduct = products.find(p => p.id === id);
    setProduct(foundProduct);
    
    // Reset states when product changes
    setQuantity(1);
    setSelectedImage(0);
    
    // Update page title
    if (foundProduct) {
      document.title = `${foundProduct.name} | Brico Direct`;
    }
    
    // Scroll to top when product changes
    window.scrollTo(0, 0);
  }, [id]);
  
  if (!product) {
    return (
      <div className="pt-[61px] min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Produit non trouvé</h2>
          <p className="text-gray-600 mb-6">Désolé, le produit que vous recherchez n'existe pas.</p>
          <Link 
            to="/products" 
            className="bg-orange-600 hover:bg-orange-700 text-white font-medium px-6 py-3 rounded transition-colors"
          >
            Voir tous les produits
          </Link>
        </div>
      </div>
    );
  }
  
  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  const handleAddToCart = () => {
    addToCart({...product, quantity});
  };
  
  // Get category name
  const category = categories.find(c => c.id === product.categoryId);
  
  return (
    <div className="pt-[61px] bg-gray-50">
      {/* Breadcrumbs */}
      <div className="bg-white py-3 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm">
            <Link to="/" className="text-gray-500 hover:text-orange-600">Accueil</Link>
            <ChevronRight size={14} className="mx-2 text-gray-400" />
            <Link to="/products" className="text-gray-500 hover:text-orange-600">Produits</Link>
            {category && (
              <>
                <ChevronRight size={14} className="mx-2 text-gray-400" />
                <Link 
                  to={`/products?category=${category.id}`} 
                  className="text-gray-500 hover:text-orange-600"
                >
                  {category.name}
                </Link>
              </>
            )}
            <ChevronRight size={14} className="mx-2 text-gray-400" />
            <span className="text-gray-700 font-medium truncate max-w-[150px]">
              {product.name}
            </span>
          </div>
        </div>
      </div>
      
      {/* Product Detail */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 p-4 md:p-8">
            {/* Product Images */}
            <div className="lg:col-span-5">
              <div className="mb-4 aspect-square bg-gray-100 rounded-md overflow-hidden flex items-center justify-center p-4">
                <img 
                  src={product.images?.[selectedImage] || product.image} 
                  alt={product.name} 
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              
              {/* Thumbnail Images */}
              {product.images && product.images.length > 1 && (
                <div className="grid grid-cols-5 gap-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square bg-gray-100 rounded-md overflow-hidden flex items-center justify-center p-2 border-2 ${
                        index === selectedImage ? 'border-orange-500' : 'border-transparent'
                      }`}
                    >
                      <img 
                        src={image} 
                        alt={`${product.name} - Vue ${index + 1}`} 
                        className="max-h-full max-w-full object-contain"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Product Information */}
            <div className="lg:col-span-7">
              <div className="flex flex-col h-full">
                <div>
                  <h1 className="text-2xl font-bold text-gray-800 mb-2">{product.name}</h1>
                  
                  {/* Product Meta */}
                  <div className="flex flex-wrap items-center gap-4 mb-4 text-sm">
                    {category && (
                      <Link 
                        to={`/products?category=${category.id}`} 
                        className="text-blue-600 hover:underline"
                      >
                        {category.name}
                      </Link>
                    )}
                    
                    <div className="text-gray-700">
                      <span className="font-medium">SKU:</span> {product.sku || `BD-${product.id}`}
                    </div>
                    
                    <div className={`${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                      {product.inStock ? 'En stock' : 'Rupture de stock'}
                    </div>
                  </div>
                  
                  {/* Short Description */}
                  <p className="text-gray-600 mb-6">{product.description}</p>
                  
                  {/* Price */}
                  <div className="flex items-center space-x-3 mb-6">
                    <span className="text-3xl font-bold text-orange-600">
                      {product.price.toFixed(2)} DT
                    </span>
                    {product.oldPrice && (
                      <span className="text-lg text-gray-500 line-through">
                        {product.oldPrice.toFixed(2)} DT
                      </span>
                    )}
                    {product.discount > 0 && (
                      <span className="bg-red-100 text-red-600 text-sm font-medium px-2 py-1 rounded">
                        -{product.discount}%
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="mt-auto">
                  {/* Quantity Selector */}
                  <div className="mb-6">
                    <h3 className="font-medium text-gray-800 mb-2">Quantité</h3>
                    <div className="flex">
                      <button
                        onClick={decreaseQuantity}
                        className="w-10 h-10 flex items-center justify-center bg-gray-100 text-gray-600 border border-gray-300 rounded-l-md hover:bg-gray-200 transition-colors"
                      >
                        <Minus size={16} />
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-16 h-10 border-y border-gray-300 text-center focus:outline-none focus:ring-1 focus:ring-orange-500"
                      />
                      <button
                        onClick={increaseQuantity}
                        className="w-10 h-10 flex items-center justify-center bg-gray-100 text-gray-600 border border-gray-300 rounded-r-md hover:bg-gray-200 transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                  
                  {/* Delivery Info */}
                  <div className="flex items-center mb-6 text-sm text-gray-700 bg-blue-50 p-3 rounded-md">
                    <Truck size={18} className="text-blue-600 mr-2" />
                    <span>Livraison disponible partout en Tunisie</span>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                    <Button
                      variant="primary"
                      size="lg"
                      fullWidth
                      icon={<ShoppingCart size={18} />}
                      onClick={handleAddToCart}
                      disabled={!product.inStock}
                      className="md:col-span-8"
                    >
                      {product.inStock ? 'Ajouter au panier' : 'Indisponible'}
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="lg"
                      fullWidth
                      icon={<Heart size={18} />}
                      className="md:col-span-2"
                      aria-label="Ajouter aux favoris"
                    />
                    
                    <Button
                      variant="outline"
                      size="lg"
                      fullWidth
                      icon={<Share2 size={18} />}
                      className="md:col-span-2"
                      aria-label="Partager"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Tabs */}
          <div className="border-t border-gray-200">
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab('description')}
                className={`px-6 py-3 font-medium text-sm ${
                  activeTab === 'description'
                    ? 'text-orange-600 border-b-2 border-orange-600'
                    : 'text-gray-600 hover:text-orange-600'
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab('specifications')}
                className={`px-6 py-3 font-medium text-sm ${
                  activeTab === 'specifications'
                    ? 'text-orange-600 border-b-2 border-orange-600'
                    : 'text-gray-600 hover:text-orange-600'
                }`}
              >
                Spécifications
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`px-6 py-3 font-medium text-sm ${
                  activeTab === 'reviews'
                    ? 'text-orange-600 border-b-2 border-orange-600'
                    : 'text-gray-600 hover:text-orange-600'
                }`}
              >
                Avis
              </button>
            </div>
            
            <div className="p-6">
              {activeTab === 'description' && (
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed">
                    {product.description}
                  </p>
                  <p className="text-gray-700 leading-relaxed mt-4">
                    {product.longDescription || `${product.name} est un produit de qualité supérieure qui offre d'excellentes performances pour tous vos travaux de bricolage. Fabriqué avec des matériaux résistants, ce produit est conçu pour durer et vous accompagner dans toutes vos réalisations.`}
                  </p>
                </div>
              )}
              
              {activeTab === 'specifications' && (
                <div>
                  <table className="w-full text-sm">
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="py-3 pr-4 font-medium text-gray-700 w-1/3">Marque</td>
                        <td className="py-3 text-gray-800">{product.brand || 'Brico Direct'}</td>
                      </tr>
                      <tr>
                        <td className="py-3 pr-4 font-medium text-gray-700">Référence</td>
                        <td className="py-3 text-gray-800">{product.sku || `BD-${product.id}`}</td>
                      </tr>
                      <tr>
                        <td className="py-3 pr-4 font-medium text-gray-700">Dimensions</td>
                        <td className="py-3 text-gray-800">{product.dimensions || '30 x 20 x 15 cm'}</td>
                      </tr>
                      <tr>
                        <td className="py-3 pr-4 font-medium text-gray-700">Poids</td>
                        <td className="py-3 text-gray-800">{product.weight || '1.2 kg'}</td>
                      </tr>
                      <tr>
                        <td className="py-3 pr-4 font-medium text-gray-700">Couleur</td>
                        <td className="py-3 text-gray-800">{product.color || 'Noir / Orange'}</td>
                      </tr>
                      <tr>
                        <td className="py-3 pr-4 font-medium text-gray-700">Garantie</td>
                        <td className="py-3 text-gray-800">{product.warranty || '1 an'}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
              
              {activeTab === 'reviews' && (
                <div className="text-center py-8">
                  <p className="text-gray-700 mb-4">Aucun avis pour ce produit pour le moment.</p>
                  <Button variant="outline">Donner votre avis</Button>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Produits similaires</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
