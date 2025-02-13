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

  addList!: (title: string, _adminUser: User) => List;
  removeList!: (id: string, _adminUser: User) => void;
  getListById!: (id: string, _adminUser: User) => List | null;
  moveList!: (id: string, position: number, _adminUser: User) => void;

  addMember!: (user: User, _adminUser: User) => void;
  removeMember!: (userId: string, _adminUser: User) => void;
  getMembers!: (_adminUser: User) => User[];

  addLabel!: (label: Label, _adminUser: User) => void;
  removeLabel!: (labelId: string, _adminUser: User) => void;
  getLabels!: (_adminUser: User) => Label[];

  updateSettings!: (
    settings: Partial<typeof this.settings>,
    _adminUser: User
  ) => void;
  changeBackgroundImage!: (url: string, _adminUser: User) => void;
  changeBackgroundColor!: (color: string, _adminUser: User) => void;
  changeTitle!: (newTitle: string, _adminUser: User) => void;
  logActivity!: (action: string, _adminUser: User) => void;
}

applyMixins(Board, [
  BoardActivity,
  BoardLists,
  BoardMembers,
  BoardLabels,
  BoardSettings,
]);
