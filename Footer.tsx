import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';
import { categories } from '../../data/categories';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter */}
      <div className="bg-primary py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold">Inscrivez-vous à notre newsletter</h3>
              <p className="text-white/90 mt-1">Recevez nos offres et nos nouveautés directement dans votre boîte mail</p>
            </div>
            <div className="w-full md:w-auto">
              <form className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  placeholder="Votre adresse email" 
                  className="px-4 py-3 rounded text-gray-800 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-white/20"
                />
                <button 
                  type="submit" 
                  className="px-6 py-3 bg-white text-primary font-medium rounded hover:bg-gray-100 transition-colors"
                >
                  S'inscrire
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4">BRICO<span className="text-primary">DIRECT</span></h4>
            <p className="text-gray-400 mb-4">
              Votre partenaire en ligne pour tout ce qui concerne le bricolage, l'outillage, et l'aménagement 
              de votre maison et jardin en Tunisie.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-white hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-primary transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          {/* Categories */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Catégories</h4>
            <ul className="space-y-2">
              {categories.slice(0, 6).map((category) => (
                <li key={category.id}>
                  <Link 
                    to={`/products?category=${category.id}`} 
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Information */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Information</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-primary transition-colors">
                  À propos de nous
                </Link>
              </li>
              <li>
                <Link to="/delivery" className="text-gray-400 hover:text-primary transition-colors">
                  Livraison
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-primary transition-colors">
                  Conditions générales
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-primary transition-colors">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="text-primary mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-400">Rue de Tunis, La Marsa, Tunisie</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="text-primary mr-2 flex-shrink-0" />
                <a href="tel:+21671123456" className="text-gray-400 hover:text-primary transition-colors">
                  +216 71 123 456
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="text-primary mr-2 flex-shrink-0" />
                <a href="mailto:contact@brico-direct.tn" className="text-gray-400 hover:text-primary transition-colors">
                  contact@brico-direct.tn
                </a>
              </li>
            </ul>
            <div className="mt-4">
              <h5 className="font-medium mb-2 text-white">Heures d'ouverture</h5>
              <p className="text-gray-400">
                Lundi - Vendredi: 9h00 - 19h00<br />
                Samedi: 9h00 - 13h00
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="border-t border-gray-800 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Brico Direct. Tous droits réservés.
            </p>
            <div className="flex items-center space-x-2">
              <img src="https://images.pexels.com/photos/4482900/pexels-photo-4482900.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Visa" className="h-8 rounded" />
              <img src="https://images.pexels.com/photos/4482900/pexels-photo-4482900.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Mastercard" className="h-8 rounded" />
              <img src="https://images.pexels.com/photos/4482900/pexels-photo-4482900.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="D17" className="h-8 rounded" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
