import { initializeApp, AppOptions, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import { env } from "../config";

const adminConfig: AppOptions = {
  credential: cert({
    projectId: env.FIREBASE_PROJECTID,
    clientEmail: env.ADMIN_CLIENTEMAIL,
    privateKey: env.ADMIN_PRIVATEKEY?.replace(/\\n/g, "\n"),
  }),
};

const firebaseApp = initializeApp(adminConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
export { firebaseApp, db, auth };
