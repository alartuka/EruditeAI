// "use client";

// import { useState, useEffect } from 'react';
// import { useUser } from '@clerk/nextjs';
// import { Container, TextField, Button, Typography, Box, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Grid, Card, CardContent } from '@mui/material';
// import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
// import { db } from '../../firebase'; // Adjust the path as necessary


// export default function Generate() {
//   const [text, setText] = useState('')
//   const [flashcards, setFlashcards] = useState([])
//   const [setName, setSetName] = useState('')
//   const [dialogOpen, setDialogOpen] = useState(false)
//   const handleOpenDialog = () => setDialogOpen(true)
//   const handleCloseDialog = () => setDialogOpen(false)
//   const { isLoaded, isSignedIn, user } = useUser();


//   useEffect(() => {
//     async function getFlashcards() {
//       if (!isLoaded || !isSignedIn || !user) return;
//       const userId = user.id;
//       const docRef = doc(collection(db, 'users'), userId);
//       try {
//         const docSnap = await getDoc(docRef);
//         if (docSnap.exists()) {
//           const collections = docSnap.data().flashcards || [];
//           setFlashcards(collections);
//         } else {
//           await setDoc(docRef, { flashcards: [] });
//         }
//       } catch (error) {
//         console.error("Error fetching flashcards:", error);
//       }
//     }
//     getFlashcards();
//   }, [isLoaded, isSignedIn, user]);

//   const handleSave = async () => {
//     if (!isSignedIn) {
//       alert('Please sign in to save flashcards');
//       return;
//     }
  
//     try {
//       const userDocRef = doc(collection(db, 'users'), user.id);
//       const flashcardSetRef = doc(collection(userDocRef, 'flashcardSets'), new Date().toISOString());
//       await setDoc(flashcardSetRef, { flashcards });
//       alert('Flashcards saved successfully!');
//     } catch (error) {
//       console.error('Error saving flashcards:', error);
//       alert('An error occurred while saving flashcards. Please try again.');
//     }
//   };
  
//   const handleDelete = () => {
//     setFlashcards([]);
//   };


//   const handleSubmit = async () => {
//     if (!text.trim()) {
//       alert('Please enter some text to generate flashcards.')
//       return
//     }
  
//     try {
//       const response = await fetch('/api/generate', {
//         method: 'POST',
//         body: text,
//       })
  
//       if (!response.ok) {
//         throw new Error('Failed to generate flashcards')
//       }
  
//       const data = await response.json()
//       setFlashcards(data)
//     } catch (error) {
//       console.error('Error generating flashcards:', error)
//       alert('An error occurred while generating flashcards. Please try again.')
//     }
//   }
//   const handleCardClick = (id) => {
//     router.push(`/flashcard?id=${id}`)
//   }

//   const saveFlashcards = async () => {
//     if (!setName.trim()) {
//       alert('Please enter a name for your flashcard set.')
//       return
//     }
  
//     try {
//       const userDocRef = doc(collection(db, 'users'), user.id)
//       const userDocSnap = await getDoc(userDocRef)
  
//       const batch = writeBatch(db)
  
//       if (userDocSnap.exists()) {
//         const userData = userDocSnap.data()
//         const updatedSets = [...(userData.flashcardSets || []), { name: setName }]
//         batch.update(userDocRef, { flashcardSets: updatedSets })
//       } else {
//         batch.set(userDocRef, { flashcardSets: [{ name: setName }] })
//       }
  
//       const setDocRef = doc(collection(userDocRef, 'flashcardSets'), setName)
//       batch.set(setDocRef, { flashcards })
  
//       await batch.commit()
  
//       alert('Flashcards saved successfully!')
//       handleCloseDialog()
//       setSetName('')
//     } catch (error) {
//       console.error('Error saving flashcards:', error)
//       alert('An error occurred while saving flashcards. Please try again.')
//     }
//   }

