'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { CustomerInfo, DeliveryInfo, PickupInfo } from '@/types/order'
import { CartItem } from '@/types/product'
import { generateTimeSlots, getAvailableDates } from '@/data/timeSlots'
import StripePaymentForm from '@/components/StripePaymentForm'
import { Truck, Clock, CreditCard } from 'lucide-react'

export default function CheckoutPage() {
  const router = useRouter()
  const [cart, setCart] = useState<CartItem[]>([])
  const [deliveryMethod, setDeliveryMethod] = useState<'click-collect' | 'delivery'>('click-collect')
  
  // Informations client
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  })
  
  // Informations livraison
  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo>({
    address: '',
    city: 'Bergerac',
    postalCode: '24100',
    instructions: '',
    deliveryFee: 3.00
  })
  
  // Informations click & collect
  const [pickupInfo, setPickupInfo] = useState<PickupInfo>({
    date: '',
    time: ''
  })
  
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [availableSlots, setAvailableSlots] = useState<any[]>([])
  const [showPayment, setShowPayment] = useState(false)

  // Charger le panier depuis localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    } else {
      router.push('/')
    }
  }, [router])

  // Générer les créneaux quand une date est sélectionnée
  useEffect(() => {
    if (selectedDate) {
      const slots = generateTimeSlots(selectedDate)
      setAvailableSlots(slots)
    }
  }, [selectedDate])

  const availableDates = getAvailableDates()
  
  const subtotal = cart.reduce((total, item) => {
    const price = item.isMenu ? item.product.menuPrice || item.product.price : item.product.price
    return total + price * item.quantity
  }, 0)
  
  const deliveryFee = deliveryMethod === 'delivery' ? deliveryInfo.deliveryFee : 0
  const total = subtotal + deliveryFee

  const isFormValid = () => {
    const customerValid = customerInfo.firstName && customerInfo.lastName && 
                         customerInfo.email && customerInfo.phone
    
    if (deliveryMethod === 'delivery') {
      return customerValid && deliveryInfo.address && deliveryInfo.city && deliveryInfo.postalCode
    } else {
      return customerValid && pickupInfo.date && pickupInfo.time
    }
  }

  const handleDateChange = (dateString: string) => {
    const date = new Date(dateString)
    setSelectedDate(date)
    setPickupInfo({ ...pickupInfo, date: dateString, time: '' })
  }

  const handleProceedToPayment = () => {
    if (!isFormValid()) return
    setShowPayment(true)
  }

  const getOrderData = () => ({
    cart,
    customerInfo,
    deliveryMethod,
    deliveryInfo: deliveryMethod === 'delivery' ? deliveryInfo : undefined,
    pickupInfo: deliveryMethod === 'click-collect' ? pickupInfo : undefined,
    total
  })

  if (cart.length === 0) {
    return <div>Chargement...</div>
  }

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemsCount={cart.reduce((total, item) => total + item.quantity, 0)} />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-8">Finaliser la commande</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulaire de commande */}
          <div className="space-y-6">
            {/* Informations client */}
            <Card>
              <CardHeader>
                <CardTitle>Vos informations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">Prénom *</Label>
                    <Input
                      id="firstName"
                      value={customerInfo.firstName}
                      onChange={(e) => setCustomerInfo({...customerInfo, firstName: e.target.value})}
                      placeholder="Votre prénom"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Nom *</Label>
                    <Input
                      id="lastName"
                      value={customerInfo.lastName}
                      onChange={(e) => setCustomerInfo({...customerInfo, lastName: e.target.value})}
                      placeholder="Votre nom"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                    placeholder="votre@email.com"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Téléphone *</Label>
                  <Input
                    id="phone"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                    placeholder="06 XX XX XX XX"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Mode de récupération */}
            <Card>
              <CardHeader>
                <CardTitle>Mode de récupération</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={deliveryMethod} onValueChange={(value: 'click-collect' | 'delivery') => setDeliveryMethod(value)}>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg">
                    <RadioGroupItem value="click-collect" id="click-collect" />
                    <Label htmlFor="click-collect" className="flex items-center space-x-2 cursor-pointer flex-1">
                      <Clock className="h-5 w-5" />
                      <div>
                        <div className="font-semibold">Click & Collect</div>
                        <div className="text-sm text-gray-600">Récupération au restaurant - Gratuit</div>
                      </div>
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2 p-4 border rounded-lg">
                    <RadioGroupItem value="delivery" id="delivery" />
                    <Label htmlFor="delivery" className="flex items-center space-x-2 cursor-pointer flex-1">
                      <Truck className="h-5 w-5" />
                      <div>
                        <div className="font-semibold">Livraison</div>
                        <div className="text-sm text-gray-600">Livraison à domicile - {deliveryInfo.deliveryFee.toFixed(2)} €</div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Créneaux Click & Collect */}
            {deliveryMethod === 'click-collect' && (
              <Card>
                <CardHeader>
                  <CardTitle>Choisir un créneau</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Date de récupération *</Label>
                    <Select onValueChange={handleDateChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choisir une date" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableDates.map((date, index) => (
                          <SelectItem key={index} value={date.toISOString()}>
                            {date.toLocaleDateString('fr-FR', { 
                              weekday: 'long', 
                              day: 'numeric', 
                              month: 'long' 
                            })}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {selectedDate && (
                    <div>
                      <Label>Heure de récupération *</Label>
                      <Select onValueChange={(value) => setPickupInfo({...pickupInfo, time: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choisir une heure" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableSlots.map((slot, index) => (
                            <SelectItem 
                              key={index} 
                              value={slot.time}
                              disabled={!slot.available}
                            >
                              {slot.time} {!slot.available && '(Indisponible)'}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Adresse de livraison */}
            {deliveryMethod === 'delivery' && (
              <Card>
                <CardHeader>
                  <CardTitle>Adresse de livraison</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="address">Adresse *</Label>
                    <Input
                      id="address"
                      value={deliveryInfo.address}
                      onChange={(e) => setDeliveryInfo({...deliveryInfo, address: e.target.value})}
                      placeholder="Numéro et nom de rue"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">Ville *</Label>
                      <Input
                        id="city"
                        value={deliveryInfo.city}
                        onChange={(e) => setDeliveryInfo({...deliveryInfo, city: e.target.value})}
                        placeholder="Bergerac"
                      />
                    </div>
                    <div>
                      <Label htmlFor="postalCode">Code postal *</Label>
                      <Input
                        id="postalCode"
                        value={deliveryInfo.postalCode}
                        onChange={(e) => setDeliveryInfo({...deliveryInfo, postalCode: e.target.value})}
                        placeholder="24100"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="instructions">Instructions de livraison</Label>
                    <Textarea
                      id="instructions"
                      value={deliveryInfo.instructions}
                      onChange={(e) => setDeliveryInfo({...deliveryInfo, instructions: e.target.value})}
                      placeholder="Étage, code d'accès, etc."
                    />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Récapitulatif de commande */}
          <div>
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Récapitulatif</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cart.map((item, index) => (
                  <div key={index} className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="font-medium">
                        {item.quantity}x {item.product.name}
                        {item.isMenu && ' (Menu)'}
                      </div>
                      {item.customizations && (
                        <div className="text-sm text-gray-600 mt-1">
                          {item.customizations.meats.length > 0 && (
                            <div>Viandes: {item.customizations.meats.join(', ')}</div>
                          )}
                          {item.customizations.sauces.length > 0 && (
                            <div>Sauces: {item.customizations.sauces.join(', ')}</div>
                          )}
                          {item.customizations.boisson && (
                            <div>Boisson: {item.customizations.boisson}</div>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="font-medium">
                      {((item.isMenu ? item.product.menuPrice || item.product.price : item.product.price) * item.quantity).toFixed(2)} €
                    </div>
                  </div>
                ))}
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Sous-total</span>
                    <span>{subtotal.toFixed(2)} €</span>
                  </div>
                  
                  {deliveryMethod === 'delivery' && (
                    <div className="flex justify-between">
                      <span>Frais de livraison</span>
                      <span>{deliveryFee.toFixed(2)} €</span>
                    </div>
                  )}
                  
                  <Separator />
                  
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>{total.toFixed(2)} €</span>
                  </div>
                </div>
                
                {!showPayment ? (
                  <Button 
                    onClick={handleProceedToPayment}
                    disabled={!isFormValid()}
                    className="w-full bg-red-600 hover:bg-red-700"
                    size="lg"
                  >
                    <CreditCard className="h-5 w-5 mr-2" />
                    Procéder au paiement
                  </Button>
                ) : (
                  <StripePaymentForm 
                    orderData={getOrderData()} 
                    total={total} 
                  />
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
