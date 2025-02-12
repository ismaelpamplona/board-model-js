import { Board } from "../src/board";

describe("Board Class", () => {
  let board: Board;

  beforeEach(() => {
    board = new Board("Project Board");
  });

  it("should create a board with default values", () => {
    expect(board.id).toBeDefined();
    expect(board.title).toBe("Project Board");
    expect(board.lists).toEqual([]);
    expect(board.createdAt).toBeInstanceOf(Date);
    expect(board.updatedAt).toBeInstanceOf(Date);
    expect(board.backgroundImage).toBe("");
    expect(board.backgroundColor).toBe("");
    expect(board.isArchived).toBe(false);
    expect(board.members).toEqual([]);
    expect(board.labels).toEqual([]);
    expect(board.activityLog).toEqual([]);
    expect(board.starred).toBe(false);
    expect(board.invitationLink).toBe("");
    expect(board.settings.visibility).toBe("private");
  });

  it("should throw an error if title is invalid", () => {
    expect(() => new Board("")).toThrow("Title must be a non-empty string");
    expect(() => new Board("   ")).toThrow("Title must be a non-empty string");
    expect(() => new Board(null as any)).toThrow(
      "Title must be a non-empty string"
    );
    expect(() => new Board(undefined as any)).toThrow(
      "Title must be a non-empty string"
    );
    expect(() => new Board(123 as any)).toThrow(
      "Title must be a non-empty string"
    );
  });

  it("should add a new list", () => {
    const list = board.addList("To Do");

    expect(board.lists.length).toBe(1);
    expect(board.lists[0]).toBe(list);
    expect(list.title).toBe("To Do");
  });

  it("should remove a list by ID", () => {
    const list = board.addList("To Do");
    board.removeList(list.id);

    expect(board.lists.length).toBe(0);
  });

  it("should do nothing if list ID does not exist", () => {
    board.addList("To Do");
    board.removeList("invalid-id");

    expect(board.lists.length).toBe(1); // No change
  });

  it("should return a list by ID", () => {
    const list = board.addList("In Progress");
    expect(board.getListById(list.id)).toBe(list);
  });

  it("should return null if list is not found", () => {
    expect(board.getListById("non-existent-id")).toBeNull();
  });

  it("should move a list to a new position", () => {
    const list1 = board.addList("To Do");
    const list2 = board.addList("In Progress");
    const list3 = board.addList("Done");

    board.moveList(list1.id, 2);

    expect(board.lists[0].id).toBe(list2.id);
    expect(board.lists[1].id).toBe(list3.id);
    expect(board.lists[2].id).toBe(list1.id);
  });

  it("should not move a list if position is out of bounds", () => {
    const list = board.addList("To Do");
    board.moveList(list.id, 10);

    expect(board.lists[0].id).toBe(list.id);
  });

  it("should not move a list if list ID is invalid", () => {
    board.addList("To Do");
    board.moveList("invalid-id", 1);

    expect(board.lists.length).toBe(1); // No change
  });
});
