import React from 'react';
import { createContext } from 'react';
import { createUserWithEmailAndPassword, getAuth, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from '../firebase/firebase.config';
import { useState } from 'react';
import { useEffect } from 'react';


export const AuthContext = createContext();
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const gitHubProvider = new GithubAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    // const [render, setRender] = useState(false)

    console.log(user, loading);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const login = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const loginWithGoogle = () => {
        return signInWithPopup(auth, googleProvider);
    }
    const loginWithGitHub = () => {
        return signInWithPopup(auth, gitHubProvider);
    }

    const updateUser = (userInfo) => {
        return updateProfile(auth.currentUser, userInfo)
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    // useEffect(() => {
    //     const unsubscribe = onAuthStateChanged(auth, currentUser => {
    //         console.log('User Observing');
    //         setUser(currentUser);
    //         setLoading(false)
    //     });
    //     return () => unsubscribe();
    // }, [])

    useEffect(() => {

        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            console.log(currentUser);
            if (currentUser) {
                fetch(`http://localhost:5000/user?email=${currentUser.email}`)
                    .then(res => res.json())
                    .then(data => {
                        data.uid = currentUser.uid
                        setUser(data)

                        setLoading(false);
                    })
            }
            else {
                // setUser(null)
                setLoading(false);
            }
        })
        return () => unSubscribe();
    }, [])



    const authInfo = {
        user,
        loading,
        setUser,
        setLoading,
        createUser,
        login,
        loginWithGoogle,
        loginWithGitHub,
        updateUser,
        logOut,
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;