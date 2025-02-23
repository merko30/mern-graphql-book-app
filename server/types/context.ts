import { Response } from "express";
import { Request } from "express-jwt";

export default interface Context {
  req: Request;
  res: Response;
}
