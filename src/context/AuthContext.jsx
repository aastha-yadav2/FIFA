import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { 
  auth, 
  db, 
  googleProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut 
} from '../firebase';

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

/* ── Role definitions ─────────────────────────────────────── */
export const ROLES = {
  admin:     { label: 'Operations Manager', color: '#1E88E5', access: ['all'] },
  security:  { label: 'Security Officer',   color: '#C62828', access: ['dashboard', 'crowd-monitoring', 'incident-reporting', 'ai-assistant'] },
  volunteer: { label: 'Volunteer',          color: '#2E7D32', access: ['dashboard', 'navigation', 'ai-assistant', 'volunteer-center'] },
};

/* ── Role-based access guard ──────────────────────────────── */
export function canAccess(user, routePath) {
  if (!user) return false;
  const access = ROLES[user.role]?.access || [];
  if (access.includes('all')) return true;
  const segment = routePath.split('/')[1]; // e.g. 'crowd-monitoring'
  return access.includes(segment);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading]         = useState(true);

  // Helper to fetch or create user profile in Firestore
  const fetchOrCreateUserProfile = async (user, role = 'admin') => {
    const userRef = doc(db, 'users', user.uid);
    const docSnap = await getDoc(userRef);
    let userData = {};

    if (docSnap.exists()) {
      userData = docSnap.data();
    } else {
      userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || 'New User',
        role: role,
        roleLabel: ROLES[role]?.label || ROLES.admin.label,
        photoURL: user.photoURL,
      };
      await setDoc(userRef, userData);
    }
    return { ...user, ...userData };
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const profile = await fetchOrCreateUserProfile(user);
          setCurrentUser(profile);
        } catch (error) {
          console.error("Error fetching user profile:", error);
          setCurrentUser(user);
        }
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  /* Sign in with Google */
  const signInWithGoogle = async (role = 'admin') => {
    const result = await signInWithPopup(auth, googleProvider);
    const profile = await fetchOrCreateUserProfile(result.user, role);
    setCurrentUser(profile);
    return profile;
  };

  /* Sign in with email — role passed from login form */
  const signInWithEmail = async (email, password, role = 'admin') => {
    let result;
    try {
      result = await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
        // Fallback to create user for demo purposes if they don't exist
        result = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        throw error;
      }
    }
    const profile = await fetchOrCreateUserProfile(result.user, role);
    setCurrentUser(profile);
    return profile;
  };

  const signOutUser = async () => {
    await signOut(auth);
  };

  const value = {
    currentUser,
    signInWithGoogle,
    signInWithEmail,
    signOut: signOutUser,
    loading,
    ROLES,
    canAccess,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
