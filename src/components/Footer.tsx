import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-olive text-white py-8 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center mb-4 md:mb-0">
            <img 
              src="https://i.ibb.co/VxKM8Ld/logo.png" 
              alt="J & A" 
              className="h-8 md:h-10"
            />
          </div>
          
          <div className="flex space-x-6">
            <a href="#home" className="hover:text-beige transition-colors">Início</a>
            <a href="#gifts" className="hover:text-beige transition-colors">Presentes</a>
          </div>
        </div>
        
        <div className="border-t border-white/20 pt-6 mt-6">
          <p className="text-center text-sm text-white/70">
            Obrigado por celebrar este momento especial conosco. Agradecemos seu carinho e apoio!
          </p>
          <p className="text-center text-xs text-white/50 mt-2">
            © {new Date().getFullYear()} Lista de Presentes de Noivado - Anderson & Julia
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;