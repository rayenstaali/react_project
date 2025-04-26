import HeroBanner from '../components/home/HeroBanner';
import FeaturedCategories from '../components/home/FeaturedCategories';
import FeaturedProducts from '../components/home/FeaturedProducts';
import Services from '../components/home/Services';
import { useEffect } from 'react';

const Home = () => {
  // Update page title on mount
  useEffect(() => {
    document.title = 'Brico Direct | Bricolage et Outillage en Tunisie';
  }, []);

  return (
    <div>
      <HeroBanner />
      <FeaturedCategories />
      <FeaturedProducts />
      <Services />
    </div>
  );
};

export default Home;
