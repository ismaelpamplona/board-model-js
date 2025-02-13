import { generateId } from "./utils";

export class User {
  id: string;
  name: string;

  constructor(name: string) {
    if (!name || name.trim() === "") {
      throw new Error("Name must be a non-empty string");
    }
    this.id = generateId();
    this.name = name.trim();
  }
}
