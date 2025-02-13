import { LogAction } from "../decorators/logAction";
import { List } from "../list";
import { Board } from "./index";

export class BoardLists {
  @LogAction("Added a list")
  addList(this: Board, title: string): List {
    const newList = new List(title);
    this.lists.push(newList);
    return newList;
  }

  @LogAction("Removed a list")
  removeList(this: Board, id: string): void {
    this.lists = this.lists.filter((list) => list.id !== id);
  }

  @LogAction("Got a list by id")
  getListById(this: Board, id: string): List | null {
    return this.lists.find((list) => list.id === id) || null;
  }

  @LogAction("Moved a list")
  moveList(this: Board, id: string, position: number): void {
    const index = this.lists.findIndex((list) => list.id === id);
    if (index === -1 || position < 0 || position >= this.lists.length) return;

    const [movedList] = this.lists.splice(index, 1);
    this.lists.splice(position, 0, movedList);
  }
}
