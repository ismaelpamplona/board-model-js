import { v4 as uuidv4 } from "uuid";

export class List {
  id: string;
  title: string;

  constructor(title: string) {
    this.id = this.generateId();
    this.title = title;
  }

  private generateId(): string {
    return uuidv4();
  }
}
