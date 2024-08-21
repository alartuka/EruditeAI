// "use client"
// import { useState, useEffect } from 'react'
// import { useUser } from '@clerk/nextjs'
// import { useSearchParams } from 'next/navigation'
// import { Container, Grid, Card, CardActionArea, CardContent, Typography, Box } from '@mui/material'
// import { collection, doc, getDocs } from 'firebase/firestore'
// import db from '../../firebase'

// export default function Flashcard() {
//     const { isLoaded, isSignedIn, user } = useUser()
//     const [flashcards, setFlashcards] = useState([])
//     const [flipped, setFlipped] = useState({})
  
//     const searchParams = useSearchParams()
//     const search = searchParams.get('id')
  
//     // ... (rest of the component)
//     useEffect(() => {
//       async function getFlashcard() {
//         if (!search || !user) return
    
//         const colRef = collection(doc(collection(db, 'users'), user.id), search)
//         const docs = await getDocs(colRef)
//         const flashcards = []
//         docs.forEach((doc) => {
//           flashcards.push({ id: doc.id, ...doc.data() })
//         })
//         setFlashcards(flashcards)
//       }
//       getFlashcard()
//     }, [search, user])
  
//     const handleCardClick = (id) => {
//       setFlipped((prev) => ({
//         ...prev,
//         [id]: !prev[id],
//       }))
//     }
//     return (
//       <Container maxWidth="md">
//         <Grid container spacing={3} sx={{ mt: 4 }}>
//           {flashcards.map((flashcard) => (
//             <Grid item xs={12} sm={6} md={4} key={flashcard.id}>
//               <Card>
//                 <CardActionArea onClick={() => handleCardClick(flashcard.id)}>
//                   <CardContent>
//                     <Box sx={{ /* Styling for flip animation */ }}>
//                       <div>
//                         <div>
//                           <Typography variant="h5" component="div">
//                             {flashcard.front}
//                           </Typography>
//                         </div>
//                         <div>
//                           <Typography variant="h5" component="div">
//                             {flashcard.back}
//                           </Typography>
//                         </div>
//                       </div>
//                     </Box>
//                   </CardContent>
//                 </CardActionArea>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       </Container>
//     )
//   }
import React, { useState } from 'react';
import { Card, CardContent, Typography, CardActionArea } from '@mui/material';

const Flashcard = ({ front, back }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <Card>
      <CardActionArea onClick={handleClick}>
        <CardContent>
          <Typography variant="h5" component="div">
            {isFlipped ? 'Back:' : 'Front:'}
          </Typography>
          <Typography variant="body2">
            {isFlipped ? back : front}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Flashcard;

 