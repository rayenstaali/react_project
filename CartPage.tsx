import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowLeft, Truck } from 'lucide-react';
import Button from '../components/common/Button';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
  
  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = cartItems.length > 0 ? 8 : 0;
  const total = subtotal + shipping;
  
  useEffect(() => {
    document.title = 'Panier | Brico Direct';
  }, []);
  
  return (
    <div className="bg-gray-50 pt-[61px] min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Votre Panier</h1>
        
        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Produit
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Prix
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Quantité
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Total
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {cartItems.map((item) => (
                        <tr key={item.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded bg-gray-100">
                                <img 
                                  src={item.image} 
                                  alt={item.name} 
                                  className="h-full w-full object-contain object-center"
                                />
                              </div>
                              <div className="ml-4">
                                <Link 
                                  to={`/products/${item.id}`}
                                  className="text-sm font-medium text-gray-900 hover:text-orange-600"
                                >
                                  {item.name}
                                </Link>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-700">{item.price.toFixed(2)} DT</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <button
                                onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                className="text-gray-600 hover:text-orange-600 focus:outline-none"
                              >
                                -
                              </button>
                              <input
                                type="text"
                                value={item.quantity}
                                onChange={(e) => {
                                  const val = parseInt(e.target.value);
                                  if (!isNaN(val) && val > 0) {
                                    updateQuantity(item.id, val);
                                  }
                                }}
                                className="w-12 mx-2 text-center border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-orange-500"
                              />
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="text-gray-600 hover:text-orange-600 focus:outline-none"
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {(item.price * item.quantity).toFixed(2)} DT
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-500 hover:text-red-700 focus:outline-none"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="px-6 py-4 bg-gray-50">
                  <div className="flex justify-between items-center">
                    <Button 
                      variant="outline" 
                      size="sm"
                      icon={<ArrowLeft size={16} />}
                      iconPosition="left"
                      onClick={() => window.history.back()}
                    >
                      Continuer vos achats
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={clearCart}
                    >
                      Vider le panier
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Résumé de la commande</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Sous-total</span>
                    <span className="text-gray-800 font-medium">{subtotal.toFixed(2)} DT</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center">
                      <span className="text-gray-600">Livraison</span>
                      <Truck size={14} className="text-blue-600 ml-1" />
                    </div>
                    <span className="text-gray-800 font-medium">{shipping.toFixed(2)} DT</span>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <div className="flex justify-between">
                      <span className="text-gray-800 font-semibold">Total</span>
                      <span className="text-gray-900 font-bold">{total.toFixed(2)} DT</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {/* Promo Code */}
                  <div>
                    <div className="flex">
                      <input
                        type="text"
                        placeholder="Code promo"
                        className="flex-grow rounded-l border border-gray-300 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-orange-500"
                      />
                      <button
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r transition-colors"
                      >
                        Appliquer
                      </button>
                    </div>
                  </div>
                  
                  {/* Checkout Button */}
                  <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    icon={<ShoppingBag size={18} />}
                  >
                    Passer à la caisse
                  </Button>
                  
                  {/* Secure Checkout Note */}
                  <div className="text-center text-xs text-gray-500 mt-4 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Paiement 100% sécurisé
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="mb-6 flex justify-center">
              <ShoppingBag size={64} className="text-gray-300" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Votre panier est vide</h2>
            <p className="text-gray-600 mb-6">
              Vous n'avez pas encore ajouté de produits à votre panier.
            </p>
            <Link to="/products">
              <Button variant="primary" size="lg" icon={<ArrowLeft size={18} />}>
                Continuer vos achats
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
