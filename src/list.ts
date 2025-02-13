import { generateId } from "./utils";

export class List {
  id: string;
  title: string;

  constructor(title: string) {
    this.id = generateId();
    this.title = title;
  }
}
