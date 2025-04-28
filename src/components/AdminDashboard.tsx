import React from 'react';
import { useGiftContext } from '../context/GiftContext';

const AdminDashboard: React.FC = () => {
  const { gifts } = useGiftContext();

  const giftStats = {
    total: gifts.length,
    available: gifts.filter(g => g.status === 'available').length,
    reserved: gifts.filter(g => g.status === 'reserved').length,
    purchased: gifts.filter(g => g.status === 'purchased').length
  };

  const reservedGifts = gifts.filter(g => g.status !== 'available');

  const translateCategory = (category: string) => {
    const translations: { [key: string]: string } = {
      'kitchen': 'Cozinha',
      'bedroom': 'Quarto',
      'living': 'Sala',
      'bathroom': 'Banheiro',
      'other': 'Outros'
    };
    return translations[category] || category;
  };

  return (
    <section className="py-8 px-4 bg-beige/50">
      <div className="container mx-auto">
        <h2 className="text-2xl font-serif font-bold text-olive mb-6">Painel de Controle</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="text-sm text-gray-600 mb-1">Total de Presentes</h3>
            <p className="text-2xl font-bold text-olive">{giftStats.total}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="text-sm text-gray-600 mb-1">Disponíveis</h3>
            <p className="text-2xl font-bold text-olive-light">{giftStats.available}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="text-sm text-gray-600 mb-1">Reservados</h3>
            <p className="text-2xl font-bold text-yellow-600">{giftStats.reserved}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="text-sm text-gray-600 mb-1">Comprados</h3>
            <p className="text-2xl font-bold text-green-600">{giftStats.purchased}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-olive">Presentes Reservados e Comprados</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-olive/5">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-olive">Presente</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-olive">Convidado</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-olive">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-olive">Método</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-olive">Preço</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {reservedGifts.map((gift) => (
                  <tr key={gift.id} className="hover:bg-beige/30">
                    <td className="px-4 py-3 text-sm text-gray-900">{gift.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {gift.reservedBy?.name}
                      <br />
                      <span className="text-xs text-gray-500">{gift.reservedBy?.email}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${gift.status === 'purchased' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {gift.status === 'purchased' ? 'Comprado' : 'Reservado'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {gift.reservedBy?.willBring ? 'Vai levar' : 'Vai comprar'}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-right">
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      }).format(gift.price)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;