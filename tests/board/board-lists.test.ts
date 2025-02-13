import { Board } from "../../src/board";
import { User } from "../../src/user";

describe("Board - List Management", () => {
  let board: Board;
  let user: User;

  beforeEach(() => {
    board = new Board("Project Board");
    user = new User("Alice");
  });

  it("should add a new list", () => {
    const list = board.addList("To Do", user);

    expect(board.lists.length).toBe(1);
    expect(board.lists[0]).toBe(list);
  });

  it("should remove a list by ID", () => {
    const list = board.addList("To Do", user);
    board.removeList(list.id, user);

    expect(board.lists.length).toBe(0);
  });

  it("should return null if list is not found", () => {
    expect(board.getListById("non-existent-id", user)).toBeNull();
  });

  it("should move a list to a new position", () => {
    const list1 = board.addList("To Do", user);
    const list2 = board.addList("In Progress", user);

    board.moveList(list1.id, 1, user);

    expect(board.lists[0]).toBe(list2);
    expect(board.lists[1]).toBe(list1);
  });
});
