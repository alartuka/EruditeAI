import { NextResponse } from 'next/server'
import Stripe from 'stripe'

// A utility function to format the amount for Stripe
const formatAmountForStripe = (amount, currency) => {
    return Math.round(amount * 100)
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
})

export async function POST(req) {
    try {
        // params includes all the necessary information for creating a Stripe checkout session
        const params = {
            mode: 'subscription', // for recurring payments
            payment_method_types: ['card'], // for accepting card payments
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'Pro subscription',
                        },
                        unit_amount: formatAmountForStripe(10, 'usd'), // $10.00 
                        recurring: {
                            interval: 'month',
                            interval_count: 1,
                        },
                    },
                    quantity: 1,
                },
            ],

            // success and cancel URLs which are used to redirect the user after the payment process
            success_url: `${req.headers.get(
                'Referer',
            )}result?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${req.headers.get(
                'Referer',
            )}result?session_id={CHECKOUT_SESSION_ID}`,
        }

        // create the checkout session
        const checkoutSession = await stripe.checkout.sessions.create(params)

        // return the created session as a JSON response with a 200 status code
        return NextResponse.json(checkoutSession, {
            status: 200,
        })
    } catch (error) {
      console.error('Error creating checkout session:', error)
      return new NextResponse(JSON.stringify({ error: { message: error.message } }), {
        status: 500,
      })
    }
}


export async function GET(req) {
    const searchParams = req.nextUrl.searchParams
    const session_id = searchParams.get('session_id') // extracts the `session_id` from the query parameters of the request
  
    try {
        if (!session_id) { // no session id provided
            throw new Error('Session ID is required')
        }
        
        const checkoutSession = await stripe.checkout.sessions.retrieve(session_id) // uses the Stripe API to retrieve the checkout session details
  
        return NextResponse.json(checkoutSession) // returns the session details as a JSON response
    
    } catch (error) {
        console.error('Error retrieving checkout session:', error)
        return NextResponse.json({ error: { message: error.message } }, { status: 500 })
    }
}