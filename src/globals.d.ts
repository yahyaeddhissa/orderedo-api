import { User } from "./user/models";

declare module "express-session" {
  interface SessionData {
    user: User;
    browser: string;
    platform: string;
  }
}
