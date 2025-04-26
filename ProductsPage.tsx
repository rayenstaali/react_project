import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, ChevronDown, Check } from 'lucide-react';
import ProductCard from '../components/common/ProductCard';
import Button from '../components/common/Button';
import { products } from '../data/products';
import { categories } from '../data/categories';

const sortOptions = [
  { value: 'popularity', label: 'Popularité' },
  { value: 'newest', label: 'Nouveautés' },
  { value: 'price-asc', label: 'Prix croissant' },
  { value: 'price-desc', label: 'Prix décroissant' },
];

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortBy, setSortBy] = useState('popularity');
  
  const categoryParam = searchParams.get('category');
  const searchQuery = searchParams.get('search');
  
  // Update page title and filters based on URL parameters
  useEffect(() => {
    let title = 'Tous les produits | Brico Direct';
    let filtered = [...products];
    
    // Filter by category if specified
    if (categoryParam) {
      const categoryName = categories.find(c => c.id === categoryParam)?.name || '';
      setSelectedCategory(categoryParam);
      if (categoryName) {
        title = `${categoryName} | Brico Direct`;
        filtered = filtered.filter(p => p.categoryId === categoryParam);
      }
    } else {
      setSelectedCategory(null);
    }
    
    // Filter by search query if specified
    if (searchQuery) {
      title = `Résultats pour "${searchQuery}" | Brico Direct`;
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply price filter
    filtered = filtered.filter(p => 
      p.price >= priceRange[0] && p.price <= priceRange[1]
    );
    
    // Apply sorting
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1));
        break;
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      default: // popularity
        filtered.sort((a, b) => (a.isFeatured === b.isFeatured ? 0 : a.isFeatured ? -1 : 1));
    }
    
    setFilteredProducts(filtered);
    document.title = title;
  }, [categoryParam, searchQuery, priceRange, sortBy]);
  
  // Handle price range change
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = parseInt(e.target.value);
    const newRange = [...priceRange] as [number, number];
    newRange[index] = value;
    setPriceRange(newRange);
  };
  
  return (
    <div className="bg-gray-50 pt-[61px]">
      {/* Header */}
      <div className="bg-gray-100 py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-800">
            {searchQuery 
              ? `Résultats pour "${searchQuery}"` 
              : selectedCategory 
                ? categories.find(c => c.id === selectedCategory)?.name 
                : 'Tous les produits'}
          </h1>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters - Mobile Toggle */}
          <div className="lg:hidden mb-4">
            <Button 
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              icon={<Filter size={16} />}
              fullWidth
            >
              Filtres
            </Button>
          </div>
          
          {/* Filters Sidebar */}
          <aside className={`w-full lg:w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-lg shadow-sm p-5">
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-4">Catégories</h3>
                <ul className="space-y-2">
                  {categories.map((category) => (
                    <li key={category.id}>
                      <button
                        onClick={() => setSelectedCategory(category.id)}
                        className={`flex items-center w-full text-left py-1 ${
                          selectedCategory === category.id 
                            ? 'text-orange-600 font-medium' 
                            : 'text-gray-700 hover:text-orange-600'
                        }`}
                      >
                        {selectedCategory === category.id && (
                          <Check size={16} className="mr-1 flex-shrink-0" />
                        )}
                        <span>{category.name}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mb-6 border-t border-gray-200 pt-6">
                <h3 className="font-semibold text-gray-800 mb-4">Prix</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="min-price" className="block text-sm text-gray-600 mb-1">
                      Minimum
                    </label>
                    <input
                      type="range"
                      id="min-price"
                      min="0"
                      max="1000"
                      step="10"
                      value={priceRange[0]}
                      onChange={(e) => handlePriceChange(e, 0)}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="text-sm text-gray-700">{priceRange[0]} DT</span>
                  </div>
                  
                  <div>
                    <label htmlFor="max-price" className="block text-sm text-gray-600 mb-1">
                      Maximum
                    </label>
                    <input
                      type="range"
                      id="max-price"
                      min="0"
                      max="1000"
                      step="10"
                      value={priceRange[1]}
                      onChange={(e) => handlePriceChange(e, 1)}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="text-sm text-gray-700">{priceRange[1]} DT</span>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <Button variant="outline" onClick={() => {
                  setSelectedCategory(null);
                  setPriceRange([0, 1000]);
                }} fullWidth>
                  Réinitialiser les filtres
                </Button>
              </div>
            </div>
          </aside>
          
          {/* Products Content */}
          <div className="flex-grow">
            {/* Sorting Options */}
            <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-lg shadow-sm">
              <div className="text-sm text-gray-600">
                {filteredProducts.length} produits
              </div>
              
              <div className="relative">
                <div className="flex items-center space-x-2">
                  <SlidersHorizontal size={16} className="text-gray-500" />
                  <span className="text-sm text-gray-700">Trier par:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border-none text-sm font-medium text-gray-800 focus:outline-none appearance-none bg-transparent pr-8"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="text-gray-500 absolute right-0" />
                </div>
              </div>
            </div>
            
            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                <h3 className="text-xl font-medium text-gray-800 mb-2">Aucun produit trouvé</h3>
                <p className="text-gray-600 mb-4">
                  Nous n'avons pas trouvé de produits correspondant à vos critères.
                </p>
                <Button 
                  variant="primary"
                  onClick={() => {
                    setSelectedCategory(null);
                    setPriceRange([0, 1000]);
                  }}
                >
                  Réinitialiser les filtres
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
