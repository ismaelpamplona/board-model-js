import { Board } from "../../src/board";
import { User } from "../../src/user";

describe("Board - Member Management", () => {
  let board: Board;
  let user1: User, user2: User;

  beforeEach(() => {
    board = new Board("Project Board");
    user1 = new User("Alice");
    user2 = new User("Bob");
  });

  it("should add a member to the board", () => {
    board.addMember(user1);
    expect(board.getMembers()).toContainEqual(user1);
  });

  it("should not add a duplicate member", () => {
    board.addMember(user1);
    expect(() => board.addMember(user1)).toThrow(
      "User is already a member of this board"
    );
  });

  it("should throw an error if user is invalid", () => {
    expect(() => board.addMember({ id: "", name: "Alice" } as User)).toThrow(
      "Invalid user object"
    );
    expect(() => board.addMember({ id: "user-3", name: "" } as User)).toThrow(
      "Invalid user object"
    );
    expect(() => board.addMember(null as any)).toThrow("Invalid user object");
  });

  it("should remove a member by ID", () => {
    board.addMember(user1);
    board.addMember(user2);
    board.removeMember(user1.id);

    expect(board.getMembers()).not.toContainEqual(user1);
    expect(board.getMembers()).toContainEqual(user2);
  });

  it("should throw an error if user ID is invalid", () => {
    expect(() => board.removeMember("")).toThrow("Invalid id");
    expect(() => board.removeMember("   ")).toThrow("Invalid id");
    expect(() => board.removeMember(null as any)).toThrow("Invalid id");
  });

  it("should throw an error if user ID does not exist", () => {
    expect(() => board.removeMember("non-existent-id")).toThrow(
      "User not found"
    );
  });

  it("should return all board members", () => {
    board.addMember(user1);
    board.addMember(user2);

    expect(board.getMembers()).toEqual([user1, user2]);
  });

  it("should return an empty array if there are no members", () => {
    expect(board.getMembers()).toEqual([]);
  });
});
