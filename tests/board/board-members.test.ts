import { Board } from "../../src/board";
import { User } from "../../src/user";

describe("Board - Member Management", () => {
  let board: Board;
  let user1: User, user2: User;
  let adminUser: User;

  beforeEach(() => {
    board = new Board("Project Board");
    user1 = new User("John");
    user2 = new User("Bob");
    adminUser = new User("Alice");
  });

  it("should add a member to the board", () => {
    board.addMember(user1, adminUser);
    expect(board.getMembers(adminUser)).toContainEqual(user1);
  });

  it("should not add a duplicate member", () => {
    board.addMember(user1, adminUser);
    expect(() => board.addMember(user1, adminUser)).toThrow(
      "User is already a member of this board"
    );
  });

  it("should throw an error if user is invalid", () => {
    expect(() =>
      board.addMember({ id: "", name: "John" } as User, adminUser)
    ).toThrow("Invalid member object");
    expect(() =>
      board.addMember({ id: "user-3", name: "" } as User, adminUser)
    ).toThrow("Invalid member object");
    expect(() => board.addMember(null as any, adminUser)).toThrow(
      "Invalid member object"
    );
  });

  it("should remove a member by ID", () => {
    board.addMember(user1, adminUser);
    board.addMember(user2, adminUser);
    board.removeMember(user1.id, adminUser);

    expect(board.getMembers(adminUser)).not.toContainEqual(user1);
    expect(board.getMembers(adminUser)).toContainEqual(user2);
  });

  it("should throw an error if user ID is invalid", () => {
    expect(() => board.removeMember("", adminUser)).toThrow("Invalid id");
    expect(() => board.removeMember("   ", adminUser)).toThrow("Invalid id");
    expect(() => board.removeMember(null as any, adminUser)).toThrow(
      "Invalid id"
    );
  });

  it("should throw an error if user ID does not exist", () => {
    expect(() => board.removeMember("non-existent-id", adminUser)).toThrow(
      "User not found"
    );
  });

  it("should return all board members", () => {
    board.addMember(user1, adminUser);
    board.addMember(user2, adminUser);

    expect(board.getMembers(adminUser)).toEqual([user1, user2]);
  });

  it("should return an empty array if there are no members", () => {
    expect(board.getMembers(adminUser)).toEqual([]);
  });
});
