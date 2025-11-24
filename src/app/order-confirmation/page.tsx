'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, Clock, Truck } from 'lucide-react'

export default function OrderConfirmationPage() {
  const router = useRouter()
  const [orderData, setOrderData] = useState<any>(null)

  useEffect(() => {
    // Attendre un peu pour laisser le temps à Stripe de sauvegarder
    const timer = setTimeout(() => {
      const savedOrder = localStorage.getItem('pendingOrder')
      if (savedOrder) {
        setOrderData(JSON.parse(savedOrder))
        // Nettoyer le panier et la commande en attente
        localStorage.removeItem('cart')
        localStorage.removeItem('pendingOrder')
      } else {
        console.log('Aucune commande trouvée, redirection vers accueil')
        router.push('/')
      }
    }, 100) // Attendre 100ms

    return () => clearTimeout(timer)
  }, [router])

  if (!orderData) {
    return <div>Chargement...</div>
  }

  const orderId = `BIN${Date.now().toString().slice(-6)}`

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemsCount={0} />
      
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-foreground mb-2">Commande confirmée !</h1>
          <p className="text-muted-foreground">
            Votre commande #{orderId} a été reçue et est en cours de préparation.
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              {orderData.deliveryMethod === 'click-collect' ? (
                <>
                  <Clock className="h-5 w-5" />
                  <span>Click & Collect</span>
                </>
              ) : (
                <>
                  <Truck className="h-5 w-5" />
                  <span>Livraison</span>
                </>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {orderData.deliveryMethod === 'click-collect' ? (
              <div>
                <p className="font-semibold">Récupération prévue :</p>
                <p>{new Date(orderData.pickupInfo.date).toLocaleDateString('fr-FR', { 
                  weekday: 'long', 
                  day: 'numeric', 
                  month: 'long' 
                })} à {orderData.pickupInfo.time}</p>
                <p className="text-sm text-gray-600 mt-2">
                  📍 Le Bin's Burger<br />
                  27 Cours Alsace Lorraine, 24100 Bergerac
                </p>
              </div>
            ) : (
              <div>
                <p className="font-semibold">Livraison à :</p>
                <p>{orderData.deliveryInfo.address}</p>
                <p>{orderData.deliveryInfo.postalCode} {orderData.deliveryInfo.city}</p>
                {orderData.deliveryInfo.instructions && (
                  <p className="text-sm text-gray-600 mt-2">
                    Instructions : {orderData.deliveryInfo.instructions}
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Récapitulatif de la commande</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {orderData.cart.map((item: any, index: number) => (
                <div key={index} className="flex justify-between">
                  <div>
                    <span className="font-medium">
                      {item.quantity}x {item.product.name}
                      {item.isMenu && ' (Menu)'}
                    </span>
                    {item.customizations && (
                      <div className="text-sm text-gray-600">
                        {item.customizations.meats.length > 0 && (
                          <div>• {item.customizations.meats.join(', ')}</div>
                        )}
                        {item.customizations.sauces.length > 0 && (
                          <div>• {item.customizations.sauces.join(', ')}</div>
                        )}
                        {item.customizations.boisson && (
                          <div>• {item.customizations.boisson}</div>
                        )}
                      </div>
                    )}
                  </div>
                  <span className="font-medium">
                    {((item.isMenu ? item.product.menuPrice || item.product.price : item.product.price) * item.quantity).toFixed(2)} €
                  </span>
                </div>
              ))}
              
              <div className="border-t pt-3 font-bold text-lg">
                <div className="flex justify-between">
                  <span>Total payé</span>
                  <span>{orderData.total.toFixed(2)} €</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Informations de contact</CardTitle>
          </CardHeader>
          <CardContent>
            <p><strong>Nom :</strong> {orderData.customerInfo.firstName} {orderData.customerInfo.lastName}</p>
            <p><strong>Email :</strong> {orderData.customerInfo.email}</p>
            <p><strong>Téléphone :</strong> {orderData.customerInfo.phone}</p>
          </CardContent>
        </Card>

        <div className="text-center space-y-4">
          <p className="text-gray-600">
            Vous recevrez un SMS de confirmation quand votre commande sera prête.
          </p>
          
          <div className="space-x-4">
            <Button onClick={() => router.push('/')} variant="outline">
              Nouvelle commande
            </Button>
            <Button onClick={() => window.print()} className="bg-red-600 hover:bg-red-700">
              Imprimer le reçu
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
