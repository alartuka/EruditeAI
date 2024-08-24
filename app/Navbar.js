"use client";

import { SignedIn, SignedOut, UserButton, SignUp, SignInButton } from "@clerk/nextjs";
import { AppBar, Box, Button, Grid, Toolbar, Typography, Container, Stack } from "@mui/material";

function Navbar() {
  return (
    <>      
    {/* ===== NAVIGATION BAR SECTION ===== */}
      <AppBar position="static" sx={{ bgcolor:'#004d40' }}> {/* Deep green background */}
        <Toolbar>
          <Grid container alignItems={'start'} justifyContent={'space-between'}>            
            <Button color="inherit" href="/">
              <Typography variant="h4" style={{flexGrow: 1}}>
                Erudite-Spark AI
              </Typography>
            </Button>
            <Stack direction={'row'} spacing={3} alignItems={'center'} justifyContent={'space-between'} sx={{ mt: 1 }}>
              <SignedOut>
                <Button color="inherit" href="/sign-in" sx={{ '&:hover': {color: '#e0f7fa'}, textDecoration: 'none', }}>Sign In</Button> {/* Light teal hover */}
                <Button color="inherit" href="/sign-up" sx={{ '&:hover': {color: '#e0f7fa'}, textDecoration: 'none', }}>Sign Up</Button> {/* Light teal hover */}
              </SignedOut>

              <SignedIn>
                <Button color="inherit" href="/generate" sx={{ '&:hover': {color: '#e0f7fa'}, textDecoration: 'none', }}>Create Flashcards</Button> {/* Light teal hover */}
                <Button color="inherit" href="/flashcards" sx={{ '&:hover': {color: '#e0f7fa'}, textDecoration: 'none', }}>Sets</Button> {/* Light teal hover */}
                <UserButton />
              </SignedIn>
            </Stack>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Navbar;

// "use client";

// import { SignedIn, SignedOut, UserButton, SignUp, SignInButton } from "@clerk/nextjs";
// import { AppBar, Box, Button, Grid, Toolbar, Typography, CardActionArea, Container, Stack } from "@mui/material";
// import Head from 'next/head';

// function Navbar() {
//   return (
//     <>      
//     {/* ===== NAVIGATION BAR SECTION ===== */}
//       <AppBar position="static" sx={{ bgcolor:'#1d245c' }}>
//         <Toolbar>
//           <Grid container alignItems={'start'} justifyContent={'space-between'}>            
//             <Button color="inherit" href="/">
//               <Typography variant="h4" style={{flexGrow: 1}}>
//                 Erudite-Spark AI
//               </Typography>
//             </Button>
//             <Stack direction={'row'} spacing={3} alignItems={'center'} justifyContent={'space-between'} sx={{ mt: 1 }}>
//               <SignedOut>
//                 <Button color="inherit" href="/sign-in" sx={{ '&:hover': {color: '#ffff00'}, textDecoration: 'none', }}>Sign In</Button>
//                 <Button color="inherit" href="/sign-up" sx={{ '&:hover': {color: '#ffff00'}, textDecoration: 'none', }}>Sign Up</Button>
//               </SignedOut>

//               <SignedIn>
//                 <Button color="inherit" href="/generate" sx={{ '&:hover': {color: '#ffff00'}, textDecoration: 'none', }}>Create Flashcards</Button>
//                 <Button color="inherit" href="/flashcards" sx={{ '&:hover': {color: '#ffff00'}, textDecoration: 'none', }}>Sets</Button>
//                 <UserButton />
//               </SignedIn>
//             </Stack>
//           </Grid>
//         </Toolbar>
//       </AppBar>
//     </>
//   )
// }

// export default Navbar

