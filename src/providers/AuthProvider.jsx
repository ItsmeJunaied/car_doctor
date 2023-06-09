import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import app from "../firebase/firebase.config";
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword} from "firebase/auth";
// import { getAuth } from "firebase/auth";
export const AuthContext = createContext();
const auth = getAuth(app);




const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null);
    const[loading,setLoading]= useState(true);

    const createUser= (email,password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password);
    
    }
    const signIn=(email,password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password);

    }
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,currentUser=>{
            setUser(currentUser);
            console.log('current user', currentUser);
            setLoading(false);
        });
        return ()=>{
            return unsubscribe();
        }
    },[])
    const authInfo={
        user,
        loading,
        createUser,
        signIn
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
  };
export default AuthProvider;