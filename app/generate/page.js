
// "use client";

// import { useState, useEffect} from 'react';
// import { 
//   Container, 
//   TextField, 
//   Button, 
//   Typography, 
//   Box, 
//   Grid, 
//   Card, 
//   CardContent,
//   CardActionArea,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogContentText,
//   DialogActions
// } from '@mui/material';
// import { collection, doc, setDoc } from 'firebase/firestore';
// import { db } from '../../firebase'; // Adjust the path as necessary
// import '../flashcardStyles.css'; // Add this line for the CSS styles

// export default function Generate() {
//   //const [isLoaded, isSignedIn,user] = useUser();//new add 08/23

//   const [text, setText] = useState('');
//   const [flashcards, setFlashcards] = useState([]);
//   const [dialogOpen, setDialogOpen] = useState(false);
//   const [setName, setSetName] = useState('');
//   const [savedSets, setSavedSets] = useState([]);
//   const [showSavedCards, setShowSavedCards] = useState(false);
//   const [flippedCards, setFlippedCards] = useState([]); // Track the flipped state of each card
//   //const router = useRouter();//new add 08/23


//   useEffect(() => {
//     fetchSavedSets();
//   }, []);

//   const fetchSavedSets = async () => {
//     try {
//       const querySnapshot = await getDocs(collection(db, 'flashcardSets'));
//       const sets = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//       setSavedSets(sets);
//     } catch (error) {
//       console.error('Error fetching saved sets:', error);
//     }
//   };

//   const handleGenerateFlashcards = async () => {
//     if (!text.trim()) {
//       alert('Please enter some text to generate flashcards.');
//       return;
//     }

