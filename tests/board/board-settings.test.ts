import { Board } from "../../src/board";

describe("Board - Settings Management", () => {
  let board: Board;

  beforeEach(() => {
    board = new Board("Project Board");
  });

  it("should update board settings", () => {
    board.updateSettings({ visibility: "public", allowComments: "everyone" });

    expect(board.settings.visibility).toBe("public");
    expect(board.settings.allowComments).toBe("everyone");
    expect(board.updatedAt).toBeInstanceOf(Date);
  });

  it("should preserve unchanged settings", () => {
    board.updateSettings({ allowInvites: false });

    expect(board.settings.visibility).toBe("private"); // Default remains
    expect(board.settings.allowInvites).toBe(false); // Updated
  });
  
  it("should throw an error for invalid settings and not add them", () => {
    expect(() =>
      board.updateSettings({ fakeSetting: "invalid" } as any)
    ).toThrow("Invalid setting: fakeSetting");

    expect(board.settings).not.toHaveProperty("fakeSetting"); // Ensures it wasn't added
    expect(board.updatedAt).toBeInstanceOf(Date); // Still updates the timestamp
  });
});
