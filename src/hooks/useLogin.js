//hooks
import { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
//firebase imports
import { auth, db } from '../firebase/firebaseconfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { updateDoc, doc } from 'firebase/firestore';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const { dispatch } = useAuthContext();

  const login = (email, password) => {
    setError(null);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        dispatch({ type: 'LOGIN', payload: userCredential.user });
        if (!isCancelled) {
          setIsPending(false);
          setError(null);
        }
        const updateLogIn = doc(db, 'users', userCredential.user.uid);
        updateDoc(updateLogIn, {
          online: true,
        });
      })
      .catch((error) => {
        if (!isCancelled) {
          setError(error.message);
          setIsPending(false);
        }
      });
  };
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { error, login, isPending };
};