//   {flashcards.length > 0 && (
//     <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
//       <Button variant="contained" color="primary" onClick={handleOpenDialog}>
//         Save Flashcards
//       </Button>
//     </Box>
//   )}
//   <Dialog open={dialogOpen} onClose={handleCloseDialog}>
//   <DialogTitle>Save Flashcard Set</DialogTitle>
//   <DialogContent>
//     <DialogContentText>
//       Please enter a name for your flashcard set.
//     </DialogContentText>
//     <TextField
//       autoFocus
//       margin="dense"
//       label="Set Name"
//       type="text"
//       fullWidth
//       value={setName}
//       onChange={(e) => setSetName(e.target.value)}
//     />
//   </DialogContent>
//   <DialogActions>
//     <Button onClick={handleCloseDialog}>Cancel</Button>
//     <Button onClick={saveFlashcards} color="primary">
//       Save
//     </Button>
//   </DialogActions>
// </Dialog>
//   return (
//       <Container maxWidth="md">
//         <Box sx={{ my: 4 }}>
//           <Typography variant="h4" component="h1" gutterBottom>
//             Generate Flashcards
//           </Typography>
//           <TextField
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//             label="Enter text"
//             fullWidth
//             multiline
//             rows={4}
//             variant="outlined"
//             sx={{ mb: 2 }}
//           />
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleSubmit}
//             fullWidth
//           >
//             Generate Flashcards
//           </Button>
//         </Box>
        
//         {flashcards.length > 0 && (
//           <Box sx={{ mt: 4 }}>
//             <Typography variant="h5" component="h2" gutterBottom>
//               Generated Flashcards
//             </Typography>
//             <Grid container spacing={2}>
//               {flashcards.map((flashcard, index) => (
//                 <Grid item xs={12} sm={6} md={4} key={index}>
//                   <Card>
//                     <CardContent>
//                       <Typography variant="h6">Front:</Typography>
//                       <Typography>{flashcard.front}</Typography>
//                       <Typography variant="h6" sx={{ mt: 2 }}>Back:</Typography>
//                       <Typography>{flashcard.back}</Typography>
//                     </CardContent>
//                   </Card>
//                 </Grid>
//               ))}
//             </Grid>
//             <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={handleSave}
//                 disabled={!isSignedIn}
//               >
//                 Save Flashcards
//               </Button>
//               <Button
//                 variant="contained"
//                 color="secondary"
//                 onClick={handleDelete}
//               >
//                 Delete Flashcards
//               </Button>
//             </Box>
//           </Box>
//         )}
//       </Container>
//   )
// }
// "use client";

// import { useState, useEffect } from 'react';
// import { useUser } from '@clerk/nextjs';
// import { 
//   Container, 
//   TextField, 
//   Button, 
//   Typography, 
//   Box, 
//   Grid, 
//   Card, 
//   CardContent,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogContentText,
//   DialogActions
// } from '@mui/material';
// import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
// import { db } from '../../firebase'; // Adjust the path as necessary

// export default function Generate() {
//   const [text, setText] = useState('');
//   const [flashcards, setFlashcards] = useState([]);
//   const [dialogOpen, setDialogOpen] = useState(false);
//   const [setName, setSetName] = useState('');
//   const { isLoaded, isSignedIn, user } = useUser();

//   useEffect(() => {
//     async function getFlashcards() {
//       if (!isLoaded || !isSignedIn || !user) return;
//       const userId = user.id;
//       const docRef = doc(collection(db, 'users'), userId);
//       try {
//         const docSnap = await getDoc(docRef);
//         if (docSnap.exists()) {
//           const collections = docSnap.data().flashcards || [];
//           setFlashcards(collections);
//         } else {
//           await setDoc(docRef, { flashcards: [] });
//         }
//       } catch (error) {
//         console.error("Error fetching flashcards:", error);
//       }
//     }
//     getFlashcards();
//   }, [isLoaded, isSignedIn, user]);

  

//   const handleSubmit = async () => {
//     if (!text.trim()) {
//       alert('Please enter some text to generate flashcards.')
//       return
//     }
  
//     try {
//       const response = await fetch('/api/generate', {
//         method: 'POST',
//         body: text,
//       })
  
//       if (!response.ok) {
//         throw new Error('Failed to generate flashcards')
//       }
  
//       const data = await response.json()
//       setFlashcards(data)
//     } catch (error) {
//       console.error('Error generating flashcards:', error)
//       alert('An error occurred while generating flashcards. Please try again.')
//     }
//   }

