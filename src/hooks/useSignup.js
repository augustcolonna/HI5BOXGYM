//hooks
import { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
//firebase imports
import { auth, db } from "../firebase/firebaseconfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
// import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isCancelled, setIsCancelled] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const { dispatch } = useAuthContext();

  const signup = async (email, password, displayName) => {
    setError(null);
    setIsPending(true);
    await createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        dispatch({ type: "LOGIN", paylod: res.user });
        if (!isCancelled) {
          setIsPending(false);
          setError(null);
        }
        console.log(res.user);

        updateProfile(res.user, {
          displayName: displayName,
        });

        const uid = res.user.uid;
        setDoc(doc(db, "users", uid), {
          online: false,
          displayName,
        });
      })
      .catch((error) => {
        if (!isCancelled) {
          setError(error.message);
          setIsPending(false);
          console.log(error);
        }
      });
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { error, signup, isPending };
};
