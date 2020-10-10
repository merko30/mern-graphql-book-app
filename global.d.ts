import { UserI } from "./models/user";

import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: UserI;
    }
  }
}
