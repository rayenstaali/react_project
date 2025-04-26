import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const banners = [
  {
    id: 1,
    title: "Rénovez votre maison",
    subtitle: "Jusqu'à 30% de réduction sur tous les outils électriques",
    cta: "Découvrir",
    link: "/products?category=outils",
    image: "https://images.pexels.com/photos/1029243/pexels-photo-1029243.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    bgColor: "from-blue-900/80 to-blue-700/80",
  },
  {
    id: 2,
    title: "Nouvel arrivage",
    subtitle: "Découvrez notre nouvelle collection de meubles de jardin",
    cta: "Voir la collection",
    link: "/products?category=jardin",
    image: "https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    bgColor: "from-green-900/80 to-green-700/80",
  },
  {
    id: 3,
    title: "Offres spéciales",
    subtitle: "Profitez de nos offres sur la peinture et tous les accessoires",
    cta: "En savoir plus",
    link: "/products?category=peinture",
    image: "https://images.pexels.com/photos/5691622/pexels-photo-5691622.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    bgColor: "from-orange-900/80 to-orange-600/80",
  },
];

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="relative h-[320px] md:h-[400px] lg:h-[500px] overflow-hidden mt-[61px]">
      {/* Slides */}
      <div className="h-full">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <div className="relative h-full">
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-full object-cover"
              />
              <div className={`absolute inset-0 bg-gradient-to-r ${banner.bgColor} flex items-center`}>
                <div className="container mx-auto px-4">
                  <div className="max-w-xl">
                    <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-4">
                      {banner.title}
                    </h2>
                    <p className="text-white/90 text-base md:text-lg mb-6 md:mb-8">
                      {banner.subtitle}
                    </p>
                    <Link
                      to={banner.link}
                      className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-medium px-6 py-3 rounded transition-colors"
                    >
                      {banner.cta}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 z-20 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white/30 hover:bg-white/50 flex items-center justify-center transition-colors text-white"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 z-20 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white/30 hover:bg-white/50 flex items-center justify-center transition-colors text-white"
      >
        <ChevronRight size={24} />
      </button>
      
      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide ? 'w-6 bg-orange-600' : 'bg-white/60'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroBanner;
