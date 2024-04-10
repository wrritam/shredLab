import { Request } from "express";

export interface User {
   username: string;
   email: string;
   password: string;
}
export interface UserRequest extends Request {
   user?: User;
}
