import { loadStripe } from '@stripe/stripe-js'

// Clé publique Stripe (à remplacer par la vraie clé du client)
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_...')

export default stripePromise
