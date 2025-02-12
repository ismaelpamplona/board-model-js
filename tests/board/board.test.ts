import { Board } from "../../src/board";

describe("Board - Initialization", () => {
  it("should create a board with default values", () => {
    const board = new Board("Project Board");

    expect(board.id).toBeDefined();
    expect(board.title).toBe("Project Board");
    expect(board.lists).toEqual([]);
    expect(board.createdAt).toBeInstanceOf(Date);
    expect(board.updatedAt).toBeInstanceOf(Date);
    expect(board.settings.visibility).toBe("private");
  });

  it("should throw an error if title is empty", () => {
    expect(() => new Board("")).toThrow("Title must be a non-empty string");
    expect(() => new Board("   ")).toThrow("Title must be a non-empty string");
  });
});
