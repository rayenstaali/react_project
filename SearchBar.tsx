import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/products?search=${encodeURIComponent(query.trim())}`);
      setQuery('');
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full">
      <input
        type="text"
        placeholder="Rechercher un produit..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-4 py-2.5 pl-11 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-sm"
      />
      <Search 
        size={18} 
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" 
      />
      <button
        type="submit"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary hover:bg-primary-dark text-white px-4 py-1.5 rounded text-sm transition-colors"
      >
        Rechercher
      </button>
    </form>
  );
};

export default SearchBar;
