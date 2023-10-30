//hooks
import { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';
//firebase imports
import { auth, db } from '../firebase/firebaseconfig';
import { updateDoc, doc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';

export const useLogout = () => {
  const [isPending, setIsPending] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { dispatch, user } = useAuthContext();

  const logout = async () => {
    setError(null);
    setIsPending(true);

    //update online status
    const { uid } = user;
    const updateLogOut = doc(db, 'users', uid);

    await updateDoc(updateLogOut, {
      online: false,
      displayName: user.displayName,
    });

    await signOut(auth)
      .then(() => {
        dispatch({ type: 'LOGOUT' });
        navigate('/');
        if (!isCancelled) {
          setIsPending(false);
          setError(null);
        }
      })
      .catch((error) => {
        if (!isCancelled) {
          setError(error.message);
          setIsPending(false);
        }
        console.log(error.message);
      });
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { logout, error, isPending };
};

//import this hook into the page where you will be logging out
// const { logout } = useLogOut(); in the function then use it as a onClick event
