export interface Dinosaur {
  id?: number;
  name: string;
  species: string;
  period: string;
  diet: 'Herbívoro' | 'Carnívoro' | 'Omnívoro';
  length: number; // in meters
  weight: number; // in tons
  description?: string;
  imageUrl?: string;
}
