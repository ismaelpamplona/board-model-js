import { Board } from "../../src/board";

describe("Board - List Management", () => {
  let board: Board;

  beforeEach(() => {
    board = new Board("Project Board");
  });

  it("should add a new list", () => {
    const list = board.addList("To Do");

    expect(board.lists.length).toBe(1);
    expect(board.lists[0]).toBe(list);
  });

  it("should remove a list by ID", () => {
    const list = board.addList("To Do");
    board.removeList(list.id);

    expect(board.lists.length).toBe(0);
  });

  it("should return null if list is not found", () => {
    expect(board.getListById("non-existent-id")).toBeNull();
  });

  it("should move a list to a new position", () => {
    const list1 = board.addList("To Do");
    const list2 = board.addList("In Progress");

    board.moveList(list1.id, 1);

    expect(board.lists[0]).toBe(list2);
    expect(board.lists[1]).toBe(list1);
  });
});
