import { Order } from '@/types/order'

// Données simulées pour l'admin (en attendant une vraie BDD)
export const mockOrders: Order[] = [
  {
    id: 'BIN001234',
    items: [
      {
        product: {
          id: 'tacos-l-2-viandes',
          name: 'Tacos L (2 viandes)',
          description: 'Kebab + Poulet',
          price: 6.00,
          menuPrice: 7.00,
          category: 'tacos' as const,
        },
        quantity: 1,
        isMenu: true,
        customizations: {
          sauces: ['harissa', 'mayo'],
          boisson: 'coca',
          meats: ['kebab', 'poulet']
        }
      },
      {
        product: {
          id: 'sandwich-kebab',
          name: 'Sandwich Kebab',
          description: 'Veau, dinde',
          price: 5.00,
          menuPrice: 6.00,
          category: 'sandwich' as const,
        },
        quantity: 2,
        isMenu: false,
        customizations: {
          sauces: ['algérienne'],
          meats: [],
          boisson: undefined
        }
      }
    ],
    customerInfo: {
      firstName: 'Jean',
      lastName: 'Dupont',
      email: 'jean.dupont@email.com',
      phone: '06 12 34 56 78'
    },
    deliveryMethod: 'click-collect',
    pickupInfo: {
      date: new Date().toISOString(),
      time: '12:30'
    },
    total: 17.00,
    status: 'pending',
    createdAt: new Date(Date.now() - 10 * 60 * 1000), // Il y a 10 minutes
    paymentStatus: 'paid'
  },
  {
    id: 'BIN001235',
    items: [
      {
        product: {
          id: 'chicken-burger',
          name: 'Chicken Burger',
          description: 'Poulet pané',
          price: 5.50,
          menuPrice: 6.00,
          category: 'burger' as const,
        },
        quantity: 1,
        isMenu: true,
        customizations: {
          sauces: ['barbecue', 'mayo'],
          boisson: 'sprite',
          meats: []
        }
      }
    ],
    customerInfo: {
      firstName: 'Marie',
      lastName: 'Martin',
      email: 'marie.martin@email.com',
      phone: '06 98 76 54 32'
    },
    deliveryMethod: 'delivery',
    deliveryInfo: {
      address: '15 rue de la Paix',
      city: 'Bergerac',
      postalCode: '24100',
      instructions: 'Sonner à l\'interphone',
      deliveryFee: 3.00
    },
    total: 9.00,
    status: 'preparing',
    createdAt: new Date(Date.now() - 25 * 60 * 1000), // Il y a 25 minutes
    paymentStatus: 'paid'
  },
  {
    id: 'BIN001236',
    items: [
      {
        product: {
          id: 'tacos-xl-3-viandes',
          name: 'Tacos XL (3 viandes)',
          description: 'Kebab + Poulet + Steak',
          price: 8.50,
          menuPrice: 9.00,
          category: 'tacos' as const,
        },
        quantity: 1,
        isMenu: true,
        customizations: {
          sauces: ['harissa', 'blanche', 'samourai'],
          boisson: 'coca-zero',
          meats: ['kebab', 'poulet', 'steak']
        }
      }
    ],
    customerInfo: {
      firstName: 'Pierre',
      lastName: 'Durand',
      email: 'pierre.durand@email.com',
      phone: '06 11 22 33 44'
    },
    deliveryMethod: 'click-collect',
    pickupInfo: {
      date: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // Dans 30 minutes
      time: '13:00'
    },
    total: 9.00,
    status: 'ready',
    createdAt: new Date(Date.now() - 45 * 60 * 1000), // Il y a 45 minutes
    paymentStatus: 'paid'
  }
]

// Fonction pour ajouter une nouvelle commande (simulation)
export const addOrder = (order: Order) => {
  mockOrders.unshift(order) // Ajouter au début
}

// Fonction pour mettre à jour le statut d'une commande
export const updateOrderStatus = (orderId: string, status: Order['status']) => {
  const orderIndex = mockOrders.findIndex(order => order.id === orderId)
  if (orderIndex !== -1) {
    mockOrders[orderIndex].status = status
  }
}
