import { Board } from "../../src/board";
import { User } from "../../src/user";

describe("Board - Settings Management", () => {
  let board: Board;
  let user: User;

  beforeEach(() => {
    board = new Board("Project Board");
    user = new User("Alice");
  });

  it("should update board settings", () => {
    board.updateSettings(
      { visibility: "public", allowComments: "everyone" },
      user
    );

    expect(board.settings.visibility).toBe("public");
    expect(board.settings.allowComments).toBe("everyone");
    expect(board.updatedAt).toBeInstanceOf(Date);
  });

  it("should preserve unchanged settings", () => {
    board.updateSettings({ allowInvites: false }, user);

    expect(board.settings.visibility).toBe("private"); // Default remains
    expect(board.settings.allowInvites).toBe(false); // Updated
  });

  it("should throw an error for invalid settings and not add them", () => {
    expect(() =>
      board.updateSettings({ fakeSetting: "invalid" } as any, user)
    ).toThrow("Invalid setting: fakeSetting");

    expect(board.settings).not.toHaveProperty("fakeSetting"); // Ensures it wasn't added
    expect(board.updatedAt).toBeInstanceOf(Date); // Still updates the timestamp
  });
});
