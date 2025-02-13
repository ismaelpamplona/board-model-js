import { Label } from "../label";
import { List } from "../list";
import { Log } from "../log";
import { User } from "../user";
import { applyMixins, generateId } from "../utils";

import { BoardActivity } from "./activity";
import { BoardLabels } from "./labels";
import { BoardLists } from "./lists";
import { BoardMembers } from "./members";
import { BoardSettings } from "./settings";
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

  addList!: (title: string) => List;
  removeList!: (id: string) => void;
  getListById!: (id: string) => List | null;
  moveList!: (id: string, position: number) => void;

  addMember!: (user: User) => void;
  removeMember!: (userId: string) => void;
  getMembers!: () => User[];

  addLabel!: (label: Label) => void;
  removeLabel!: (labelId: string) => void;
  getLabels!: () => Label[];

  updateSettings!: (settings: Partial<typeof this.settings>) => void;
  changeBackgroundImage!: (url: string) => void;
  changeBackgroundColor!: (color: string) => void;
  changeTitle!: (newTitle: string) => void;
  logActivity!: (action: string, user: User) => void;
}

applyMixins(Board, [
  BoardActivity,
  BoardLists,
  BoardMembers,
  BoardLabels,
  BoardSettings,
]);
