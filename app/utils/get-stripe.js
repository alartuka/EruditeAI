import { loadStripe } from '@stripe/stripe-js';

let stripePromise;

// a utility function to get the Stripe instance
const getStripe = () => {
    if (!stripePromise) { // ensures one instance of Stripe is created or reused if it already exists
        stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)
    }

    return stripePromise
}

export default getStripe;