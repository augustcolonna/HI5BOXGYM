//react hooks
import { useEffect, useState } from 'react';
// firebase import
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/firebaseconfig';

export const useDocument = (c, id) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);
  // realtime document data
  useEffect(() => {
    const ref = doc(db, c, id);

    const unsubscribe = onSnapshot(
      ref,
      (snapshot) => {
        // need to make sure the doc exists & has data
        if (snapshot.data()) {
          setDocument({ ...snapshot.data(), id: snapshot.id });
          setError(null);
        } else {
          setError('document does not exist');
        }
      },
      (error) => {
        console.log(error.message);
        setError('failed to get document');
      }
    );

    // unsubscribe on unmount
    return () => unsubscribe();
  }, [c, id]);

  return { document, error };
};
