import * as admin from "firebase-admin";
import firebaseAdminConfig from "../config/firebaseAdminConfig.json";
/**
 * DO NOT READ IT FROM CLIENT
 * */
export function getAdmin(): admin.app.App {
  if (admin.apps.length > 0) {
    return admin.apps[0] as admin.app.App;
  } else {
    const app = admin.initializeApp({
      credential: admin.credential.cert(firebaseAdminConfig as any),
      databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
    });
    return app;
  }
}

export async function verifyIdToken(idToken: string) {
  const admin = getAdmin();
  return await admin.auth().verifyIdToken(idToken);
}
