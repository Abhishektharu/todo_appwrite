import React, { createContext, useEffect, useState } from "react";
import { account } from "../appwrite/appwrite";
import { ID } from "appwrite";
import { useDispatch } from "react-redux";
import {login as authLogin, logout} from "../redux/AuthSlice"
export const UserContext = createContext();

export function UserProvider(props) {

  const dispatch = useDispatch();

  const [user, setUser] = useState(null);

  async function login(email, password) {
    const session = await account.createEmailPasswordSession(email, password);
    const loggedIn = await account.get();
    setUser(loggedIn);
    
    
    dispatch(authLogin({userData: loggedIn}))
    window.location.replace("/");
  }

  async function logout() {
    await account.deleteSession("current");
    setUser(null);
  }

  async function register(email, password, fullName) {
    await account.create(ID.unique(), email, password, fullName);
    await login(email, password);
  }

  async function getLoggedInUser() {
    try {
      // const loggedIn = await account.get();
      // setUser(loggedIn);
      // dispatch(authLogin({userData: loggedIn}))
      return await account.get();
    } catch (error) {
      console.error("Error fetching logged in user:", error);
      return null;
    }
  }

  useEffect(() => {
    getLoggedInUser();
  }, []);
  return (
    <UserContext.Provider value={{ user, login, logout, register, getLoggedInUser }}>
      {props.children}
    </UserContext.Provider>
  );
}
