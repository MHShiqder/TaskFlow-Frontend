import React, { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../Firebase/firebase.init"
const googleProvider = new GoogleAuthProvider();
export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log("currentUser", currentUser)
            setUser(currentUser)
            setLoading(false)
        })
        return () => {
            unsubscribe()
        }
    }, [])

    const googleSignIn = () => {
        setLoading(true)
        return signInWithPopup(auth,googleProvider)
    }
    const logOut=()=>{
        setLoading(true)
        return signOut(auth)
    }
const info={
    loading,
    user,
    googleSignIn,
    logOut,

}
    return (
        <AuthContext.Provider value={info}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;