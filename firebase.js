import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
 apiKey: process.env.FB_API_KEY,
 authDomain: process.env.AUTH_DOMAIN,
 projectId: process.env.PROJECT_ID,
 storageBucket: process.env.STORAGE_BUCKET,
 messagingSenderId: process.env.MESSAGING_SENDER_ID,
 appId: process.env.FB_APP_ID
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default { db };