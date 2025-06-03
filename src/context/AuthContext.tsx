import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged
} from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';
// import { supabase } from '../lib/supabase';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  userProfile: any | null;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  loading: true,
  signInWithGoogle: async () => { },
  signOut: async () => { },
  userProfile: null
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<any | null>(null);

  // Function to sync Firebase user with Supabase
  const syncUserWithDatabase = async (user: User) => {
    if (!user) return null;

    try {
      // Check if user exists in database
      // const { data: existingUser } = await supabase
      //   .from('users')
      //   .select('*')
      //   .eq('id', user.uid)
      //   .single();

      // if (!existingUser) {
      //   // Create new user in database
      //   const { data: newUser, error } = await supabase
      //     .from('users')
      //     .insert({
      //       id: user.uid,
      //       email: user.email || '',
      //       display_name: user.displayName,
      //       avatar_url: user.photoURL,
      //       role: 'user'
      //     })
      //     .select()
      //     .single();

      //   if (error) throw error;
      //   return newUser;
      // }

      // return existingUser;
    } catch (error) {
      console.error('Error syncing user with database:', error);
      return null;
    }
  };

  // Sign in with Google
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const profile = await syncUserWithDatabase(result.user);
      setUserProfile(profile);
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  // Sign out
  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      setUserProfile(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);

      if (user) {
        const profile = await syncUserWithDatabase(user);
        setUserProfile(profile);
      } else {
        setUserProfile(null);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    loading,
    signInWithGoogle,
    signOut,
    userProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};