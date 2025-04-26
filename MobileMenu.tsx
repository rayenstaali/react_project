import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { categories } from '../../data/categories';

interface MobileMenuProps {
  isOpen: boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen }) => {
  return (
    <div className={`fixed top-[61px] left-0 w-full h-[calc(100vh-61px)] bg-white z-50 transition-transform duration-300 transform lg:hidden overflow-auto ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="px-4 py-4">
        <div className="mb-4 pb-2 border-b border-gray-200">
          <Link to="/login" className="flex items-center py-3 text-gray-800 hover:text-orange-600">
            <span className="font-medium">Mon Compte</span>
            <ChevronRight size={20} className="ml-auto" />
          </Link>
        </div>
        
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Catégories</h3>
          <ul>
            {categories.map((category) => (
              <li key={category.id} className="border-b border-gray-100 last:border-b-0">
                <Link 
                  to={`/products?category=${category.id}`}
                  className="flex items-center py-3 text-gray-800 hover:text-orange-600"
                >
                  <span>{category.name}</span>
                  <ChevronRight size={20} className="ml-auto" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="space-y-3 mt-6">
          <Link 
            to="/contact"
            className="block w-full py-3 px-4 text-center font-medium text-gray-800 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Contact
          </Link>
          
          <a 
            href="tel:+21671123456"
            className="block w-full py-3 px-4 text-center font-medium text-white bg-orange-600 rounded-md hover:bg-orange-700"
          >
            +216 71 123 456
          </a>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
