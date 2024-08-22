"use client";

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { Container, Typography, Grid } from '@mui/material';
import Flashcard from '../components/Flashcard';

export default function SavedCards() {
  const [savedSets, setSavedSets] = useState([]);
  const { isLoaded, isSignedIn, user } = useUser();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      fetchSavedSets();
    }
  }, [isLoaded, isSignedIn]);

  const fetchSavedSets = async () => {
    const userDocRef = doc(collection(db, 'users'), user.id);
    const setsCollectionRef = collection(userDocRef, 'flashcardSets');
    const snapshot = await getDocs(setsCollectionRef);
    const sets = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setSavedSets(sets);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        Saved Flashcard Sets
      </Typography>
      <Grid container spacing={2}>
        {savedSets.map((set) => (
          <Grid item xs={12} key={set.id}>
            <Typography variant="h6">{set.id}</Typography>
            <Grid container spacing={2}>
              {set.flashcards.map((card, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Flashcard front={card.front} back={card.back} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}