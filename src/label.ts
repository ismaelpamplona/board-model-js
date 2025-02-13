import { generateId } from "./utils";

export class Label {
  id: string;
  title: string;
  color: string;

  constructor(title: string, color: string) {
    if (!title || title.trim() === "") {
      throw new Error("Title must be a non-empty string");
    }
    if (!color || color.trim() === "") {
      throw new Error("Color must be a non-empty string");
    }
    this.id = generateId();
    this.title = title;
    this.color = color;
  }
}
