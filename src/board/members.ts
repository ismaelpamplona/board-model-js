import { LogAction } from "../decorators/logAction";
import { User } from "../user";
import { Board } from "./index";

export class BoardMembers {
  @LogAction("Added a member")
  addMember(this: Board, user: User): void {
    if (!(user instanceof User)) {
      throw new Error("Invalid user object: must be an instance of User");
    }

    if (this.members.some((member) => member.id === user.id)) {
      throw new Error("User is already a member of this board");
    }

    this.members.push(user);
  }

  @LogAction("Removed a member")
  removeMember(this: Board, userId: string): void {
    if (!userId || userId.trim() === "") {
      throw new Error("Invalid id");
    }

    const index = this.members.findIndex((user) => user.id === userId);
    if (index === -1) {
      throw new Error("User not found");
    }

    this.members.splice(index, 1);
  }

  @LogAction("Got the members")
  getMembers(this: Board): User[] {
    return [...this.members];
  }
}
