"use client";

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { Container, Typography, Grid, TextField, Button, Box  } from '@mui/material';
import Flashcard from '../flashcard/page';

export default function SavedCards() {
  const [savedSets, setSavedSets] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredSets, setFilteredSets] = useState([]);
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
    setFilteredSets(sets);
  };
  const handleDelete = async (id) => {
    const userDocRef = doc(collection(db, 'users'), user.id);
    const setDocRef = doc(collection(userDocRef, 'flashcardSets'), id);
    await deleteDoc(setDocRef);
    fetchSavedSets(); // Refresh the list after deletion
  };
  const handleSearch = (e) => {
    setSearch(e.target.value);
    if (e.target.value) {
      const filtered = savedSets.filter(set => 
        set.id.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setFilteredSets(filtered);
    } else {
      setFilteredSets(savedSets);
    }
  };


  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        Saved Flashcard Sets
      </Typography>
      <TextField
        label="Search by name"
        fullWidth
        value={search}
        onChange={handleSearch}
        sx={{ mb: 4 }}
      />
      <Grid container spacing={2}>
      {filteredSets.map((set) => (
          <Grid item xs={12} key={set.id}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h6">{set.id}</Typography>
              <Box>
                <Button variant="outlined" color="primary" onClick={() => router.push(`/flashcard?id=${set.id}`)}>View</Button>
                <Button variant="contained" color="secondary" sx={{ ml: 2 }} onClick={() => handleDelete(set.id)}>Delete</Button>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

// "use client";

// import { useState, useEffect } from 'react';
// import { useUser } from '@clerk/nextjs';
// import { collection, getDocs } from 'firebase/firestore';
// import { db } from '../../firebase';
// import { Container, Typography, Grid } from '@mui/material';
// import Flashcard from '../flashcard/page';

// export default function SavedCards() {
//   const [savedSets, setSavedSets] = useState([]);
//   const { isLoaded, isSignedIn, user } = useUser();

//   useEffect(() => {
//     if (isLoaded && isSignedIn) {
//       fetchSavedSets();
//     }
//   }, [isLoaded, isSignedIn]);

//   const fetchSavedSets = async () => {
//     const userDocRef = doc(collection(db, 'users'), user.id);
//     const setsCollectionRef = collection(userDocRef, 'flashcardSets');
//     const snapshot = await getDocs(setsCollectionRef);
//     const sets = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//     setSavedSets(sets);
//   };

//   return (
//     <Container maxWidth="md">
//       <Typography variant="h4" component="h1" gutterBottom>
//         Saved Flashcard Sets
//       </Typography>
//       <Grid container spacing={2}>
//         {savedSets.map((set) => (
//           <Grid item xs={12} key={set.id}>
//             <Typography variant="h6">{set.id}</Typography>
//             <Grid container spacing={2}>
//               {set.flashcards.map((card, index) => (
//                 <Grid item xs={12} sm={6} md={4} key={index}>
//                   <Flashcard front={card.front} back={card.back} />
//                 </Grid>
//               ))}
//             </Grid>
//           </Grid>
//         ))}
//       </Grid>
//     </Container>
//   );
// }