import { Board } from "../../src/board";
import { Label } from "../../src/label";
import { User } from "../../src/user";

describe("Board - Label Management", () => {
  let board: Board;
  let label1: Label, label2: Label;
  let user: User;

  beforeEach(() => {
    board = new Board("Project Board");
    label1 = new Label("Urgent", "#ff0000");
    label2 = new Label("Feature", "#00ff00");
    user = new User("Alice");
  });

  it("should add a label to the board", () => {
    board.addLabel(label1, user);
    expect(board.getLabels(user)).toContainEqual(label1);
  });

  it("should not add duplicate labels", () => {
    board.addLabel(label1, user);
    expect(() => board.addLabel(label1, user)).toThrow(
      "Label is already added to this board"
    );
  });

  it("should throw an error if label is invalid", () => {
    expect(() => board.addLabel({ title: "Bug" } as Label, user)).toThrow(
      "Invalid label object: must be an instance of Label"
    );
  });

  it("should remove a label by ID", () => {
    board.addLabel(label1, user);
    board.addLabel(label2, user);
    board.removeLabel(label1.id, user);

    expect(board.getLabels(user)).not.toContainEqual(label1);
    expect(board.getLabels(user)).toContainEqual(label2);
  });

  it("should throw an error if label ID is invalid", () => {
    expect(() => board.removeLabel("", user)).toThrow("Invalid id");
    expect(() => board.removeLabel("   ", user)).toThrow("Invalid id");
    expect(() => board.removeLabel(null as any, user)).toThrow("Invalid id");
  });

  it("should throw an error if label does not exist", () => {
    expect(() => board.removeLabel("non-existent-id", user)).toThrow(
      "Label not found"
    );
  });

  it("should return all board labels", () => {
    board.addLabel(label1, user);
    board.addLabel(label2, user);

    expect(board.getLabels(user)).toEqual([label1, label2]);
  });

  it("should return an empty array if there are no labels", () => {
    expect(board.getLabels(user)).toEqual([]);
  });
});
