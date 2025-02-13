import { Board } from "../../src/board";
import { User } from "../../src/user";

describe("Board - Title Management", () => {
  let board: Board;
  let user: User;

  beforeEach(() => {
    board = new Board("Initial Title");
    user = new User("Alice");
  });

  it("should change the board title", () => {
    board.changeTitle("New Project Title", user);

    expect(board.title).toBe("New Project Title");
    expect(board.updatedAt).toBeInstanceOf(Date);
  });

  it("should trim whitespace from the title", () => {
    board.changeTitle("   Trimmed Title   ", user);

    expect(board.title).toBe("Trimmed Title");
  });

  it("should throw an error if title is empty", () => {
    expect(() => board.changeTitle("", user)).toThrow(
      "Title must be a non-empty string"
    );
    expect(() => board.changeTitle("   ", user)).toThrow(
      "Title must be a non-empty string"
    );
  });
});
