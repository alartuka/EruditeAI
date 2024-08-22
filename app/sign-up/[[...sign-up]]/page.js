"use client";

import React from 'react';
import { Container, Box, Typography, AppBar, Toolbar, Button } from '@mui/material';
import { SignUp } from '@clerk/nextjs';
import Link from 'next/link';

export default function SignUpPage() {
  return (
    <>
      <AppBar position="static" sx={{backgroundColor: '#3f51b5'}}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
            EruditeSpark AI
          </Typography>
          <Button color="inherit" component={Link} href="/sign-in">
            Sign In
          </Button>
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="100vw">
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          sx={{textAlign: 'center', my: 4}}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Sign Up
          </Typography>
          <SignUp 
            path="/sign-up" 
            routing="path" 
            signInUrl="/sign-in" 
          />
        </Box>
      </Container>
    </>
  );
}