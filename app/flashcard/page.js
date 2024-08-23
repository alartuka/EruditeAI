"use client"

import { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { useSearchParams } from 'next/navigation'
import { Container, Grid, Card, CardActionArea, CardContent, Typography, Box, CircularProgress } from '@mui/material'
import { collection, doc, getDocs } from 'firebase/firestore'
import {db} from '../../firebase'

export default function Flashcard() {
    const { isLoaded, isSignedIn, user } = useUser()
    const [flashcards, setFlashcards] = useState([])
    const [flipped, setFlipped] = useState([])
  
    const searchParams = useSearchParams()
    const search = searchParams.get('id')
  
    useEffect(() => {
      async function getFlashcard() {
        if (!search || !user) return
    
        const colRef = collection(doc(collection(db, 'users'), user.id), search)
        const docs = await getDocs(colRef)
        const flashcards = []

        docs.forEach((doc) => {
          flashcards.push({ id: doc.id, ...doc.data() })
        })
        setFlashcards(flashcards)
      }
      getFlashcard()
    }, [search, user])
  
    const handleCardClick = (id) => {
      setFlipped((prev) => ({
        ...prev,
        [id]: !prev[id],
      }))
    }

    if (!isLoaded || !isSignedIn) {
      return (
        <Container maxWidth="sm" sx={{textAlign: 'center', mt: 4}}>
          <CircularProgress />
          <Typography variant="h6" sx={{mt: 2}}>
            Loading...
          </Typography>
        </Container>
      )
    }

    return (
      <Container maxWidth="md">
        <Grid container spacing={3} sx={{ mt: 4 }}>
          {flashcards.map((flashcard, index) => (
            <Grid item xs={12} sm={6} md={4} key={flashcard.id}>
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
      </Container>
    )
  }

 