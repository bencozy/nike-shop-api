export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  sizes: number[];
  colors: string[];
  category: string;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  size: number;
  color: string;
  quantity: number;
}

export interface ShippingAddress {
  fullName: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  shippingAddress: ShippingAddress;
  subtotal: number;
  shippingFee: number;
  total: number;
  status: 'paid';
  createdAt: string;
}

export const SEED_PRODUCTS: Product[] = [
  {
    id: 'nk-001',
    name: 'Air Force 1 \'07',
    description: 'The radiance lives on in the Nike Air Force 1 \'07, the basketball original that puts a fresh spin on what you know best.',
    price: 115,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80',
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12],
    colors: ['White', 'Black', 'Triple White'],
    category: 'Lifestyle',
  },
  {
    id: 'nk-002',
    name: 'Air Max 90',
    description: 'Nothing as fly, nothing as comfortable, nothing as proven—the Nike Air Max 90 stays true to its roots with the iconic Waffle sole.',
    price: 130,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
    sizes: [7, 8, 8.5, 9, 9.5, 10, 11, 12],
    colors: ['Infrared', 'Black/White', 'Photon Dust'],
    category: 'Lifestyle',
  },
  {
    id: 'nk-003',
    name: 'Dunk Low Retro',
    description: 'Created for the hardwood but taken to the streets, the Nike Dunk Low Retro returns with crisp overlays and classic team colors.',
    price: 115,
    image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800&q=80',
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11],
    colors: ['Panda', 'University Blue', 'Grey Fog'],
    category: 'Lifestyle',
  },
  {
    id: 'nk-004',
    name: 'Pegasus 41',
    description: 'Responsive cushioning and a breathable upper make the Nike Pegasus 41 a daily trainer built for miles.',
    price: 140,
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80',
    sizes: [8, 8.5, 9, 9.5, 10, 10.5, 11, 12, 13],
    colors: ['Black/Volt', 'White/Blue', 'Hot Punch'],
    category: 'Running',
  },
  {
    id: 'nk-005',
    name: 'Air Jordan 1 Mid',
    description: 'Inspired by the original AJ1, the Air Jordan 1 Mid offers clean, classic looks and premium comfort for everyday wear.',
    price: 125,
    image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800&q=80',
    sizes: [7, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12],
    colors: ['Black/White', 'Chicago', 'Royal Blue'],
    category: 'Basketball',
  },
  {
    id: 'nk-006',
    name: 'Blazer Mid \'77 Vintage',
    description: 'The Nike Blazer Mid \'77 Vintage brings old-school basketball style to the streets with a vintage midsole finish.',
    price: 105,
    image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&q=80',
    sizes: [7, 8, 9, 9.5, 10, 11, 12],
    colors: ['White/Black', 'Sail', 'University Red'],
    category: 'Lifestyle',
  },
  {
    id: 'nk-007',
    name: 'Metcon 9',
    description: 'Stable, durable, and ready for HIIT—the Nike Metcon 9 is built for the gym and the WOD.',
    price: 150,
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80',
    sizes: [8, 8.5, 9, 9.5, 10, 10.5, 11, 12],
    colors: ['Black/White', 'Particle Grey', 'Hyper Pink'],
    category: 'Training',
  },
  {
    id: 'nk-008',
    name: 'React Infinity Run 4',
    description: 'Soft React foam and a rockered shape help you stay comfortable on long runs with the Nike React Infinity Run 4.',
    price: 160,
    image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&q=80',
    sizes: [7, 8, 8.5, 9, 9.5, 10, 11, 12, 13],
    colors: ['Black', 'Pure Platinum', 'Bright Crimson'],
    category: 'Running',
  },
];
