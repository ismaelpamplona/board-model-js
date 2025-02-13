import { User } from "./user";

export class Log {
  action: string;
  user: User;
  timestamp: Date;

  constructor(action: string, user: User) {
    if (!action.trim()) {
      throw new Error("Action must be a non-empty string");
    }

    this.action = action.trim();
    this.user = user;
    this.timestamp = new Date();
  }
}
