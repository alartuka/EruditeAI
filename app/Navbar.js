"use client";

import { SignedIn, SignedOut, UserButton, SignUp, SignInButton } from "@clerk/nextjs";
import { AppBar, Box, Button, Grid, Toolbar, Typography, CardActionArea, Container, Stack } from "@mui/material";
import Head from 'next/head';

function Navbar() {
  return (
    <>      
    {/* ===== NAVIGATION BAR SECTION ===== */}
      <AppBar position="static" sx={{ bgcolor:'#1d245c' }}>
        <Toolbar>
          <Grid container alignItems={'start'} justifyContent={'space-between'}>
            <Button color="inherit" href="/">
              <Typography variant="h4" style={{flexGrow: 1}}>
                Erudite-Spark AI
              </Typography>
            </Button>

            <Stack  alignItems={'end'} direction={'row'} spacing={2} justifyContent={'space-between'}>
              <SignedOut>
                <Button color="inherit" href="/sign-in">Sign In</Button>
                <Button color="inherit" href="/sign-up">Sign Up</Button>
              </SignedOut>

              <SignedIn>
                <UserButton />
              </SignedIn>
            </Stack>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Navbar