import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X, Phone, MapPin, ChevronDown } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import MobileMenu from './MobileMenu';
import SearchBar from '../common/SearchBar';
import { categories } from '../../data/categories';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const { cartItems } = useCart();
  const location = useLocation();

  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setShowMobileMenu(false);
    setShowSearch(false);
  }, [location]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300">
      <div className="bg-secondary text-white py-1.5 hidden md:block">
        <div className="container">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <div className="flex items-center text-sm">
                <Phone size={14} className="mr-1.5" />
                <span>+216 71 123 456</span>
              </div>
              <div className="flex items-center text-sm">
                <MapPin size={14} className="mr-1.5" />
                <span>Rue de Tunis, La Marsa</span>
              </div>
            </div>
            <div className="text-sm flex space-x-6">
              <Link to="/login" className="hover:text-primary transition-colors">Mon compte</Link>
              <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </div>

      <div className={`${isScrolled ? 'bg-white shadow-md py-2' : 'bg-white py-4'} transition-all duration-300`}>
        <div className="container">
          <div className="flex items-center justify-between gap-8">
            <Link to="/" className="flex-shrink-0">
              <div className="flex items-center">
                <span className="text-primary font-bold text-3xl">BRICO</span>
                <span className="text-secondary font-bold text-3xl">DIRECT</span>
              </div>
            </Link>

            <div className="flex-grow hidden lg:block">
              <SearchBar />
            </div>

            <div className="flex items-center space-x-5">
              <button 
                onClick={() => setShowSearch(!showSearch)}
                className="p-2 text-gray-700 hover:text-primary transition-colors lg:hidden"
              >
                <Search size={22} />
              </button>
              
              <Link to="/account" className="p-2 text-gray-700 hover:text-primary transition-colors hidden md:block">
                <User size={22} />
              </Link>
              
              <Link to="/cart" className="p-2 text-gray-700 hover:text-primary transition-colors relative">
                <ShoppingCart size={22} />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {itemCount}
                  </span>
                )}
              </Link>
              
              <button 
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="lg:hidden p-2 text-gray-700 hover:text-primary transition-colors"
              >
                {showMobileMenu ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border-y border-gray-200 hidden lg:block">
        <div className="container">
          <nav className="flex items-center">
            {categories.slice(0, 8).map((category) => (
              <div key={category.id} className="group relative">
                <Link 
                  to={`/products?category=${category.id}`}
                  className="flex items-center px-4 py-3 text-gray-700 hover:text-primary font-medium transition-colors"
                >
                  {category.name}
                  {category.subcategories && category.subcategories.length > 0 && (
                    <ChevronDown size={16} className="ml-1.5" />
                  )}
                </Link>
                
                {category.subcategories && category.subcategories.length > 0 && (
                  <div className="absolute left-0 top-full w-56 bg-white shadow-lg rounded-md py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                    {category.subcategories.map((sub) => (
                      <Link 
                        key={sub.id}
                        to={`/products?subcategory=${sub.id}`}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>

      <MobileMenu isOpen={showMobileMenu} />

      <div className={`w-full bg-white shadow-md transition-all duration-300 overflow-hidden lg:hidden ${showSearch ? 'max-h-24' : 'max-h-0'}`}>
        <div className="container py-4">
          <SearchBar />
        </div>
      </div>
    </header>
  );
};

export default Header;
