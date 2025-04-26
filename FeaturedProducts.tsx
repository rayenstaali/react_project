import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import ProductCard from '../common/ProductCard';
import { products } from '../../data/products';

const productTabs = [
  { id: 'new', label: 'Nouveautés' },
  { id: 'featured', label: 'Sélection' },
  { id: 'sale', label: 'Promotions' },
];

const FeaturedProducts = () => {
  const [activeTab, setActiveTab] = useState('new');
  
  // Filter products based on tab
  const filteredProducts = products.filter(product => {
    if (activeTab === 'new') return product.isNew;
    if (activeTab === 'featured') return product.isFeatured;
    if (activeTab === 'sale') return product.discount > 0;
    return true;
  }).slice(0, 8);
  
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-0">Nos Produits</h2>
          
          {/* Tabs */}
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-md">
            {productTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === tab.id
                    ? 'bg-white text-orange-600 shadow-sm'
                    : 'text-gray-700 hover:text-orange-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {/* View All Link */}
        <div className="mt-8 text-center">
          <Link
            to="/products"
            className="inline-flex items-center text-orange-600 font-medium hover:text-orange-700"
          >
            Voir tous les produits
            <ChevronRight size={16} className="ml-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
