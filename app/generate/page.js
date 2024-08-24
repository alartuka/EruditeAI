"use client";

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { Container, TextField, Button, Typography, Box, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Grid, Card, CardContent, CardActionArea, Paper } from '@mui/material';
import { collection, doc, getDoc, setDoc, WriteBatch, writeBatch } from 'firebase/firestore';
import { db } from '../../firebase'; // Adjust the path as necessary
import { useRouter } from 'next/navigation';


export default function Generate() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([])
  const [flipped, setFlipped] = useState([]);
  const [text, setText] = useState('') // text for the topic of flashcards
  const [name, setName] = useState('') // Flashcard set's name
  const [open, setOpen] = useState(false) // Dialog to name and save flashcard set
  const router = useRouter()
  const [generating, setGenerating] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  
 
  useEffect(() => {
    async function getFlashcards() {
      if (!isLoaded || !isSignedIn || !user) return;
      
      const userId = user.id;
      // const docRef = doc(collection(db, 'users'), userId);
      const docRef = doc(db, 'users', userId);
      
      try {
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const collections = docSnap.data().flashcards || [];
          setFlashcards(collections);
        
        } else {
          await setDoc(docRef, { flashcards: [] }, { merge: true });
        }

      } catch (error) {
        console.error("Error fetching flashcards:", error);
      }
    }

    getFlashcards();
  }, [isLoaded, isSignedIn, user]);


  const handleSubmit = async () => {
    if (!text.trim()) {
      alert('Please enter some text to generate flashcards.')
      return
    }
  
    try {
      setGenerating(true)
      const response = await fetch('/api/generate', {
        method: 'POST',
        body: text,
      })
  
      if (!response.ok) {
        throw new Error('Failed to generate flashcards')
      }
  
      const data = await response.json()
      setFlashcards(data)
      setGenerating(false)
    } catch (error) {
      console.error('Error generating flashcards:', error)
      alert('An error occurred while generating flashcards. Please try again.')
    }
  }

  const handleCardClick = (id) => {
    // router.push(`/flashcard?id=${id}`)
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const saveFlashcards = async () => {
    if (!name.trim()) {
      alert('Please enter a name for your flashcard set.')
      return
    }
  
    try {
      const batch = writeBatch(db)
      console.log('Batch initialized');

      // Fetch user document from Firestore
      const userDocRef = doc(collection(db, 'users'), user.id)
      const userDocSnap = await getDoc(userDocRef)
  
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data().flashcards || [] 
        console.log('User document found', userData);

        if (userData.find((f) => f.name === name)) {
          alert('A flashcard set with this name already exists.')
          return

        } else {
          userData.push({name})
          batch.set(userDocRef, {flashcards: userData}, {merge: true})
          console.log('Flashcard set added to batch');
        }

      } else {
        batch.set(userDocRef, { flashcards: [{ name }]})
        console.log('New flashcard set created');
      }
  
      const colRef = collection(userDocRef, name)
      flashcards.forEach((flashcard) => {
        const cardDocRef = doc(colRef)
        batch.set(cardDocRef, flashcard)
      });
  
      console.log('All flashcards added to batch');
      await batch.commit();
      console.log('Batch committed successfully');

      alert('Flashcards saved successfully!')

      handleClose()
      router.push('/flashcards')
      setName('')

    } catch (error) {
      console.error('Error saving flashcards:', error)
      alert('An error occurred while saving flashcards. Please try again.')
    }
  }


  return (
    <Container maxWidth="md">
      {/* ==== TOPIC OR TEXT BOX FOR FLASHCARDS ==== */}
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Generate Flashcards
        </Typography>
        <Paper sx={{ p: 4, width: '100%' }}>
          <TextField
            value={text}
            onChange={(e) => setText(e.target.value)}
            label="Enter text"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            sx={{ mb: 2 }}
          />
        </Paper>

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          fullWidth
          disabled={generating}
        >
          {/* Generate Flashcards */}
          {generating ? 'Generating...' : 'Generate Flashcards'}
        </Button>
      </Box>

      {/* ==== DISPLAY CARDS IN GRID ==== */}
      {flashcards.length > 0 && (
        <Box sx={{ mt: 4, mb: 6, display:'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h5" gutterBottom>
            Flashcards Preview
          </Typography>

          <Grid container spacing={3}>
            {flashcards.map((flashcard, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardActionArea onClick={() => handleCardClick(index)}>
                    <CardContent>
                      <Box sx={{ perspective: '1000px' }}>
                        <Box
                          sx={{
                            transition: 'transform 0.6s',
                            transformStyle: 'preserve-3d',
                            position: 'relative',
                            width: '100%',
                            height: '200px',
                            boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                            transform: flipped[index] ? 'rotateY(180deg)' : 'rotateY(0deg)',
                          }}
                        >
                          {/* ==== FLIPPED TO FRONT OF CARD ==== */}
                          <Box
                            sx={{
                              position: 'absolute',
                              width: '100%',
                              height: '100%',
                              backfaceVisibility: 'hidden',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              padding: 2,
                              boxSizing: 'border-box',
                            }}
                          >
                            <Typography variant="h5" component="div">
                              {flashcard.front}
                            </Typography>
                          </Box>

                          {/* ==== FLIPPED TO BACK OF CARD ==== */}
                          <Box
                            sx={{
                              position: 'absolute',
                              width: '100%',
                              height: '100%',
                              backfaceVisibility: 'hidden',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              padding: 2,
                              boxSizing: 'border-box',
                              transform: 'rotateY(180deg)',
                            }}
                          >
                            <Typography variant="body1" component="div">
                              {flashcard.back}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center'}}>
            <Button variant="contained" color="secondary" onClick={handleOpen}>
              Save
            </Button>
          </Box>
        </Box>
      )}

      {/* ==== SAVE FLASHCARDS SET POPUP FORM ==== */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Save Flashcards Set</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Please enter a name for your flashcard set.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Flashcards Set Name"
            type="text"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="outlined"
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={saveFlashcards} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}