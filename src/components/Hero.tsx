import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative h-[70vh] bg-olive/5 overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ 
          backgroundImage: "url('https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')"
        }}
      ></div>
      
      <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
        <div className="animate-fadeIn">
          <img 
            src="https://i.ibb.co/WW9sfDgg/logo.jpg" 
            alt="J & A" 
            className="h-24 md:h-32 mx-auto mb-6"
          />
          
          <p className="text-xl md:text-2xl font-light text-gray-700 mb-6">
            Nosso Noivado
          </p>
          
          <div className="flex justify-center">
            <div className="border-l-2 border-r-2 border-olive px-6 py-2 mb-8">
              <p className="text-lg font-medium text-gray-800">Junho 01, 2025</p>
            </div>
          </div>
          
          <p className="max-w-2xl mx-auto text-gray-600 mb-8">
          Obrigado por celebrar esse momento tão especial conosco. Criamos esta lista de presentes para facilitar a escolha de quem quiser nos presentear. Navegue pela nossa seleção de itens e escolha aqueles que gostaria de nos oferecer.
          </p>
          
          <a 
            href="#gifts" 
            className="inline-block bg-olive hover:bg-olive-dark text-white font-medium py-3 px-8 rounded-md transition-all hover:shadow-lg transform hover:-translate-y-1"
          >
            Ver Lista de Presentes
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;