//   const handleOpenDialog = () => {
//     // if (!isSignedIn) {
//     //   alert('Please sign in to save flashcards');
//     //   return;
//     // }
//     console.log("Opening dialog");
//     setDialogOpen(true);
//     setDialogOpen(true);
//   }


//   const handleCloseDialog = () => {
//     console.log("Closing dialog");
//     setDialogOpen(false);
//     setSetName('');
//   };

  

//   const handleSaveButtonClick = () => {
//     console.log("Save button clicked");
//     if (!setName.trim()) {
//       console.log("Set name is empty");
//       alert('Please enter a name for your flashcard set.');
//       return;
//     }
//     console.log("Proceeding to save flashcards");
//     saveFlashcardsToDatabase(setName, flashcards);
//   };

//   const saveFlashcardsToDatabase = async (name, cards) => {
//     console.log('Attempting to save flashcards:', name, cards);
//     try {
//       if (!db) {
//         console.error('Firestore database instance is undefined');
//         alert('Database connection error. Please try again later.');
//         return;
//       }
//       const flashcardSetRef = doc(collection(db, 'flashcardSets'), name);
//       await setDoc(flashcardSetRef, { flashcards: cards });
//       console.log('Flashcards saved successfully!');
//       alert('Flashcards saved successfully!');
//       handleCloseDialog();
//     } catch (error) {
//       console.error('Error saving flashcards:', error);
//       alert('An error occurred while saving flashcards. Please try again.');
//     }
//   };

//   const saveFlashcards = async () => {
//     if (!setName.trim()) {
//       alert('Please enter a name for your flashcard set.');
//       return;
//     }

//     try {
//       // Save directly to the root of the database
//       const flashcardSetRef = doc(collection(db, 'flashcardSets'), setName);
//       await setDoc(flashcardSetRef, { flashcards });
//       alert('Flashcards saved successfully!');
//       handleCloseDialog();
//     } catch (error) {
//       console.error('Error saving flashcards:', error);
//       alert('An error occurred while saving flashcards. Please try again.');
//     }
//   };
  //   try {
  //     const userDocRef = doc(collection(db, 'users'), user.id);
  //     const flashcardSetRef = doc(collection(userDocRef, 'flashcardSets'), setName);
  //     await setDoc(flashcardSetRef, { flashcards });
  //     alert('Flashcards saved successfully!');
  //     handleCloseDialog();
  //   } catch (error) {
  //     console.error('Error saving flashcards:', error);
  //     alert('An error occurred while saving flashcards. Please try again.');
  //   }
  // };

//   const handleDelete = () => {
//     setFlashcards([]);
//   };

//   return (
//     <Container maxWidth="md">
//       <Box sx={{ my: 4 }}>
//         <Typography variant="h4" component="h1" gutterBottom>
//           Generate Flashcards
//         </Typography>
//         <TextField
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           label="Enter text"
//           fullWidth
//           multiline
//           rows={4}
//           variant="outlined"
//           sx={{ mb: 2 }}
//         />
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={handleSubmit}
//           fullWidth
//         >
//           Generate Flashcards
//         </Button>
//       </Box>
      
//       {flashcards.length > 0 && (
//         <Box sx={{ mt: 4 }}>
//           <Typography variant="h5" component="h2" gutterBottom>
//             Generated Flashcards
//           </Typography>
//           <Grid container spacing={2}>
//             {flashcards.map((flashcard, index) => (
//               <Grid item xs={12} sm={6} md={4} key={index}>
//                 <Card>
//                   <CardContent>
//                     <Typography variant="h6">Front:</Typography>
//                     <Typography>{flashcard.front}</Typography>
//                     <Typography variant="h6" sx={{ mt: 2 }}>Back:</Typography>
//                     <Typography>{flashcard.back}</Typography>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//           <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleOpenDialog}
//             >
//               Save Flashcards
//             </Button>
//             <Button
//               variant="contained"
//               color="secondary"
//               onClick={handleDelete}
//             >
//               Delete Flashcards
//             </Button>
//           </Box>
//         </Box>
//       )}

