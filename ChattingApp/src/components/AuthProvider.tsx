import React from 'react';
import { ReactNode, useEffect, useState, useCallback, useMemo } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Collections, User } from '../types';
import AuthContext from './AuthContext';
import storage from '@react-native-firebase/storage';
import _ from 'lodash';

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [initialized, setInitialized] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [processingSignUp, setProcessingSignUp] = useState(false);
  const [processingSignIn, setProcessingSignIn] = useState(false);
  useEffect(() => {
    const unsubscribe = auth().onUserChanged(async (fbUser: any) => {
      console.log('user : ', fbUser);
      if (fbUser != null) {
        //login
        setUser({
          userId: fbUser.uid,
          email: fbUser.email ?? '',
          name: fbUser.displayName ?? '',
          profileUrl: fbUser.photoURL ?? '',
        });
      } else {
        //logout
        setUser(null);
      }
      setInitialized(true);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const signUp = useCallback(
    async (email: string, password: string, name: string) => {
      setProcessingSignUp(true);
      try {
        const { user: currentUser } =
          await auth().createUserWithEmailAndPassword(email, password);
        await currentUser?.updateProfile({ displayName: name });
        await firestore()
          .collection(Collections.USERS)
          .doc(currentUser?.uid)
          .set({
            userId: currentUser?.uid,
            email,
            name,
          });
      } finally {
        setProcessingSignUp(false);
      }
    },
    [],
  );

  const updateProfileImage = useCallback(
    async (filepath: string) => {
      const filename = _.last(filepath.split('/'));
      if (filename == null) {
        throw new Error('fileName is undefined');
      }
      if (user == null) {
        throw new Error('user is undefined');
      }
      const storageFilepath = `users/${user.userId}/${filename}`;
      await storage().ref(storageFilepath).putFile(filepath);
      const url = await storage().ref(storageFilepath).getDownloadURL();
      await auth().currentUser?.updateProfile({ photoURL: url });
      await firestore().collection(Collections.USERS).doc(user.userId).update({
        profileUrl: url,
      });
    },

    [user],
  );

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      setProcessingSignIn(true);
      await auth().signInWithEmailAndPassword(email, password);
    } finally {
      setProcessingSignIn(false);
    }
  }, []);

  const value = useMemo(() => {
    return {
      initialized,
      user,
      signUp,
      processingSignUp,
      signIn,
      processingSignIn,
      updateProfileImage,
    };
  }, [
    initialized,
    user,
    signUp,
    processingSignUp,
    signIn,
    processingSignIn,
    updateProfileImage,
  ]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
