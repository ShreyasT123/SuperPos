// context/AuthContext.tsx
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '@/lib/firebase'; // Adjust path as needed
import {
  User,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  NextOrObserver, // Import observer type
  Unsubscribe // Import unsubscribe type
} from 'firebase/auth';

// Define the shape of the context value
type AuthContextType = {
  user: User | null;
  loading: boolean; // Add loading state to context
  signInWithGoogle: () => Promise<any>; // Consider more specific return type if needed
  logout: () => Promise<void>;
};

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true, // Default loading to true
    signInWithGoogle: async () => {}, // Default async function
    logout: async () => {}, // Default async function
});

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

// Context Provider component
export const AuthContextProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // Initialize loading state

  // Effect to listen for auth state changes
  useEffect(() => {
    const handleAuthStateChange: NextOrObserver<User | null> = (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // console.log("User logged in:", currentUser.uid);
      } else {
        setUser(null);
        // console.log("User logged out");
      }
      setLoading(false); // Set loading to false once auth state is determined
    };

    const unsubscribe: Unsubscribe = onAuthStateChanged(auth, handleAuthStateChange);

    // Cleanup function to unsubscribe when the component unmounts
    return () => unsubscribe();
  }, []); // Empty dependency array ensures this runs only once on mount

  // Google Sign-In function
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      setLoading(true); // Optionally set loading during sign-in
      const result = await signInWithPopup(auth, provider);
      // User state will be updated by onAuthStateChanged listener
      return result;
    } catch (error) {
      console.error('Error signing in with Google:', error);
      setLoading(false); // Ensure loading is reset on error
      throw error; // Re-throw error for potential handling in component
    }
    // Loading will be set to false by the listener
  };

  // Logout function
  const logout = async () => {
    try {
      setLoading(true); // Optionally set loading during sign-out
      await signOut(auth);
      // User state will be updated by onAuthStateChanged listener
    } catch (error) {
      console.error('Error signing out:', error);
      setLoading(false); // Ensure loading is reset on error
      throw error; // Re-throw error
    }
    // Loading will be set to false by the listener
  };

  // Provide the context value to children
  const value: AuthContextType = {
    user,
    loading, // Provide loading state
    signInWithGoogle,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {/* Render children only after initial loading is complete */}
      {/* Or handle loading state within consuming components */}
      {children}
    </AuthContext.Provider>
  );
};