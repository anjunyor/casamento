export interface Gift {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  status: 'disponível' | 'reservado' | 'comprado';
  reservadoBy?: {
    name: string;
    email: string;
    willBring: boolean;
  };
}

export interface GuestInfo {
  name: string;
  email: string;
  isAdmin?: boolean;
}

export type GiftCategory = 'Cozinha' | 'Quarto' | 'Sala' | 'bathroom' | 'Outros';