//     try {
//       const response = await fetch('/api/generate', {
//         method: 'POST',
//         body: JSON.stringify({ text }),
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (!response.ok) {
//         throw new Error('Failed to generate flashcards');
//       }

//       const data = await response.json();
//       setFlashcards(data);
//       setFlippedCards(new Array(data.length).fill(false)); // Initialize all cards as not flipped
//     } catch (error) {
//       console.error('Error generating flashcards:', error);
//       alert('An error occurred while generating flashcards. Please try again.');
//     }
//   };

//   const handleCardClick = (index) => {
//     setFlippedCards(flippedCards.map((flipped, i) => i === index ? !flipped : flipped));
//   };

//   const handleOpenDialog = () => {
//     setDialogOpen(true);
//   };

//   const handleCloseDialog = () => {
//     setDialogOpen(false);
//     setSetName('');
//   };

//   const handleDelete = () => {
//     setFlashcards([]);
//   };

//   const handleSaveButtonClick = () => {
//     if (!setName.trim()) {
//       alert('Please enter a name for your flashcard set.');
//       return;
//     }
//     saveFlashcardsToDatabase(setName, flashcards);
//   };

//   const saveFlashcardsToDatabase = async (name, cards) => {
//     try {
//       const flashcardSetRef = doc(collection(db, 'flashcardSets'), name);
//       await setDoc(flashcardSetRef, { flashcards: cards });
//       alert('Flashcards saved successfully!');
//       handleCloseDialog();
//       fetchSavedSets(); // Refresh the saved sets
//     } catch (error) {
//       console.error('Error saving flashcards:', error);
//       alert('An error occurred while saving flashcards. Please try again.');
//     }
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
//           onClick={handleGenerateFlashcards}
//           fullWidth
//         >
//           Generate Flashcards
//         </Button>

//         <Button
//           variant="contained"
//           color="secondary"
//           onClick={() => setShowSavedCards(!showSavedCards)}
//         >
//           {showSavedCards ? 'Hide Saved Flashcards' : 'Show Saved Flashcards'}
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
//                 <Card className={`flashcard ${flippedCards[index] ? 'flipped' : ''}`} onClick={() => handleCardClick(index)}>
//                 <CardActionArea onClick={() => handleCardClick(index)}>
                     
//                     <CardContent className="flashcard-inner">
//                       <div className="flashcard-front">
//                         <Typography>{flashcard.front}</Typography>
//                       </div>
//                       <div className="flashcard-back">
//                         <Typography>{flashcard.back}</Typography>
//                       </div>
//                     </CardContent>
                  
//                   </CardActionArea>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//           <Box sx={{ mt: 2 }}>
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

import { useState, useEffect} from 'react';
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
import { collection, doc, getDoc, setDoc, writeBatch, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase'; // Adjust the path as necessary
import '../flashcardStyles.css'; // Add this line for the CSS styles
import {useUser} from '@clerk/nextjs';//new add 08/23
import {useRouter} from 'next/navigation';//new add 08/23

export default function Generate() {
  const {isLoaded, isSignedIn,user} = useUser();//new add 08/23
  const router = useRouter();//new add 08/23

  const [text, setText] = useState('');
  const [flashcards, setFlashcards] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [setName, setSetName] = useState('');
  const [savedSets, setSavedSets] = useState([]);
  const [showSavedCards, setShowSavedCards] = useState(false);
  const [flippedCards, setFlippedCards] = useState([]); // Track the flipped state of each card


  // useEffect(() => {
  //   fetchSavedSets();
  // }, []);
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      fetchSavedSets();
    }
  }, [isLoaded, isSignedIn, user]);

  const fetchSavedSets = async () => {
    if (!user) return;

    try {
      const userSetsRef = collection(db, 'users', user.id, 'flashcardSets');
      const querySnapshot = await getDocs(userSetsRef);
      const sets = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSavedSets(sets);
    } catch (error) {
      console.error('Error fetching saved sets:', error);
    }
  };


  const saveFlashcards = async (replace = false) => {
    try {
      const userFlashcardsRef = doc(db, 'users', user.id, 'flashcardSets', setName);
      
      if (!replace) {
        // Check again if the set exists (in case of race conditions)
        const docSnap = await getDoc(userFlashcardsRef);
        if (docSnap.exists()) {
          alert('A set with this name was just created. Please choose a different name.');
          return;
        }
      }

      await setDoc(userFlashcardsRef, { flashcards: flashcards }, { merge: true });
      
      alert('Flashcards saved successfully!');
      handleCloseDialog();
      fetchSavedSets();
      setSetName('');
    } catch (error) {
      console.error('Error saving flashcards:', error);
      alert('An error occurred while saving flashcards. Please try again.');
    }
  };

  const handleConfirmReplace = () => {
    setConfirmDialogOpen(false);
    saveFlashcards(true);
  };

  const handleCloseConfirmDialog = () => {
    setConfirmDialogOpen(false);
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
    if (!isSignedIn || !user) {
      alert('Please sign in to save flashcards.');
      return;
    }
    if (!setName.trim()) {
      alert('Please enter a name for your flashcard set.');
      return;
    }
    //saveFlashcardsToDatabase(setName, flashcards);
    const existingSet = savedSets.find(set => set.id === setName);
    if (existingSet) {
      setConfirmDialogOpen(true);
    } else {
      saveFlashcards();
    }
  };

  // const handleSubmit = async () => {
  //   if (!text.trim()) {
  //     alert('Please enter some text to generate flashcards.')
  //     return
  //   }
  
  //   try {
  //     setGenerating(true)
  //     const response = await fetch('/api/generate', {
  //       method: 'POST',
  //       body: text,
  //     })
  
  //     if (!response.ok) {
  //       throw new Error('Failed to generate flashcards')
  //     }
  
  //     const data = await response.json()
  //     setFlashcards(data)
  //     setGenerating(false)
  //   } catch (error) {
  //     console.error('Error generating flashcards:', error)
  //     alert('An error occurred while generating flashcards. Please try again.')
  //   }
  // }

  // const fetchSavedSets = async () => {
  //   try {
  //     const querySnapshot = await getDocs(collection(db, 'flashcardSets'));
  //     const sets = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  //     setSavedSets(sets);
  //   } catch (error) {
  //     console.error('Error fetching saved sets:', error);
  //   }
  // };


  // const saveFlashcardsToDatabase = async (name, cards) => {
  //   try {
  //     const flashcardSetRef = doc(collection(db, 'flashcardSets'), name);
  //     await setDoc(flashcardSetRef, { flashcards: cards });
  //     alert('Flashcards saved successfully!');
  //     handleCloseDialog();
  //     fetchSavedSets(); // Refresh the saved sets
  //   } catch (error) {
  //     console.error('Error saving flashcards:', error);
  //     alert('An error occurred while saving flashcards. Please try again.');
  //   }
  // };

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
          {/* <Button onClick={handleSaveButtonClick} color="primary"> */}
          {/* <Button onClick={saveFlashcards} color="primary"> */}
          <Button onClick={handleSaveButtonClick} color="primary">  
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={confirmDialogOpen} onClose={handleCloseConfirmDialog}>
        <DialogTitle>Confirm Replace</DialogTitle>
        <DialogContent>
          <DialogContentText>
            A flashcard set with the name "{setName}" already exists. Do you want to replace it?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDialog}>Cancel</Button>
          <Button onClick={handleConfirmReplace} color="primary">
            Replace
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

