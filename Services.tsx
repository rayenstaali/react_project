import { Truck, ShieldCheck, CreditCard, PhoneCall } from 'lucide-react';

const services = [
  {
    id: 1,
    title: 'Livraison Rapide',
    description: 'Livraison partout en Tunisie',
    icon: Truck,
    color: 'text-blue-600',
  },
  {
    id: 2,
    title: 'Paiement Sécurisé',
    description: 'Transactions 100% sécurisées',
    icon: CreditCard,
    color: 'text-green-600',
  },
  {
    id: 3,
    title: 'Garantie Qualité',
    description: 'Produits de qualité garantie',
    icon: ShieldCheck,
    color: 'text-orange-600',
  },
  {
    id: 4,
    title: 'Service Client',
    description: 'Assistance 6j/7',
    icon: PhoneCall,
    color: 'text-purple-600',
  },
];

const Services = () => {
  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div key={service.id} className="flex items-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all duration-300">
              <div className={`${service.color} p-3 rounded-full bg-gray-100 mr-4`}>
                <service.icon size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">{service.title}</h3>
                <p className="text-sm text-gray-600">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
