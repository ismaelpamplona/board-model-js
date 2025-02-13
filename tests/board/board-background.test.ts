import { Board } from "../../src/board";
import { User } from "../../src/user";

describe("Board - Background Customization", () => {
  let board: Board;
  let user: User;

  beforeEach(() => {
    board = new Board("Project Board");
    user = new User("Alice");
  });

  it("should change the background image", () => {
    board.changeBackgroundImage("https://example.com/image.jpg", user);
    expect(board.backgroundImage).toBe("https://example.com/image.jpg");
  });

  it("should throw an error for invalid image URLs", () => {
    expect(() => board.changeBackgroundImage("invalid-url", user)).toThrow(
      "Invalid image URL format"
    );
    expect(() =>
      board.changeBackgroundImage("ftp://example.com/image.jpg", user)
    ).toThrow("Invalid image URL format");
  });

  it("should change the background color with hex values", () => {
    board.changeBackgroundColor("#ff5733", user);
    expect(board.backgroundColor).toBe("#ff5733");

    board.changeBackgroundColor("#FFF", user);
    expect(board.backgroundColor).toBe("#FFF");
  });

  it("should change the background color with RGB and RGBA values", () => {
    board.changeBackgroundColor("rgb(0, 255, 0)", user);
    expect(board.backgroundColor).toBe("rgb(0, 255, 0)");

    board.changeBackgroundColor("rgba(255, 255, 255, 0.5)", user);
    expect(board.backgroundColor).toBe("rgba(255, 255, 255, 0.5)");
  });

  it("should change the background color with HSL and HSLA values", () => {
    board.changeBackgroundColor("hsl(360, 100%, 50%)", user);
    expect(board.backgroundColor).toBe("hsl(360, 100%, 50%)");

    board.changeBackgroundColor("hsla(180, 50%, 50%, 0.7)", user);
    expect(board.backgroundColor).toBe("hsla(180, 50%, 50%, 0.7)");
  });

  it("should change the background color with named colors", () => {
    board.changeBackgroundColor("blue", user);
    expect(board.backgroundColor).toBe("blue");

    board.changeBackgroundColor("lime", user);
    expect(board.backgroundColor).toBe("lime");
  });

  it("should throw an error for invalid color formats", () => {
    expect(() => board.changeBackgroundColor("invalid-color", user)).toThrow(
      "Invalid color format"
    );
    expect(() => board.changeBackgroundColor("#12345", user)).toThrow(
      "Invalid color format"
    );
    expect(() => board.changeBackgroundColor("rgb(500,500,500)", user)).toThrow(
      "Invalid color format"
    );
    expect(() => board.changeBackgroundColor("hsl(400, 100%, 50%)", user)).toThrow(
      "Invalid color format"
    );
  });
});
