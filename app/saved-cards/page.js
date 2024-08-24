// "use client";
// import { useState, useEffect } from 'react';
// import { useUser } from '@clerk/nextjs';
// import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
// import { db } from '../../firebase';
// import { Container, Typography, Grid, TextField, Button, Box, IconButton } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { useRouter } from 'next/navigation';

// export default function SavedCards() {
//   const [savedSets, setSavedSets] = useState([]);
//   const [filteredSets, setFilteredSets] = useState([]);
//   const [search, setSearch] = useState('');
//   const { isLoaded, isSignedIn, user } = useUser();
//   const router = useRouter();

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
//     setFilteredSets(sets);
//   };

//   const handleDelete = async (id) => {
//     const userDocRef = doc(collection(db, 'users'), user.id);
//     const setDocRef = doc(collection(userDocRef, 'flashcardSets'), id);
//     await deleteDoc(setDocRef);
//     fetchSavedSets(); // Refresh the list after deletion
//   };

//   const handleSearch = (e) => {
//     setSearch(e.target.value);
//     if (e.target.value) {
//       const filtered = savedSets.filter(set => 
//         set.id.toLowerCase().includes(e.target.value.toLowerCase())
//       );
//       setFilteredSets(filtered);
//     } else {
//       setFilteredSets(savedSets);
//     }
//   };

//   return (
//     <Container maxWidth="md">
//       <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
//         <Typography variant="h4" component="h1">
//           Saved Flashcard Sets
//         </Typography>
//         <Button variant="outlined" onClick={() => router.push('/generate')}>
//           Back to Generate Page
//         </Button>
//       </Box>

//       {/* Search Box */}
//       <Box sx={{ mb: 4, border: '1px solid red' }}> {/* Border to check rendering */}
//         <TextField
//           label="Search by name"
//           fullWidth
//           value={search}
//           onChange={handleSearch}
//           sx={{ mb: 4 }}
//         />
//       </Box>

//       <Grid container spacing={2}>
//         {filteredSets.map((set) => (
//           <Grid item xs={12} key={set.id} sx={{ border: '1px solid blue' }}> {/* Border to check rendering */}
//             <Box display="flex" justifyContent="space-between" alignItems="center">
//               <Typography variant="h6">{set.id}</Typography>
//               <Box>
//                 <Button 
//                   variant="outlined" 
//                   color="primary" 
//                   onClick={() => router.push(`/flashcard?id=${set.id}`)}
//                 >
//                   View
//                 </Button>
//                 <IconButton 
//                   color="secondary" 
//                   sx={{ ml: 2, border: '1px solid green' }} // Border to check rendering
//                   onClick={() => handleDelete(set.id)}
//                 >
//                   <DeleteIcon />
//                 </IconButton>
//               </Box>
//             </Box>
//           </Grid>
//         ))}
//       </Grid>
//       {filteredSets.length === 0 && (
//         <Typography variant="body1" sx={{ mt: 2 }}>
//           No flashcard sets found. {search ? 'Try a different search term.' : 'Create some flashcards!'}
//         </Typography>
//       )}
//     </Container>
//   );
// }


