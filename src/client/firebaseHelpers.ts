import "firebase/analytics";
import "firebase/auth";
import firebase from "firebase/app";
import firebaseConfig from "../config/firebaseConfig.json";

let _app: firebase.app.App | null = null;

export function getApp() {
  if (_app) return _app;
  if (firebase.apps.length > 0) {
    return (_app = firebase.app());
  } else {
    _app = firebase.initializeApp(firebaseConfig);
    // firebase.analytics?.(); // TODO
    return _app;
  }
}

export function getAuth() {
  return getApp().auth();
}

export async function loginAnonymously(): Promise<firebase.auth.UserCredential | null> {
  try {
    const user = await firebase.auth().signInAnonymously();
    console.log(user);
    return user;
  } catch (error) {
    console.error("login failed", error);
    return null;
  }
}

export async function loginWithGithub() {
  const provider = new firebase.auth.GithubAuthProvider();
  try {
    const user = await firebase.auth().signInWithPopup(provider);
    console.log(user);
  } catch (error) {
    console.error("login failed", error);
  }
}

export async function linkWithGithub() {
  const provider = new firebase.auth.GithubAuthProvider();
  try {
    const user = await firebase.auth().currentUser?.linkWithPopup(provider);
    console.log(user);
  } catch (error) {
    console.error("login failed", error);
  }
}

// @ts-ignore
globalThis._app = firebase;
export async function logout() {
  try {
    const user = await firebase.auth().signOut();
    console.log(user);
  } catch (error) {
    console.error("login failed", error);
  }
}
