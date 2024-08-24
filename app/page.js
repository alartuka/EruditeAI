"use client";

import { SignedIn, SignedOut, useAuth } from "@clerk/nextjs";
import { Box, Button, Grid, Typography, Container } from "@mui/material";
import { Toaster, toast } from 'react-hot-toast';
import getStripe from "./utils/get-stripe";

export default function Home() {
  const { isSignedIn } = useAuth();

  // ===== STRIPE INTEGRATION =====
  const handleSubmit = async(planName, price) => {
    if (!isSignedIn) {
      toast.error("Please sign in first to choose a plan.");
      return;
    }
    const origin = typeof window !== 'undefined' && window.location.origin 
      ? window.location.origin 
      : '';
    
    const checkoutSession = await fetch('/api/checkout_session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Origin': origin,
      },
      body: JSON.stringify({ planName, price }),
    })
    const checkoutSessionJson = await checkoutSession.json()
    
    if (checkoutSession.statusCode === 500) {
      console.error(checkoutSession.message)
      return
    }

    const stripe = await getStripe()
    const {error} = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    })

    if (error) {
      console.warn(error.message)
    }
  }

  return (
    <Container maxWidth="100vw" sx={{ backgroundColor: '#ffffff' }}> {/* White background */}
      <Toaster position="top-center" reverseOrder={false} />
     {/* ===== HERO SECTION ===== */}
      <Box sx={{textAlign: 'center', my: 4}}>
        <Typography variant="h2" component="h1" gutterBottom color='#004d40'>
          Welcome to EruditeSpark AI
        </Typography>

        <Typography variant="h5" component="h2" gutterBottom color='#004d40'>
           The easiest way to create flashcards from your text.
        </Typography>

        <SignedIn>
          <Button variant="contained" color="primary" sx={{mt: 2, mr: 2, backgroundColor: '#004d40', '&:hover': { backgroundColor: '#00332e' } }} href="/generate">
            Generate flashcards
          </Button> {/* Deep green buttons with darker hover */}
        </SignedIn>

        <SignedOut>
          <Button variant="contained" color="primary" sx={{mt: 2, mr: 2, backgroundColor: '#004d40', '&:hover': { backgroundColor: '#00332e' } }} href="/sign-up">
            Get Started
          </Button> {/* Deep green buttons with darker hover */}
        </SignedOut>

        {/* <Button variant="outlined" color="primary" sx={{mt: 2, color: '#004d40', borderColor: '#004d40', '&:hover': { backgroundColor: '#004d40', color: '#ffffff' } }}>
           Learn More
        </Button> Deep green outlined button with hover effect */}
       </Box>

      {/* ===== FEATURES SECTION ===== */}
      <Box sx={{my: 6, textAlign: 'center'}}>
        <Typography variant="h4" component="h2" gutterBottom color='#004d40'>Features</Typography>
        
        <Grid container spacing={4} >
          {/* Feature items */}
          <Grid item xs={12} sm={4}>
              <Typography variant="h6" component="h3" gutterBottom color='#004d40'>Easy Text input</Typography>
              <Typography variant="body1" component="p" color='#004d40'>Simply input your text and let our software do the rest. Creating flashcards has never been easier.</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" component="h3" gutterBottom color='#004d40'>Smart Flashcards</Typography>
              <Typography variant="body1" component="p" color='#004d40'>Our AI intelligently breaks down your text into concise flashcards, perfect for studying.</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" component="h3" gutterBottom color='#004d40'>Accessible Anywhere</Typography>
              <Typography variant="body1" component="p" color='#004d40'>Access your flashcards from any device, at any time. Study on the go with ease.</Typography>
            </Grid>
          </Grid>
         </Box>
          {/* ===== PRICING SECTION ===== */}
         <Box sx={{my: 6, textAlign: 'center'}}>
          <Typography variant="h4" component="h2" gutterBottom color='#004d40'>Pricing</Typography>
          
           <Grid container spacing={4} justifyContent="center">
             {/* Pricing plans */}
             <Grid item xs={12} sm={4}>
              <Box sx={{p: 2, borderRadius: 2, border: '1px solid #004d40'}}>
              
              <Typography variant="h5" component="h3" gutterBottom color='#004d40'>Free</Typography>
              <Typography variant="h6" component="h3" gutterBottom color='#004d40'>$0/month</Typography>
              <Typography variant="body1" component="p" color='#004d40'>
                Access to 20 flashcards as a trial.
              </Typography>
             
              <Button variant="contained" color="primary" sx={{mt:2, backgroundColor: '#004d40', '&:hover': { backgroundColor: '#00332e' } }} onClick={() => handleSubmit('Free', 0)}>Choose Free</Button> {/* Deep green button */}
              </Box>
            </Grid>

            <Grid item xs={12} sm={4}>
            <Box sx={{p: 2, borderRadius: 2, border: '1px solid #004d40'}}>
              <Typography variant="h5" component="h3" gutterBottom color='#004d40'>Basic</Typography>
              <Typography variant="h6" component="h3" gutterBottom color='#004d40'>$5/month</Typography>
              <Typography variant="body1" component="p" color='#004d40'>
                Access to limited flashcard features and limited storage.
              </Typography>
              <Button variant="contained" color="primary" sx={{mt:2, backgroundColor: '#004d40', '&:hover': { backgroundColor: '#00332e' } }} onClick={() => handleSubmit('Basic', 5)}>Choose Basic</Button> {/* Deep green button */}
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
            <Box sx={{p: 2, borderRadius: 2, border: '1px solid #004d40'}}>
            <Typography variant="h5" component="h3" gutterBottom color='#004d40'>Pro</Typography>
              <Typography variant="h6" component="h3" gutterBottom color='#004d40'>$20/month</Typography>
              <Typography variant="body1" component="p" color='#004d40'>
                Access to unlimited flashcard features and storage, with priority support.
              </Typography>
              <Button variant="contained" color="primary" sx={{mt:2, backgroundColor: '#004d40', '&:hover': { backgroundColor: '#00332e' } }} onClick={() => handleSubmit('Pro', 20)}>Choose Pro</Button> {/* Deep green button */}
              </Box>
            </Grid>
           </Grid>
         </Box>

        <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} p={4} mb={'15px'}>
          <Typography variant="p" color='#004d40' component="p">&copy; {new Date().getFullYear()} EruditeSpark AI. All rights reserved.</Typography>
        </Box>
    </Container>
  )
}