"use client";

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { Container, Typography, Grid, TextField, Button, Box, IconButton, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/navigation';

export default function SavedCards() {
  const [savedSets, setSavedSets] = useState([]);
  const [filteredSets, setFilteredSets] = useState([]);
  const [search, setSearch] = useState('');
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    console.log('UseEffect triggered', { isLoaded, isSignedIn });
    if (isLoaded && isSignedIn) {
      fetchSavedSets();
    }
  }, [isLoaded, isSignedIn]);

  const fetchSavedSets = async () => {
    try {
      console.log('Fetching saved sets');
      const userDocRef = doc(collection(db, 'users'), user.id);
      const setsCollectionRef = collection(userDocRef, 'flashcardSets');
      const snapshot = await getDocs(setsCollectionRef);
      const sets = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log('Fetched sets:', sets);
      setSavedSets(sets);
      setFilteredSets(sets);
    } catch (error) {
      console.error('Error fetching saved sets:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      console.log('Deleting set:', id);
      const userDocRef = doc(collection(db, 'users'), user.id);
      const setDocRef = doc(collection(userDocRef, 'flashcardSets'), id);
      await deleteDoc(setDocRef);
      fetchSavedSets(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting set:', error);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    const filtered = savedSets.filter(set => 
      set.id.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredSets(filtered);
    console.log('Filtered sets:', filtered);
  };

  console.log('Rendering SavedCards', { savedSets, filteredSets, search });

  if (!isLoaded || !isSignedIn) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth="md">
      <Grid container spacing={3}>
        {/* Header */}
        <Grid item xs={12}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h4" component="h1">
              Saved Flashcard Sets
            </Typography>
            <Button variant="outlined" onClick={() => router.push('/generate')}>
              Back to Generate Page
            </Button>
          </Box>
        </Grid>

        {/* Search Box */}
        <Grid item xs={12}>
          <TextField
            label="Search by name"
            fullWidth
            value={search}
            onChange={handleSearch}
          />
        </Grid>

        {/* Flashcard Sets */}
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 2 }}>
            {filteredSets.length === 0 ? (
              <Typography variant="body1">
                No flashcard sets found. {search ? 'Try a different search term.' : 'Create some flashcards!'}
              </Typography>
            ) : (
              filteredSets.map((set) => (
                <Box key={set.id} sx={{ mb: 2, p: 2, border: '1px solid #e0e0e0', borderRadius: '4px' }}>
                  <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item xs={6}>
                      <Typography variant="h6">{set.id}</Typography>
                    </Grid>
                    <Grid item>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => router.push(`/flashcard?id=${set.id}`)}
                        sx={{ mr: 1 }}
                      >
                        View
                      </Button>
                      <IconButton
                        color="secondary"
                        onClick={() => handleDelete(set.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Box>
              ))
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}


// "use client";

// import { useState, useEffect } from 'react';
// import { useUser } from '@clerk/nextjs';
// import { collection, getDocs } from 'firebase/firestore';
// import { db } from '../../firebase';
// import { Container, Typography, Grid, TextField, Button, Box, IconButton } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import Flashcard from '../flashcard/page';
// import { useRouter } from 'next/navigation';

// export default function SavedCards() {
//   const [savedSets, setSavedSets] = useState([]);
//   const [search, setSearch] = useState('');
//   const [filteredSets, setFilteredSets] = useState([]);
//   const { isLoaded, isSignedIn, user } = useUser();
//   const router = useRouter();

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
//     setFilteredSets(sets);
//   };
//   const handleDelete = async (id) => {
//     const userDocRef = doc(collection(db, 'users'), user.id);
//     const setDocRef = doc(collection(userDocRef, 'flashcardSets'), id);
//     await deleteDoc(setDocRef);
//     fetchSavedSets(); // Refresh the list after deletion
//   };
//   const handleSearch = (e) => {
//     setSearch(e.target.value);
//     if (e.target.value) {
//       const filtered = savedSets.filter(set => 
//         set.id.toLowerCase().includes(e.target.value.toLowerCase())
//       );
//       setFilteredSets(filtered);
//     } else {
//       setFilteredSets(savedSets);
//     }
//   };


//   return (
//     <Container maxWidth="md">
//       <Typography variant="h4" component="h1" gutterBottom>
//         Saved Flashcard Sets
//       </Typography>
//       <Button variant="outlined" onClick={() => router.push('/generate')}>
//           Back to Generate Page
//         </Button>
//       <TextField
//         label="Search by name"
//         fullWidth
//         value={search}
//         onChange={handleSearch}
//         sx={{ mb: 4 }}
//       />
//       <Grid container spacing={2}>
//       {filteredSets.map((set) => (
//           <Grid item xs={12} key={set.id}>
//             <Box display="flex" justifyContent="space-between" alignItems="center">
//               <Typography variant="h6">{set.id}</Typography>
//               <Box>
//                 <Button variant="outlined" color="primary" onClick={() => router.push(`/flashcard?id=${set.id}`)}>View</Button>
//                 <IconButton 
//                   color="secondary" 
//                   sx={{ ml: 2 }} 
//                   onClick={() => handleDelete(set.id)}
//                 >
//                   <DeleteIcon />
//                 </IconButton>
//               </Box>
//             </Box>
//           </Grid>
//         ))}
//       </Grid>
//     </Container>
//   );
// }









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