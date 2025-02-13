import { Board } from "../../src/board";
import { LogAction } from "../../src/decorators/logAction";
import { Log } from "../../src/log";
import { User } from "../../src/user";

class TestBoard extends Board {
  @LogAction("Test action")
  testMethod(user: User): string {
    return "Method executed";
  }
}

describe("Decorator - LogAction", () => {
  let board: TestBoard;
  let user: User;

  beforeEach(() => {
    board = new TestBoard("Test Board");
    user = new User("Alice");
  });

  it("should log an activity when a decorated method is called", () => {
    board.testMethod(user);

    expect(board.activityLog).toHaveLength(1);

    const logEntry = board.activityLog[0];
    expect(logEntry).toBeInstanceOf(Log);
    expect(logEntry.action).toBe("Test action");
    expect(logEntry.user).toBe(user);
    expect(logEntry.timestamp).toBeInstanceOf(Date);
  });

  it("should throw an error if no user is provided", () => {
    expect(() => board.testMethod({} as User)).toThrow(
      'User argument required for action: "Test action"'
    );

    expect(() => board.testMethod(null as any)).toThrow(
      'User argument required for action: "Test action"'
    );
  });

  it("should not interfere with method return value", () => {
    const result = board.testMethod(user);
    expect(result).toBe("Method executed");
  });

  it("should log multiple activities when method is called multiple times", () => {
    board.testMethod(user);
    board.testMethod(user);

    expect(board.activityLog).toHaveLength(2);
    expect(board.activityLog[0].action).toBe("Test action");
    expect(board.activityLog[1].action).toBe("Test action");
  });

  it("should log actions in the correct order", () => {
    board.testMethod(user);
    board.testMethod(user);

    const firstTimestamp = board.activityLog[0].timestamp.getTime();
    const secondTimestamp = board.activityLog[1].timestamp.getTime();

    expect(firstTimestamp).toBeLessThanOrEqual(secondTimestamp);
  });
});
