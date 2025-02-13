import { Board } from ".";
import { Log } from "../log";
import { User } from "../user";

export class BoardActivity {
  logActivity(this: Board, action: string, user: User): void {
    if (!(user instanceof User)) {
      throw new Error("Invalid user object: must be an instance of User");
    }

    this.activityLog.push(new Log(action, user));
  }
}