// "use client";

// import { SignedIn, SignedOut, UserButton, SignUp,SignInButton, useAuth  } from "@clerk/nextjs";
// import { AppBar, Box, Button, Grid, Toolbar, Typography,CardActionArea, Container, Stack } from "@mui/material";
// import getStripe from "./utils/get-stripe";
// import Head from 'next/head';
// import Link from 'next/link';
// import { Toaster, toast } from 'react-hot-toast';


// export default function Home() {
//   const { isSignedIn } = useAuth();

//   // ===== STRIPE INTEGRATION =====
//   const handleSubmit = async(planName, price) => {
//     if (!isSignedIn) {
//       toast.error("Please sign in first to choose a plan.");
//       return;
//     }
//     const origin = typeof window !== 'undefined' && window.location.origin 
//       ? window.location.origin 
//       : '';
    
//     const checkoutSession = await fetch('/api/checkout_session', {
//       method: 'POST',
//       headers: {
//         // origin: 'http://localhost:3000',
//         'Content-Type': 'application/json',
//         'Origin': origin,
//       },
//       body: JSON.stringify({ planName, price }),
//     })
//     const checkoutSessionJson = await checkoutSession.json()
    
//     if (checkoutSession.statusCode === 500) {
//       console.error(checkoutSession.message)
//       return
//     }

//     const stripe = await getStripe()
//     const {error} = await stripe.redirectToCheckout({
//       sessionId: checkoutSessionJson.id,
//     })

//     if (error) {
//       console.warn(error.message)
//     }
//   }

//   return (
//     <Container maxWidth="100vw">
//       <Toaster position="top-center" reverseOrder={false} />
//      {/* ===== HERO SECTION ===== */}
//       <Box sx={{textAlign: 'center', my: 4}}>
//         <Typography variant="h2" component="h1" gutterBottom>
//           Welcome to EruditeSpark AI
//         </Typography>

//         <Typography variant="h5" component="h2" gutterBottom>
//            The easiest way to create flashcards from your text.
//         </Typography>

