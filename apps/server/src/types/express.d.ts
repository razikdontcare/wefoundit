import { User } from "../types/UserType.js";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
