import { Label } from "../label";
import { Board } from "./index";

export class BoardLabels {
  addLabel(this: Board, label: Label): void {
    if (!(label instanceof Label)) {
      throw new Error("Invalid label object: must be an instance of Label");
    }

    if (this.labels.some((lab) => lab.id === label.id)) {
      throw new Error("Label is already added to this board");
    }

    this.labels.push(label);
  }

  removeLabel(this: Board, labelId: string): void {
    if (!labelId || labelId.trim() === "") {
      throw new Error("Invalid id");
    }

    const index = this.labels.findIndex((label) => label.id === labelId);
    if (index === -1) {
      throw new Error("Label not found");
    }

    this.labels.splice(index, 1);
  }

  getLabels(this: Board): Label[] {
    return [...this.labels];
  }
}
