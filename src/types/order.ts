export interface Order {
  id: string
  items: CartItem[]
  customerInfo: CustomerInfo
  deliveryMethod: 'click-collect' | 'delivery'
  deliveryInfo?: DeliveryInfo
  pickupInfo?: PickupInfo
  total: number
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled'
  createdAt: Date
  paymentStatus: 'pending' | 'paid' | 'failed'
}

export interface CustomerInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
}

export interface DeliveryInfo {
  address: string
  city: string
  postalCode: string
  instructions?: string
  deliveryFee: number
}

export interface PickupInfo {
  date: string
  time: string
}

export interface TimeSlot {
  time: string
  available: boolean
}

import { CartItem } from './product'
