'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  useStripe,
  useElements,
  PaymentElement,
  Elements
} from '@stripe/react-stripe-js'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, CreditCard } from 'lucide-react'
import stripePromise from '@/lib/stripe'

interface PaymentFormProps {
  clientSecret: string
  orderData: any
  total: number
}

function PaymentForm({ clientSecret, orderData, total }: PaymentFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsLoading(true)
    setErrorMessage('')

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: 'if_required'
      })

      if (error) {
        setErrorMessage(error.message || 'Une erreur est survenue lors du paiement')
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        // Paiement réussi, sauvegarder la commande et rediriger
        const finalOrderData = {
          ...orderData,
          paymentIntentId: paymentIntent.id,
          paymentStatus: 'paid',
          orderId: `BIN${Date.now().toString().slice(-6)}`,
          id: `BIN${Date.now().toString().slice(-6)}`,
          status: 'pending' as const,
          createdAt: new Date()
        }
        
        // Ajouter à la liste des commandes admin (simulation)
        try {
          const { addOrder } = await import('@/data/mockOrders')
          addOrder(finalOrderData)
        } catch (error) {
          console.log('Erreur ajout commande admin:', error)
        }
        
        localStorage.setItem('pendingOrder', JSON.stringify(finalOrderData))
        localStorage.removeItem('cart')
        router.push('/order-confirmation')
      }
    } catch (err) {
      setErrorMessage('Une erreur inattendue est survenue')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <CreditCard className="h-5 w-5" />
          <span>Paiement sécurisé</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <PaymentElement />
          
          {errorMessage && (
            <div className="text-red-600 text-sm bg-red-50 p-3 rounded">
              {errorMessage}
            </div>
          )}
          
          <Button
            type="submit"
            disabled={!stripe || isLoading}
            className="w-full bg-red-600 hover:bg-red-700"
            size="lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Traitement en cours...
              </>
            ) : (
              <>
                <CreditCard className="h-4 w-4 mr-2" />
                Payer {total.toFixed(2)} €
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

interface StripePaymentFormProps {
  orderData: any
  total: number
}

export default function StripePaymentForm({ orderData, total }: StripePaymentFormProps) {
  const [clientSecret, setClientSecret] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string>('')

  // Créer le Payment Intent au montage du composant
  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: total,
            currency: 'eur',
            orderData
          }),
        })

        const data = await response.json()
        
        if (data.clientSecret) {
          setClientSecret(data.clientSecret)
        } else {
          setError('Erreur lors de l\'initialisation du paiement')
        }
      } catch (err) {
        setError('Erreur de connexion au service de paiement')
      } finally {
        setIsLoading(false)
      }
    }

    createPaymentIntent()
  }, [total, orderData])

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin mr-2" />
          <span>Initialisation du paiement...</span>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <div className="text-red-600 mb-4">{error}</div>
          <Button onClick={() => window.location.reload()} variant="outline">
            Réessayer
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (!clientSecret) {
    return null
  }

  const options = {
    clientSecret,
    appearance: {
      theme: 'stripe' as const,
      variables: {
        colorPrimary: '#dc2626', // Rouge du Bin's Burger
      },
    },
  }

  return (
    <Elements stripe={stripePromise} options={options}>
      <PaymentForm 
        clientSecret={clientSecret} 
        orderData={orderData} 
        total={total} 
      />
    </Elements>
  )
}
