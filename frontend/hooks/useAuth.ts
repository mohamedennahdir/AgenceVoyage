'use client';

import { useEffect } from 'react';
import { auth, onAuthStateChanged } from '@/lib/firebase/auth';
import { useAuthStore } from '@/store/authStore';
import { db, COLLECTIONS, doc, getDoc } from '@/lib/firebase/firestore';
import type { User } from '@/types/user.types';

export function useAuth() {
  const { firebaseUser, userProfile, isLoading, isAuthenticated, setFirebaseUser, setUserProfile, setLoading } =
    useAuthStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setFirebaseUser(user);

      if (user) {
        try {
          const userDoc = await getDoc(doc(db, COLLECTIONS.users, user.uid));
          if (userDoc.exists()) {
            setUserProfile(userDoc.data() as User);
          }
        } catch {
          // User profile not yet created
        }
      } else {
        setUserProfile(null);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, [setFirebaseUser, setUserProfile, setLoading]);

  return { firebaseUser, userProfile, isLoading, isAuthenticated };
}
