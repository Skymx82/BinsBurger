export interface Product {
  id: string
  name: string
  description?: string
  price: number
  menuPrice?: number
  category: 'sandwich' | 'tacos' | 'baps' | 'burger'
  image?: string
  options?: ProductOption[]
}

export interface ProductOption {
  id: string
  name: string
  type: 'select' | 'checkbox'
  required: boolean
  choices: OptionChoice[]
}

export interface OptionChoice {
  id: string
  name: string
  price: number
}

export interface CartItem {
  product: Product
  quantity: number
  selectedOptions?: { [optionId: string]: string[] }
  isMenu: boolean
  customizations?: {
    sauces: string[]
    boisson?: string
    meats: string[]
  }
}

export interface TacosProduct extends Product {
  size: 'M' | 'L' | 'XL'
  meatCount: 1 | 2 | 3
  availableMeats: string[]
}
