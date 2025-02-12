import { Board } from "../../src/board";

describe("Board - Title Management", () => {
  let board: Board;

  beforeEach(() => {
    board = new Board("Initial Title");
  });

  it("should change the board title", () => {
    board.changeTitle("New Project Title");

    expect(board.title).toBe("New Project Title");
    expect(board.updatedAt).toBeInstanceOf(Date);
  });

  it("should trim whitespace from the title", () => {
    board.changeTitle("   Trimmed Title   ");

    expect(board.title).toBe("Trimmed Title");
  });

  it("should throw an error if title is empty", () => {
    expect(() => board.changeTitle("")).toThrow(
      "Title must be a non-empty string"
    );
    expect(() => board.changeTitle("   ")).toThrow(
      "Title must be a non-empty string"
    );
  });
});
