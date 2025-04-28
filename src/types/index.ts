export interface Gift {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  status: 'available' | 'reserved' | 'purchased';
  reservedBy?: {
    name: string;
    email: string;
    willBring: boolean;
  };
}

export interface GuestInfo {
  name: string;
  email: string;
}

export type GiftCategory = 'kitchen' | 'bedroom' | 'living' | 'bathroom' | 'other';