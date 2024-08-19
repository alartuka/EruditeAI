import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { AppBar, Box, Button, Grid, Toolbar, Typography } from "@mui/material";
import getStripe from "./utils/get-stripe";


export default function Home() {
  // ===== STRIPE INTEGRATION =====
  const handleSubmit = async () => { // handles the Stripe checkout process when a user selects the Pro plan
    const checkoutSession = await fetch('/api/checkout_sessions', {
      method: 'POST',
      headers: { origin: 'http://localhost:3000' },
    })

    const checkoutSessionJson = await checkoutSession.json()
  
    const stripe = await getStripe()
    const {error} = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    })
  
    if (error) {
      console.warn(error.message)
    }
  }

  return (
    <div>
      {/* ===== NAVIGATION BAR ===== */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{flexGrow: 1}}>
            EruditeSpark AI
          </Typography>

          {/* Conditionally render login/signup buttons or the user menu */}
          <SignedOut>
            <Button color="inherit" href="/sign-in">Login</Button>
            <Button color="inherit" href="/sign-up">Sign Up</Button>
          </SignedOut>

          <SignedIn>
            <UserButton />
          </SignedIn>

        </Toolbar>
      </AppBar>

      {/* ===== HERO SECTION ===== */}
      <Box sx={{textAlign: 'center', my: 4}}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to EruditeSpark AI
        </Typography>

        <Typography variant="h5" component="h2" gutterBottom>
          The easiest way to create flashcards from your text.
        </Typography>

        <Button variant="contained" color="primary" sx={{mt: 2, mr: 2}} href="/generate">
          Get Started
        </Button>

        <Button variant="outlined" color="primary" sx={{mt: 2}}>
          Learn More
        </Button>
      </Box>

      {/* ===== FEATURES SECTION ===== */}
      <Box sx={{my: 6}}>
        <Typography variant="h4" component="h2" gutterBottom>Features</Typography>
        
        <Grid container spacing={4}>
          {/* Feature items */}
        </Grid>
      </Box>

      {/* ===== PRICING SECTION ===== */}
      <Box sx={{my: 6, textAlign: 'center'}}>
        <Typography variant="h4" component="h2" gutterBottom>Pricing</Typography>
        
        <Grid container spacing={4} justifyContent="center">
          {/* Pricing plans */}
        </Grid>
      </Box>
    </div>
  );
}
