import { Board } from "../../src/board";
import { Label } from "../../src/label";

describe("Board - Label Management", () => {
  let board: Board;
  let label1: Label, label2: Label;

  beforeEach(() => {
    board = new Board("Project Board");
    label1 = new Label("Urgent", "#ff0000");
    label2 = new Label("Feature", "#00ff00");
  });

  it("should add a label to the board", () => {
    board.addLabel(label1);
    expect(board.getLabels()).toContainEqual(label1);
  });

  it("should not add duplicate labels", () => {
    board.addLabel(label1);
    expect(() => board.addLabel(label1)).toThrow(
      "Label is already added to this board"
    );
  });

  it("should throw an error if label is invalid", () => {
    expect(() => board.addLabel({ title: "Bug" } as Label)).toThrow(
      "Invalid label object: must be an instance of Label"
    );
  });

  it("should remove a label by ID", () => {
    board.addLabel(label1);
    board.addLabel(label2);
    board.removeLabel(label1.id);

    expect(board.getLabels()).not.toContainEqual(label1);
    expect(board.getLabels()).toContainEqual(label2);
  });

  it("should throw an error if label ID is invalid", () => {
    expect(() => board.removeLabel("")).toThrow("Invalid id");
    expect(() => board.removeLabel("   ")).toThrow("Invalid id");
    expect(() => board.removeLabel(null as any)).toThrow("Invalid id");
  });

  it("should throw an error if label does not exist", () => {
    expect(() => board.removeLabel("non-existent-id")).toThrow(
      "Label not found"
    );
  });

  it("should return all board labels", () => {
    board.addLabel(label1);
    board.addLabel(label2);

    expect(board.getLabels()).toEqual([label1, label2]);
  });

  it("should return an empty array if there are no labels", () => {
    expect(board.getLabels()).toEqual([]);
  });
});
