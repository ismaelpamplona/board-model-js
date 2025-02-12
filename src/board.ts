import { v4 as uuidv4 } from "uuid";
import { Label } from "./label";
import { List } from "./list";
import { Log } from "./log";
import { User } from "./user";

export class Board {
  id: string;
  title: string;
  lists: List[];
  createdAt: Date;
  updatedAt: Date;
  backgroundImage: string;
  backgroundColor: string;
  isArchived: boolean;
  members: User[];
  labels: Label[];
  activityLog: Log[];
  starred: boolean;
  invitationLink: string;
  settings: {
    visibility: "private" | "public" | "team";
    allowComments: "disabled" | "members" | "everyone";
    allowInvites: boolean;
    enableActivityFeed: boolean;
    notificationPreferences: { email: boolean; push: boolean };
    cardCoverImages: boolean;
    listSorting: "manual" | "alphabetical" | "due_date";
    enablePowerUps: boolean;
    webhooks: string[];
  };

  constructor(title: string) {
    if (!title || typeof title !== "string" || title.trim() === "") {
      throw new Error("Title must be a non-empty string");
    }

    this.id = this.generateId();
    this.title = title;
    this.lists = [];
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.backgroundImage = "";
    this.backgroundColor = "";
    this.isArchived = false;
    this.members = [];
    this.labels = [];
    this.activityLog = [];
    this.starred = false;
    this.invitationLink = "";

    this.settings = {
      visibility: "private",
      allowComments: "members",
      allowInvites: true,
      enableActivityFeed: true,
      notificationPreferences: { email: true, push: false },
      cardCoverImages: true,
      listSorting: "manual",
      enablePowerUps: false,
      webhooks: [],
    };
  }

  private generateId(): string {
    return uuidv4();
  }

  addList(title: string): List {
    const newList = new List(title);
    this.lists.push(newList);
    return newList;
  }
  removeList(id: string): void {
    this.lists = this.lists.filter((list) => list.id !== id);
  }

  getListById(id: string): List | null {
    return this.lists.find((list) => list.id === id) || null;
  }

  moveList(id: string, position: number): void {
    const index = this.lists.findIndex((list) => list.id === id);
    if (index === -1 || position < 0 || position >= this.lists.length) return;

    const [movedList] = this.lists.splice(index, 1); // Remove the list
    this.lists.splice(position, 0, movedList); // Insert at new position
  }

  changeTitle(newTitle: string): void {
    if (typeof newTitle !== "string" || newTitle.trim() === "") {
      throw new Error("Title must be a non-empty string");
    }

    this.title = newTitle.trim();
    this.updatedAt = new Date();
  }

  updateSettings(settings: Partial<typeof this.settings>): void {
    this.settings = {
      ...this.settings,
      ...Object.fromEntries(
        Object.entries(settings).filter(([key]) => key in this.settings)
      ),
    };
    this.updatedAt = new Date();
  }
}
