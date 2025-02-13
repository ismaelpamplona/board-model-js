import { Board } from "../../src/board";
import { Log } from "../../src/log";
import { User } from "../../src/user";

describe("Board - Activity Log", () => {
  let board: Board;
  let user: User;

  beforeEach(() => {
    board = new Board("Project Board");
    user = new User("Alice");
  });

  it("should log an activity with correct details", () => {
    board.logActivity("Added a list", user);

    expect(board.activityLog).toHaveLength(1);

    const logEntry = board.activityLog[0];
    expect(logEntry).toBeInstanceOf(Log);
    expect(logEntry.action).toBe("Added a list");
    expect(logEntry.user).toBe(user);
    expect(logEntry.timestamp).toBeInstanceOf(Date);
  });

  it("should log multiple activities in order", () => {
    board.logActivity("Added a list", user);
    board.logActivity("Removed a card", user);

    expect(board.activityLog).toHaveLength(2);

    expect(board.activityLog[0].action).toBe("Added a list");
    expect(board.activityLog[1].action).toBe("Removed a card");
  });

  it("should correctly reference the user in each log", () => {
    const user2 = new User("Bob");

    board.logActivity("Updated a task", user);
    board.logActivity("Archived a board", user2);

    expect(board.activityLog[0].user.name).toBe("Alice");
    expect(board.activityLog[1].user.name).toBe("Bob");
  });

  it("should throw an error if the user is invalid", () => {
    expect(() => board.logActivity("Deleted a list", {} as User)).toThrow(
      "Invalid user object: must be an instance of User"
    );

    expect(() => board.logActivity("Deleted a list", null as any)).toThrow(
      "Invalid user object: must be an instance of User"
    );

    expect(() => board.logActivity("Deleted a list", undefined as any)).toThrow(
      "Invalid user object: must be an instance of User"
    );
  });

  it("should not allow empty or whitespace-only actions", () => {
    expect(() => board.logActivity("", user)).toThrow(
      "Action must be a non-empty string"
    );

    expect(() => board.logActivity("   ", user)).toThrow(
      "Action must be a non-empty string"
    );
  });

  it("should preserve immutability of activity logs", () => {
    board.logActivity("Added a list", user);
    board.logActivity("Removed a card", user);

    const logBefore = [...board.activityLog];

    board.logActivity("Updated a task", user);

    expect(board.activityLog).toEqual([...logBefore, expect.any(Log)]);
  });

  it("should correctly set timestamps in chronological order", () => {
    board.logActivity("First action", user);
    board.logActivity("Second action", user);

    const firstTimestamp = board.activityLog[0].timestamp.getTime();
    const secondTimestamp = board.activityLog[1].timestamp.getTime();

    expect(firstTimestamp).toBeLessThanOrEqual(secondTimestamp);
  });
});
