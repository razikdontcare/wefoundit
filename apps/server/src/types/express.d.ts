import { User } from "../types/UserType";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