//       <Dialog open={dialogOpen} onClose={handleCloseDialog}>
//         <DialogTitle>Save Flashcard Set</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             Please enter a name for your flashcard set.
//           </DialogContentText>
//           <TextField
//             autoFocus
//             margin="dense"
//             label="Set Name"
//             type="text"
//             fullWidth
//             value={setName}
//             onChange={(e) => setSetName(e.target.value)}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDialog}>Cancel</Button>
//           <Button onClick={handleSaveButtonClick} color="primary">
//             Save
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Container>
//   );
// }

"use client";

import { useState, useEffect } from 'react';
import { 
  Container, 
  TextField, 
  Button, 
  Typography, 
  Box, 
  Grid, 
  Card, 
  CardContent,
  CardActionArea,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';
import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase'; // Adjust the path as necessary
import '../flashcardStyles.css'; // Add this line for the CSS styles

export default function Generate() {
  const [text, setText] = useState('');
  const [flashcards, setFlashcards] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [setName, setSetName] = useState('');
  const [savedSets, setSavedSets] = useState([]);
  const [showSavedCards, setShowSavedCards] = useState(false);
  const [flippedCards, setFlippedCards] = useState([]); // Track the flipped state of each card


  useEffect(() => {
    fetchSavedSets();
  }, []);

  const fetchSavedSets = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'flashcardSets'));
      const sets = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSavedSets(sets);
    } catch (error) {
      console.error('Error fetching saved sets:', error);
    }
  };

  const handleGenerateFlashcards = async () => {
    if (!text.trim()) {
      alert('Please enter some text to generate flashcards.');
      return;
    }

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        body: JSON.stringify({ text }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to generate flashcards');
      }

      const data = await response.json();
      setFlashcards(data);
      setFlippedCards(new Array(data.length).fill(false)); // Initialize all cards as not flipped
    } catch (error) {
      console.error('Error generating flashcards:', error);
      alert('An error occurred while generating flashcards. Please try again.');
    }
  };

  const handleCardClick = (index) => {
    setFlippedCards(flippedCards.map((flipped, i) => i === index ? !flipped : flipped));
  };

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSetName('');
  };

  const handleDelete = () => {
    setFlashcards([]);
  };

  const handleSaveButtonClick = () => {
    if (!setName.trim()) {
      alert('Please enter a name for your flashcard set.');
      return;
    }
    saveFlashcardsToDatabase(setName, flashcards);
  };

  const saveFlashcardsToDatabase = async (name, cards) => {
    try {
      const flashcardSetRef = doc(collection(db, 'flashcardSets'), name);
      await setDoc(flashcardSetRef, { flashcards: cards });
      alert('Flashcards saved successfully!');
      handleCloseDialog();
      fetchSavedSets(); // Refresh the saved sets
    } catch (error) {
      console.error('Error saving flashcards:', error);
      alert('An error occurred while saving flashcards. Please try again.');
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Generate Flashcards
        </Typography>
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
        <Button
          variant="contained"
          color="primary"
          onClick={handleGenerateFlashcards}
          fullWidth
        >
          Generate Flashcards
        </Button>

        <Button
          variant="contained"
          color="secondary"
          onClick={() => setShowSavedCards(!showSavedCards)}
        >
          {showSavedCards ? 'Hide Saved Flashcards' : 'Show Saved Flashcards'}
        </Button>
      </Box>
      

      {flashcards.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Generated Flashcards
          </Typography>
          <Grid container spacing={2}>
            {flashcards.map((flashcard, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card className={`flashcard ${flippedCards[index] ? 'flipped' : ''}`} onClick={() => handleCardClick(index)}>
                <CardActionArea onClick={() => handleCardClick(index)}>
                     
                    <CardContent className="flashcard-inner">
                      <div className="flashcard-front">
                        <Typography>{flashcard.front}</Typography>
                      </div>
                      <div className="flashcard-back">
                        <Typography>{flashcard.back}</Typography>
                      </div>
                    </CardContent>
                  
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenDialog}
            >
              Save Flashcards
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleDelete}
            >
              Delete Flashcards
            </Button>
          </Box>
        </Box>
      )}

      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Save Flashcard Set</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter a name for your flashcard set.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Set Name"
            type="text"
            fullWidth
            value={setName}
            onChange={(e) => setSetName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSaveButtonClick} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}