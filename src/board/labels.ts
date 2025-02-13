import { LogAction } from "../decorators/logAction";
import { Label } from "../label";
import { User } from "../user";
import { Board } from "./index";

export class BoardLabels {
  @LogAction("Added a label")
  addLabel(this: Board, label: Label, _adminUser: User): void {
    if (!(label instanceof Label)) {
      throw new Error("Invalid label object: must be an instance of Label");
    }

    if (this.labels.some((lab) => lab.id === label.id)) {
      throw new Error("Label is already added to this board");
    }

    this.labels.push(label);
  }

  @LogAction("Removed a label")
  removeLabel(this: Board, labelId: string, _adminUser: User): void {
    if (!labelId || labelId.trim() === "") {
      throw new Error("Invalid id");
    }

    const index = this.labels.findIndex((label) => label.id === labelId);
    if (index === -1) {
      throw new Error("Label not found");
    }

    this.labels.splice(index, 1);
  }

  @LogAction("Got the labels")
  getLabels(this: Board, _adminUser: User): Label[] {
    return [...this.labels];
  }
}
