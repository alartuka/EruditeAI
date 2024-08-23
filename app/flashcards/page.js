"use client"
import { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { Container, Grid, Card, CardActionArea, CardContent, Typography, CircularProgress } from '@mui/material'
import { doc, getDoc, setDoc, collection } from 'firebase/firestore'
import { db } from '../../firebase'

export default function Flashcards() {
    const { isLoaded, isSignedIn, user } = useUser()
    const [flashcards, setFlashcards] = useState([])
    const router = useRouter()

    const handleCardClick = (id) => {
      router.push(`/flashcard?id=${id}`)
    }
  
    useEffect(() => {
      async function getFlashcards() {
        if (!user) return

        const docRef = doc(collection(db, 'users'), user.id)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          const collections = docSnap.data().flashcards || []
          setFlashcards(collections)

        } else {
          await setDoc(docRef, { flashcards: [] })
        }
      }
      getFlashcards() 
    }, [user])

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
      <Container maxWidth="100vw">
        <Grid container spacing={3} sx={{ mt: 4 }}>
          {flashcards.map((flashcard, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardActionArea onClick={() => handleCardClick(flashcard.name)}>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {flashcard.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    )
   
  }