//         <SignedIn>
//           {/* !! should be a dashboard page allowing users to retrieve saved sets with an option to add new(which takes users to this generate/page.js) !!*/}
//           <Button variant="contained" color="primary" sx={{mt: 2, mr: 2}} href="/generate">
//             Generate flashcards
//           </Button>
//         </SignedIn>

//         <SignedOut>
//           <Button variant="contained" color="primary" sx={{mt: 2, mr: 2}} href="/sign-up">
//             Get Started
//           </Button>
//         </SignedOut>

//         <Button variant="outlined" color="primary" sx={{mt: 2}}>
//            Learn More
//         </Button>
//        </Box>

//       {/* ===== FEATURES SECTION ===== */}
//       <Box sx={{my: 6, textAlign: 'center'}}>
//         <Typography variant="h4" component="h2" gutterBottom>Features</Typography>
        
//         <Grid container spacing={4} >
//           {/* Feature items */}
//           <Grid item xs={12} sm={4}>
//               <Typography variant="h6" component="h3" gutterBottom>Easy Text input</Typography>
//               <Typography variant="body1" component="p">Simply input your text and let our software do the rest. Creating flashcards has never been easier.</Typography>
//             </Grid>
//             <Grid item xs={12} sm={4}>
//               <Typography variant="h6" component="h3" gutterBottom>Smart Flashcards</Typography>
//               <Typography variant="body1" component="p">Our AI intelligently breaks down your text into concise flashcards, perfect for studying.</Typography>
//             </Grid>
//             <Grid item xs={12} sm={4}>
//               <Typography variant="h6" component="h3" gutterBottom>Accessible Anywhere</Typography>
//               <Typography variant="body1" component="p">Access your flashcards from any device, at any time. Study on the go with ease.</Typography>
//             </Grid>
//           </Grid>
//          </Box>
//           {/* ===== PRICING SECTION ===== */}
//          <Box sx={{my: 6, textAlign: 'center'}}>
//           <Typography variant="h4" component="h2" gutterBottom>Pricing</Typography>
          
//            <Grid container spacing={4} justifyContent="center">
//              {/* Pricing plans */}
//              <Grid item xs={12} sm={4}>
//               <Box sx={{p: 2, borderRadius: 2, border: '1px solid #ccc'}}>
              
//               <Typography variant="h5" component="h3" gutterBottom>Free</Typography>
//               <Typography variant="h6" component="h3" gutterBottom>$0/month</Typography>
//               <Typography variant="body1" component="p">
//                 {''}
//                 Access to 20 flashcards as a trial.
//               </Typography>
             
//               <Button variant="contained" color="primary" sx={{mt:2}} onClick={() => handleSubmit('Free', 0)}>Choose Free</Button>
//               </Box>
//             </Grid>

//             <Grid item xs={12} sm={4}>
//             <Box sx={{p: 2, borderRadius: 2, border: '1px solid #ccc'}}>
//               <Typography variant="h5" component="h3" gutterBottom>Basic</Typography>
//               <Typography variant="h6" component="h3" gutterBottom>$5/month</Typography>
//               <Typography variant="body1" component="p">
//                 {''}
//                 Access to limited flashcard features and limited storage.
//               </Typography>
//               <Button variant="contained" color="primary" sx={{mt:2}} onClick={() => handleSubmit('Basic', 5)}>Choose Basic</Button>
//               </Box>
//             </Grid>
//             <Grid item xs={12} sm={4}>
//             <Box sx={{p: 2, borderRadius: 2, border: '1px solid #ccc'}}>
//             <Typography variant="h5" component="h3" gutterBottom>Pro</Typography>
//               <Typography variant="h6" component="h3" gutterBottom>$20/month</Typography>
//               <Typography variant="body1" component="p">
//                 {''}
//                 Access to unlimted flashcard features and storage, with priority support.
//               </Typography>
//               <Button variant="contained" color="primary" sx={{mt:2}} onClick={() => handleSubmit('Pro', 20)}>Choose Pro</Button>
//               </Box>
//             </Grid>
//            </Grid>
//          </Box>

//         <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} p={4} mb={'15px'}>
//           <Typography variant="p" color='#1d245c' component="p">&copy; {new Date().getFullYear()} EruditeSpark AI. All rights reserved.</Typography>
//         </Box>
//     </Container>
//   )
// }


