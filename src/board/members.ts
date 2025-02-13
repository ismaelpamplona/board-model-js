import { LogAction } from "../decorators/logAction";
import { User } from "../user";
import { Board } from "./index";

export class BoardMembers {
  @LogAction("Added a member")
  addMember(this: Board, newMember: User, _adminUser: User): void {
    if (!(newMember instanceof User)) {
      throw new Error("Invalid member object: must be an instance of User");
    }

    if (this.members.some((member) => member.id === newMember.id)) {
      throw new Error("User is already a member of this board");
    }

    this.members.push(newMember);
  }

  @LogAction("Removed a member")
  removeMember(this: Board, userId: string, _adminUser: User): void {
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
  getMembers(this: Board, _adminUser: User): User[] {
    return [...this.members];
  }
}
