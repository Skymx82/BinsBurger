import { Product } from '@/types/product'

export const products: Product[] = [
  // Sandwichs
  {
    id: 'sandwich-kebab',
    name: 'Sandwich Kebab',
    description: 'Veau, dinde',
    price: 5.00,
    menuPrice: 6.00,
    category: 'sandwich',
    image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=400&h=300&fit=crop'
  },
  {
    id: 'sandwich-steak',
    name: 'Sandwich Steak du boucher',
    description: 'Viande bovine France',
    price: 5.00,
    menuPrice: 6.00,
    category: 'sandwich',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop'
  },
  {
    id: 'sandwich-kefta',
    name: 'Sandwich Kefta',
    description: 'Viande du boucher, origine France',
    price: 5.00,
    menuPrice: 6.00,
    category: 'sandwich',
    image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&h=300&fit=crop'
  },
  {
    id: 'sandwich-tender',
    name: 'Sandwich Tender',
    description: 'Blanc de poulet pané, chapelure Kellogg\'s',
    price: 5.00,
    menuPrice: 6.00,
    category: 'sandwich',
    image: 'https://images.unsplash.com/photo-1551782450-17144efb9c50?w=400&h=300&fit=crop'
  },
  {
    id: 'sandwich-chicken',
    name: 'Sandwich Chicken',
    description: 'Blanc de poulet mariné maison',
    price: 5.00,
    menuPrice: 6.00,
    category: 'sandwich',
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400&h=300&fit=crop'
  },

  // Tacos L
  {
    id: 'tacos-m-1-viande',
    name: 'Tacos M (1 viande)',
    description: 'Choix parmi : kebab, poulet, steak, kefta, cordon bleu, tender, nuggets',
    price: 5.50,
    menuPrice: 6.50,
    category: 'tacos',
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=300&fit=crop',
    options: [
      {
        id: 'meat-choice',
        name: 'Choix de la viande',
        type: 'select',
        required: true,
        choices: [
          { id: 'kebab', name: 'Kebab', price: 0 },
          { id: 'poulet', name: 'Poulet', price: 0 },
          { id: 'steak', name: 'Steak', price: 0 },
          { id: 'kefta', name: 'Kefta', price: 0 },
          { id: 'cordon-bleu', name: 'Cordon bleu', price: 0 },
          { id: 'tender', name: 'Tender', price: 0 },
          { id: 'nuggets', name: 'Nuggets', price: 0 }
        ]
      }
    ]
  },
  {
    id: 'tacos-l-2-viandes',
    name: 'Tacos L (2 viandes)',
    description: 'Choix parmi : kebab, poulet, steak, kefta, cordon bleu, tender, nuggets',
    price: 6.00,
    menuPrice: 7.00,
    category: 'tacos',
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=300&fit=crop',
    options: [
      {
        id: 'meat-choice-1',
        name: 'Première viande',
        type: 'select',
        required: true,
        choices: [
          { id: 'kebab', name: 'Kebab', price: 0 },
          { id: 'poulet', name: 'Poulet', price: 0 },
          { id: 'steak', name: 'Steak', price: 0 },
          { id: 'kefta', name: 'Kefta', price: 0 },
          { id: 'cordon-bleu', name: 'Cordon bleu', price: 0 },
          { id: 'tender', name: 'Tender', price: 0 },
          { id: 'nuggets', name: 'Nuggets', price: 0 }
        ]
      },
      {
        id: 'meat-choice-2',
        name: 'Deuxième viande',
        type: 'select',
        required: true,
        choices: [
          { id: 'kebab', name: 'Kebab', price: 0 },
          { id: 'poulet', name: 'Poulet', price: 0 },
          { id: 'steak', name: 'Steak', price: 0 },
          { id: 'kefta', name: 'Kefta', price: 0 },
          { id: 'cordon-bleu', name: 'Cordon bleu', price: 0 },
          { id: 'tender', name: 'Tender', price: 0 },
          { id: 'nuggets', name: 'Nuggets', price: 0 }
        ]
      }
    ]
  },

  // Tacos XL
  {
    id: 'tacos-xl-3-viandes',
    name: 'Tacos XL (3 viandes)',
    description: 'Choix parmi : kebab, poulet, steak, kefta, cordon bleu, tender, nuggets',
    price: 8.50,
    menuPrice: 9.00,
    category: 'tacos',
    image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400&h=300&fit=crop',
    options: [
      {
        id: 'meat-choice-1',
        name: 'Première viande',
        type: 'select',
        required: true,
        choices: [
          { id: 'kebab', name: 'Kebab', price: 0 },
          { id: 'poulet', name: 'Poulet', price: 0 },
          { id: 'steak', name: 'Steak', price: 0 },
          { id: 'kefta', name: 'Kefta', price: 0 },
          { id: 'cordon-bleu', name: 'Cordon bleu', price: 0 },
          { id: 'tender', name: 'Tender', price: 0 },
          { id: 'nuggets', name: 'Nuggets', price: 0 }
        ]
      },
      {
        id: 'meat-choice-2',
        name: 'Deuxième viande',
        type: 'select',
        required: true,
        choices: [
          { id: 'kebab', name: 'Kebab', price: 0 },
          { id: 'poulet', name: 'Poulet', price: 0 },
          { id: 'steak', name: 'Steak', price: 0 },
          { id: 'kefta', name: 'Kefta', price: 0 },
          { id: 'cordon-bleu', name: 'Cordon bleu', price: 0 },
          { id: 'tender', name: 'Tender', price: 0 },
          { id: 'nuggets', name: 'Nuggets', price: 0 }
        ]
      },
      {
        id: 'meat-choice-3',
        name: 'Troisième viande',
        type: 'select',
        required: true,
        choices: [
          { id: 'kebab', name: 'Kebab', price: 0 },
          { id: 'poulet', name: 'Poulet', price: 0 },
          { id: 'steak', name: 'Steak', price: 0 },
          { id: 'kefta', name: 'Kefta', price: 0 },
          { id: 'cordon-bleu', name: 'Cordon bleu', price: 0 },
          { id: 'tender', name: 'Tender', price: 0 },
          { id: 'nuggets', name: 'Nuggets', price: 0 }
        ]
      }
    ]
  },

  // Bap's
  {
    id: 'chicken-baps',
    name: 'Chicken Bap\'s',
    description: 'Galette de pomme de terre + chicken pané',
    price: 6.00,
    menuPrice: 7.00,
    category: 'baps',
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop'
  },
  {
    id: 'baps-steak',
    name: 'Bap\'s Steak',
    description: 'Galette McCain + steak haché',
    price: 6.00,
    menuPrice: 7.00,
    category: 'baps',
    image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=400&h=300&fit=crop'
  },

  // Burger
  {
    id: 'chicken-burger',
    name: 'Chicken Burger',
    description: 'Poulet pané',
    price: 5.50,
    menuPrice: 6.00,
    category: 'burger',
    image: 'https://images.unsplash.com/photo-1571091655789-405eb7a3a3a8?w=400&h=300&fit=crop'
  }
]

export const categories = [
  { id: 'sandwich', name: 'Sandwichs', icon: '🥙' },
  { id: 'tacos', name: 'Tacos', icon: '🌮' },
  { id: 'baps', name: 'Bap\'s', icon: '🍟' },
  { id: 'burger', name: 'Burgers', icon: '🍔' }
]
