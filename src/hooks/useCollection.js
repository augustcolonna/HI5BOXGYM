//react hooks and functions
import { useEffect, useState, useRef } from 'react';
//firebase imports
import { onSnapshot, collection, query, where } from 'firebase/firestore';
import { db } from '../firebase/firebaseconfig';

export const useCollection = (anyCollection, _q) => {
  const [documents, setDocuments] = useState(null);

  //set up query
  const q = useRef(_q).current;

  useEffect(() => {
    //using "anyCollection" as a placeholder for the collection name
    let ref = collection(db, anyCollection);

    if (q) {
      ref = query(ref, where(...q));
    }

    const unsubscribe = onSnapshot(ref, (snapshot) => {
      let results = [];
      snapshot.docs.forEach((doc) => {
        results.push({ ...doc.data(), id: doc.id });
      });
      setDocuments(results);
    });

    return () => unsubscribe();
  }, [anyCollection, q]);

  return { documents };
};
