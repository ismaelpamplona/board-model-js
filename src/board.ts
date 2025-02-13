import { Label } from "./label";
import { List } from "./list";
import { Log } from "./log";
import { User } from "./user";
import { generateId } from "./utils";

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

    this.id = generateId();
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
    if (newTitle.trim() === "") {
      throw new Error("Title must be a non-empty string");
    }

    this.title = newTitle.trim();
    this.updatedAt = new Date();
  }

  updateSettings(settings: Partial<typeof this.settings>): void {
    Object.keys(settings).forEach((key) => {
      if (!(key in this.settings)) {
        throw new Error(`Invalid setting: ${key}`);
      }
    });

    this.settings = { ...this.settings, ...settings };
    this.updatedAt = new Date();
  }

  changeBackgroundImage(url: string): void {
    if (!/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(url)) {
      throw new Error("Invalid image URL format");
    }
    this.backgroundImage = url;
  }

  changeBackgroundColor(color: string): void {
    const hexPattern = /^#([0-9A-F]{3}|[0-9A-F]{6})$/i;
    const rgbPattern =
      /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/;
    const rgbaPattern =
      /^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(0|1|0?\.\d+)\s*\)$/;
    const hslPattern =
      /^hsl\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$/;
    const hslaPattern =
      /^hsla\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*,\s*(0|1|0?\.\d+)\s*\)$/;

    const namedColors = [
      "black",
      "white",
      "red",
      "green",
      "blue",
      "yellow",
      "cyan",
      "magenta",
      "gray",
      "purple",
      "orange",
      "pink",
      "brown",
      "lime",
      "olive",
      "navy",
      "teal",
      "aqua",
    ];

    const isValidRgb = (color: string) => {
      const match = color.match(rgbPattern) || color.match(rgbaPattern);
      if (!match) return false;
      return match
        .slice(1, 4)
        .every((num) => Number(num) >= 0 && Number(num) <= 255);
    };

    const isValidHsl = (color: string) => {
      const match = color.match(hslPattern) || color.match(hslaPattern);
      if (!match) return false;
      const [h, s, l] = match.slice(1, 4).map(Number);
      return h >= 0 && h <= 360 && s >= 0 && s <= 100 && l >= 0 && l <= 100;
    };

    if (
      !hexPattern.test(color) &&
      !isValidRgb(color) &&
      !isValidHsl(color) &&
      !namedColors.includes(color.toLowerCase())
    ) {
      throw new Error("Invalid color format");
    }

    this.backgroundColor = color;
  }

  addMember(user: User): void {
    if (!(user instanceof User)) {
      throw new Error("Invalid user object: must be an instance of User");
    }

    if (this.members.some((member) => member.id === user.id)) {
      throw new Error("User is already a member of this board");
    }

    this.members.push(user);
  }

  removeMember(userId: string): void {
    if (!userId || userId.trim() === "") {
      throw new Error("Invalid id");
    }

    const index = this.members.findIndex((user) => user.id === userId);
    if (index === -1) {
      throw new Error("User not found");
    }

    this.members.splice(index, 1);
  }

  getMembers(): User[] {
    return [...this.members];
  }

  addLabel(label: Label): void {
    if (!(label instanceof Label)) {
      throw new Error("Invalid label object: must be an instance of Label");
    }

    if (this.labels.some((lab) => lab.id === label.id)) {
      throw new Error("Label is already added to this board");
    }

    this.labels.push(label);
  }

  removeLabel(labelId: string): void {
    if (!labelId || labelId.trim() === "") {
      throw new Error("Invalid id");
    }

    const index = this.labels.findIndex((label) => label.id === labelId);
    if (index === -1) {
      throw new Error("Label not found");
    }

    this.labels.splice(index, 1);
  }

  getLabels(): Label[] {
    return [...this.labels];
  }
}
