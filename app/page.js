"use client";

import { SignedIn, SignedOut, UserButton, SignUp,SignInButton  } from "@clerk/nextjs";
import { AppBar, Box, Button, Grid, Toolbar, Typography,CardActionArea, Container } from "@mui/material";
import getStripe from "./utils/get-stripe";
import Head from 'next/head';
import Link from 'next/link';


export default function Home() {
   return (
    <Container maxWidth="100vw">
      <Head>
        <title>EruditeSpark AI</title>
        <meta name="description" content="create flashcards from your text." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{flexGrow: 1}}>
            EruditeSpark AI
          </Typography>
          


          <SignedOut>
            <Button color="inherit" href="/sign-in">Log In</Button>
            
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
      <Box sx={{my: 6, textAlign: 'center'}}>
        <Typography variant="h4" component="h2" gutterBottom>Features</Typography>
        
        <Grid container spacing={4} >
          {/* Feature items */}
          <Grid item xs={12} sm={4}>
              <Typography variant="h6" component="h3" gutterBottom>Easy Text input</Typography>
              <Typography variant="body1" component="p">Simply input your text and let our software do the rest. Creating flashcards has never been easier.</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" component="h3" gutterBottom>Smart Flashcards</Typography>
              <Typography variant="body1" component="p">Our AI intelligently breaks down your text into concise flashcards, perfect for studying.</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" component="h3" gutterBottom>Accessible Anywhere</Typography>
              <Typography variant="body1" component="p">Access your flashcards from any device, at any time. Study on the go with ease.</Typography>
            </Grid>
          </Grid>
         </Box>
          {/* ===== PRICING SECTION ===== */}
         <Box sx={{my: 6, textAlign: 'center'}}>
          <Typography variant="h4" component="h2" gutterBottom>Pricing</Typography>
          
           <Grid container spacing={4} justifyContent="center">
             {/* Pricing plans */}
             <Grid item xs={12} sm={4}>
              <Box sx={{p: 2, borderRadius: 2, border: '1px solid #ccc'}}>
              
              <Typography variant="h5" component="h3" gutterBottom>Free</Typography>
              <Typography variant="h6" component="h3" gutterBottom>$0/month</Typography>
              <Typography variant="body1" component="p">
                {''}
                Access to 20 flashcards as a trial.
              </Typography>
             
              <Button variant="contained" color="primary" sx={{mt:2}}>Choose Free</Button>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
            <Box sx={{p: 2, borderRadius: 2, border: '1px solid #ccc'}}>
              <Typography variant="h5" component="h3" gutterBottom>Basic</Typography>
              <Typography variant="h6" component="h3" gutterBottom>$5/month</Typography>
              <Typography variant="body1" component="p">
                {''}
                Access to limited flashcard features and limited storage.
              </Typography>
              <Button variant="contained" color="primary" sx={{mt:2}}>Choose Basic</Button>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
            <Box sx={{p: 2, borderRadius: 2, border: '1px solid #ccc'}}>
            <Typography variant="h5" component="h3" gutterBottom>Pro</Typography>
              <Typography variant="h6" component="h3" gutterBottom>$20/month</Typography>
              <Typography variant="body1" component="p">
                {''}
                Access to unlimted flashcard features and storage, with priority support.
              </Typography>
              <Button variant="contained" color="primary" sx={{mt:2}}>Choose Pro</Button>
              </Box>
            </Grid>
           </Grid>
         </Box>
      </Container>)}
// export default function Home() {
//   // ===== STRIPE INTEGRATION =====
//   const handleSubmit = async () => { // handles the Stripe checkout process when a user selects the Pro plan
//     const checkoutSession = await fetch('/api/checkout_sessions', {
//       method: 'POST',
//       headers: { origin: 'http://localhost:3000' },
//     })

//     const checkoutSessionJson = await checkoutSession.json()
  
//     const stripe = await getStripe()
//     const {error} = await stripe.redirectToCheckout({
//       sessionId: checkoutSessionJson.id,
//     })
  
//     if (error) {
//       console.warn(error.message)
//     }
//   }

//   return (
//     <div>
//       {/* ===== NAVIGATION BAR ===== */}
//       <AppBar position="static">
//         <Toolbar>
//           <Typography variant="h6" style={{flexGrow: 1}}>
//             EruditeSpark AI
//           </Typography>

//           {/* Conditionally render login/signup buttons or the user menu */}
//           <SignedOut>
//             <SignInButton />

//             {/* <Button color="inherit" href="/sign-in">Login</Button> */}
//             {/* <Button color="inherit" href="/sign-up">Sign Up</Button> */}
//           </SignedOut>

//           <SignedIn>
//             <UserButton />
//           </SignedIn>

//         </Toolbar>
//       </AppBar>

//       {/* ===== HERO SECTION ===== */}
//       <Box sx={{textAlign: 'center', my: 4}}>
//         <Typography variant="h2" component="h1" gutterBottom>
//           Welcome to EruditeSpark AI
//         </Typography>

//         <Typography variant="h5" component="h2" gutterBottom>
//           The easiest way to create flashcards from your text.
//         </Typography>

//         <Button variant="contained" color="primary" sx={{mt: 2, mr: 2}} href="/generate">
//           Get Started
//         </Button>

//         <Button variant="outlined" color="primary" sx={{mt: 2}}>
//           Learn More
//         </Button>
//       </Box>

//       {/* ===== FEATURES SECTION ===== */}
//       <Box sx={{my: 6}}>
//         <Typography variant="h4" component="h2" gutterBottom>Features</Typography>
        
//         <Grid container spacing={4}>
//           {/* Feature items */}
//         </Grid>
//       </Box>

//       {/* ===== PRICING SECTION ===== */}
//       <Box sx={{my: 6, textAlign: 'center'}}>
//         <Typography variant="h4" component="h2" gutterBottom>Pricing</Typography>
        
//         <Grid container spacing={4} justifyContent="center">
//           {/* Pricing plans */}
//         </Grid>
//       </Box>
//     </div>
//   );
// }